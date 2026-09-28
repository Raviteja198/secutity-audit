export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { sendPendingPaymentReminders } from "@/services/paymentReminders";

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

    const { sent, skipped, failed } = await sendPendingPaymentReminders(db, auth.tenantId, {
      templateId,
      trigger: "MANUAL",
      triggeredById: auth.userId,
      sendEmail,
      sendWhatsapp,
    });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "SEND_PAYMENT_REMINDERS",
      entity: "Payment",
      newValue: { sent, skipped, failed, templateId },
    });

    return jsonOk({ sent, skipped, failed });
  } catch (e) {
    return jsonError(e);
  }
}
