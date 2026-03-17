import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { recordTransaction } from "@/services/fund";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const { id } = await ctx.params;
    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));

    const body = await req.json();
    const amountPaise = Number(body.amountPaise);
    if (!amountPaise || amountPaise <= 0) return jsonError("Invalid amount");

    const repayment = await prisma.$transaction(async (tx) => {
      const r = await tx.loanRepayment.create({
        data: {
          loanId: id,
          amountPaise,
          recordedById: auth.userId,
        },
      });

      // Allocate repayment to installments, starting from oldest unpaid
      const installments = await tx.loanInstallment.findMany({
        where: { loanId: id },
        orderBy: { dueDate: "asc" },
      });

      let remainingAmount = amountPaise;
      for (const inst of installments) {
        if (remainingAmount <= 0) break;
        const due = inst.interestDuePaise + inst.principalDuePaise;
        const paid = inst.amountPaidPaise;
        const unpaid = due - paid;
        if (unpaid > 0) {
          const toPay = Math.min(remainingAmount, unpaid);
          await tx.loanInstallment.update({
            where: { id: inst.id },
            data: {
              amountPaidPaise: { increment: toPay },
              paidAt: paid + toPay >= due ? new Date() : undefined,
            },
          });
          remainingAmount -= toPay;
        }
      }

      const updatedInstallments = await tx.loanInstallment.findMany({
        where: { loanId: id },
      });

      const hasOutstandingInstallments = updatedInstallments.some(
        (inst) => inst.amountPaidPaise < inst.interestDuePaise + inst.principalDuePaise
      );

      if (!hasOutstandingInstallments) {
        await tx.loan.update({
          where: { id },
          data: { status: "CLOSED" },
        });
      }

      // Record fund transaction for loan repayment
      await recordTransaction({
        type: "LOAN_REPAYMENT",
        amount: amountPaise,
        description: `Loan repayment for ${amountPaise} paise`,
        loanId: id,
        repaymentId: r.id,
        createdById: auth.userId,
      }, tx);

      return r;
    });

    await writeAuditLog(req, {
      adminId: auth.userId,
      action: "REPAY",
      entity: "Loan",
      entityId: id,
      newValue: { repayment },
    });

    return jsonOk(repayment);
  } catch (e) {
    return jsonError(e);
  }
}
