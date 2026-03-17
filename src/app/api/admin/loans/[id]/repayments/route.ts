import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    const { id } = await ctx.params;
    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));

    const repayments = await prisma.loanRepayment.findMany({
      where: { loanId: id },
      orderBy: { paidAt: "desc" },
      include: { recordedBy: { select: { name: true } } },
    });

    return jsonOk({ repayments });
  } catch (e) {
    return jsonError(e);
  }
}