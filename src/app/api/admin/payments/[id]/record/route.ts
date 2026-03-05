import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { recordPaymentSchema } from "@/lib/validators/payments";
import { recordPayment } from "@/services/payments";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const { id } = await ctx.params;
    const old = await prisma.payment.findUnique({ where: { id }, include: { receipt: true } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const body = await req.json();
    const parsed = recordPaymentSchema.parse(body);

    const result = await recordPayment({
      paymentId: id,
      method: parsed.method,
      paidAt: parsed.paidAt,
      recordedById: auth.userId,
    });

    await writeAuditLog(req, {
      adminId: auth.userId,
      action: "RECORD_PAYMENT",
      entity: "Payment",
      entityId: id,
      oldValue: old,
      newValue: result,
    });

    return jsonOk(result);
  } catch (e) {
    return jsonError(e);
  }
}

