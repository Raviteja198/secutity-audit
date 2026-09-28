import bcrypt from "bcryptjs";
import type { LoanStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { updateFundBalance } from "@/services/fund";
import { writeAuditLog } from "@/lib/audit";

function settingKey(loanId: string) {
  return `loan_delete_otp:${loanId}`;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;

    const body = await req.json().catch(() => ({}));
    const otp = String(body?.otp ?? "")
      .trim()
      .toUpperCase();
    if (!otp || otp.length < 6) {
      return jsonError(Object.assign(new Error("Enter the verification code from your email."), { status: 400 }));
    }

    const key = settingKey(id);
    const row = await db.setting.findUnique({ where: { tenantId_key: { tenantId: auth.tenantId, key } } });
    if (!row) {
      return jsonError(
        Object.assign(
          new Error("No active verification code. Request a new code from the delete dialog."),
          { status: 400 }
        )
      );
    }

    const payload = row.value as { hash?: string; expiresAt?: string; requestedById?: string };
    const expiresAt = payload.expiresAt ? new Date(payload.expiresAt) : null;
    if (!payload.hash || !expiresAt || Number.isNaN(expiresAt.getTime())) {
      await db.setting.delete({ where: { tenantId_key: { tenantId: auth.tenantId, key } } }).catch(() => {});
      return jsonError(Object.assign(new Error("Invalid verification state. Request a new code."), { status: 400 }));
    }

    if (Date.now() > expiresAt.getTime()) {
      await db.setting.delete({ where: { tenantId_key: { tenantId: auth.tenantId, key } } }).catch(() => {});
      return jsonError(
        Object.assign(new Error("Verification code has expired (10 minutes). Request a new code."), {
          status: 400,
        })
      );
    }

    const ok = await bcrypt.compare(otp, payload.hash);
    if (!ok) {
      return jsonError(Object.assign(new Error("Invalid verification code."), { status: 400 }));
    }

    const loan = await db.loan.findUnique({
      where: { id },
      include: { member: { select: { fullName: true, memberUid: true } } },
    });
    if (!loan) {
      await db.setting.delete({ where: { tenantId_key: { tenantId: auth.tenantId, key } } }).catch(() => {});
      return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));
    }
    const deletableStatuses: LoanStatus[] = ["PENDING_APPROVAL", "ACTIVE", "CLOSED", "DEFAULTED"];
    if (!deletableStatuses.includes(loan.status)) {
      return jsonError(
        Object.assign(new Error("This loan cannot be deleted."), { status: 400 })
      );
    }

    const repaymentsAgg = await db.loanRepayment.aggregate({
      where: { loanId: id },
      _sum: { amountPaise: true },
    });
    const repaymentsTotalPaise = repaymentsAgg._sum.amountPaise ?? 0;

    const ledgerRows = await db.transaction.findMany({
      where: { loanId: id },
    });
    const ledgerNetPaise = ledgerRows.reduce((s, row) => s + row.amount, 0);

    const snapshot = {
      principalPaise: loan.principalPaise,
      status: loan.status,
      memberId: loan.memberId,
      member: loan.member,
      repaymentsTotalPaise,
      ledgerRowCount: ledgerRows.length,
      ledgerNetPaise,
    };

    await db.$transaction(async (tx) => {
      const txs = await tx.transaction.findMany({ where: { loanId: id } });
      const fromTransactions = txs.reduce((sum, t) => sum + t.amount, 0);

      await tx.transaction.deleteMany({ where: { loanId: id } });

      // Reverse Fund.balance to match removing these ledger rows (disbursement + all repayments incl. interest).
      if (txs.length > 0) {
        if (fromTransactions !== 0) {
          await updateFundBalance(db, -fromTransactions, auth.tenantId, tx);
        }
      } else if (loan.status !== "PENDING_APPROVAL") {
        // Legacy: repayments/installments existed but no Transaction rows — mirror aggregate math.
        const rep = await tx.loanRepayment.aggregate({
          where: { loanId: id },
          _sum: { amountPaise: true },
        });
        const repaid = rep._sum.amountPaise ?? 0;
        const netUndo = loan.principalPaise - repaid;
        if (netUndo !== 0) {
          await updateFundBalance(db, netUndo, auth.tenantId, tx);
        }
      }

      await tx.setting.delete({ where: { tenantId_key: { tenantId: auth.tenantId, key } } });
      await tx.loan.delete({ where: { id } });
    });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "LOAN_DELETED",
      entity: "Loan",
      entityId: id,
      oldValue: snapshot,
    });

    return jsonOk({ message: "Loan deleted successfully" });
  } catch (e) {
    return jsonError(e);
  }
}
