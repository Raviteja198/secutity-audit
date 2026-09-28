import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { recordTransaction } from "@/services/fund";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;
    const loan = await db.loan.findUnique({ where: { id } });
    if (!loan) return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));

    if (loan.status === "CLOSED") {
      return jsonError(Object.assign(new Error("Loan is already closed"), { status: 400 }));
    }

    const body = await req.json();
    const writeOffAmountPaise = Number(body.writeOffAmountPaise) || 0;
    if (writeOffAmountPaise < 0) return jsonError("Invalid write-off amount");

    const closure = await db.$transaction(async (tx) => {
      if (writeOffAmountPaise > 0) {
        await tx.loanRepayment.create({
          data: {
            tenantId: auth.tenantId,
            loanId: id,
            amountPaise: writeOffAmountPaise,
            recordedById: auth.userId,
          },
        });
      }

      const updatedLoan = await tx.loan.update({
        where: { id },
        data: {
          status: "CLOSED",
        },
      });

      if (writeOffAmountPaise > 0) {
        await recordTransaction(db, {
          type: "LOAN_REPAYMENT",
          amount: writeOffAmountPaise,
          description: `Loan force closure write-off for ${writeOffAmountPaise} paise`,
          loanId: id,
          createdById: auth.userId,
        }, auth.tenantId, tx);
      }

      return updatedLoan;
    });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "FORCE_CLOSE",
      entity: "Loan",
      entityId: id,
      newValue: { closure, writeOffAmountPaise },
    });

    return jsonOk(closure);
  } catch (e) {
    return jsonError(e);
  }
}
