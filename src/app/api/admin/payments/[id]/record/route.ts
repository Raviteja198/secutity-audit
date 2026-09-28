import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { recordPaymentSchema } from "@/lib/validators/payments";
import { recordPayment } from "@/services/payments";
import { writeAuditLog } from "@/lib/audit";
import { invalidateDashboardCache } from "@/lib/dashboardCache";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;
    const old = await db.payment.findUnique({ where: { id }, include: { receipt: true } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const body = await req.json();
    const parsed = recordPaymentSchema.parse(body);

    const result = await recordPayment(db, auth.tenantId, {
      paymentId: id,
      method: parsed.method,
      paidAt: parsed.paidAt,
      recordedById: auth.userId,
    });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "RECORD_PAYMENT",
      entity: "Payment",
      entityId: id,
      oldValue: old,
      newValue: result,
    });

    await invalidateDashboardCache();

    return jsonOk(result);
  } catch (e) {
    return jsonError(e);
  }
}

