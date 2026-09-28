import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { invalidateDashboardCache } from "@/lib/dashboardCache";
import { generateMonthlyPayments } from "@/services/payments";
import { notifyGeneratedPayments } from "@/services/paymentReminders";

/**
 * Manual "Generate Payments Now" — generates this month's contribution payments
 * for every active member (using whichever ContributionRule is currently effective,
 * same as the scheduled PAYMENT_GENERATION path) and immediately notifies just the
 * members who got a new payment this run.
 */
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const body = await req.json().catch(() => ({}));
    const templateId = body?.templateId ? String(body.templateId) : null;
    const sendEmail = body?.sendEmail === undefined ? true : Boolean(body.sendEmail);
    const sendWhatsapp = Boolean(body?.sendWhatsapp);

    if (!sendEmail && !sendWhatsapp) {
      return jsonError(Object.assign(new Error("Select at least one channel (Email or WhatsApp)."), { status: 422 }));
    }

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const { createdPayments, createdCount, createdOrExisting, baseAmountPaise } = await generateMonthlyPayments(db, auth.tenantId, {
      month,
      year,
      recordedById: auth.userId,
    });

    let sent = 0;
    let skipped = 0;
    if (createdPayments.length > 0) {
      const result = await notifyGeneratedPayments(db, auth.tenantId, createdPayments, {
        templateId,
        trigger: "MANUAL",
        triggeredById: auth.userId,
        period: `${year}-${String(month).padStart(2, "0")}`,
        sendEmail,
        sendWhatsapp,
      });
      sent = result.sent;
      skipped = result.skipped;
    }

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "GENERATE_PAYMENTS_NOW",
      entity: "Payment",
      entityId: `${year}-${month}`,
      newValue: { createdCount, createdOrExisting, baseAmountPaise, sent, skipped },
    });

    await invalidateDashboardCache();

    return jsonOk({ createdCount, createdOrExisting, baseAmountPaise, sent, skipped });
  } catch (e) {
    return jsonError(e);
  }
}
