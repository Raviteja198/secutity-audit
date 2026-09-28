import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest, routeCtx: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const { id } = await routeCtx.params;
    const loan = await db.loan.findUnique({ where: { id } });
    if (!loan) return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));

    const repayments = await db.loanRepayment.findMany({
      where: { loanId: id },
      orderBy: { paidAt: "desc" },
      include: { recordedBy: { select: { name: true } } },
    });

    return jsonOk({ repayments });
  } catch (e) {
    return jsonError(e);
  }
}