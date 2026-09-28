import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { updateFundBalance } from "@/services/fund";
import { writeAuditLog } from "@/lib/audit";
import { invalidateDashboardCache } from "@/lib/dashboardCache";

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;

    if (!id) {
      return jsonError(Object.assign(new Error("Payment ID is required"), { status: 400 }));
    }

    const payment = await db.payment.findUnique({
      where: { id },
      include: { receipt: true, member: { select: { fullName: true, memberUid: true } } },
    });

    if (!payment) {
      return jsonError(Object.assign(new Error("Payment not found"), { status: 404 }));
    }

    if (payment.status !== "PENDING" && payment.status !== "LATE" && payment.status !== "PAID") {
      return jsonError(Object.assign(new Error("This payment cannot be deleted."), { status: 400 }));
    }

    const snapshot = {
      memberId: payment.memberId,
      member: payment.member,
      month: payment.month,
      year: payment.year,
      status: payment.status,
      baseAmountPaise: payment.baseAmountPaise,
      penaltyAmountPaise: payment.penaltyAmountPaise,
      totalAmountPaise: payment.totalAmountPaise,
      receiptNumber: payment.receipt?.receiptNumber ?? null,
    };

    await db.$transaction(async (tx) => {
      const txs = await tx.transaction.findMany({
        where: { paymentId: id, type: "PAYMENT_RECEIVED" },
      });
      const fromTransactions = txs.reduce((sum, t) => sum + t.amount, 0);

      await tx.transaction.deleteMany({
        where: { paymentId: id, type: "PAYMENT_RECEIVED" },
      });

      await tx.receipt.deleteMany({ where: { paymentId: id } });
      await tx.payment.delete({ where: { id } });

      // Reverse fund ledger: match actual PAYMENT_RECEIVED rows (handles adjustments / re-recording).
      if (fromTransactions !== 0) {
        await updateFundBalance(db, -fromTransactions, auth.tenantId, tx);
      } else if (payment.status === "PAID" || payment.status === "LATE") {
        // Legacy rows with no Transaction — still correct group fund cache if used.
        await updateFundBalance(db, -payment.totalAmountPaise, auth.tenantId, tx);
      }
    });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "PAYMENT_DELETED",
      entity: "Payment",
      entityId: id,
      oldValue: snapshot,
    });

    await invalidateDashboardCache();

    return jsonOk({ message: "Payment deleted successfully" });
  } catch (e) {
    console.error("Delete payment error:", e);
    return jsonError(e instanceof Error ? e : new Error("Failed to delete payment"));
  }
}
