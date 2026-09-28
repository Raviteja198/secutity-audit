import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { getFundBalance } from "@/services/fund";
import { buildSummaryPeriods, fetchPaymentAggregates, parseDashboardSelection, summarizeMonths } from "@/lib/dashboard";

export async function GET(req: NextRequest) {
  const t0 = performance.now();
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const tAuth = performance.now();

    const { mode, year, month, quarter } = parseDashboardSelection(req.url);
    const selectedMonths = buildSummaryPeriods(mode, year, month, quarter);

    const [memberStatusCounts, paymentAggregates, loanStatusCounts, fundBalance, overdueLoansResult] = await Promise.all([
      db.member.groupBy({ by: ["status"], _count: { _all: true } }),
      fetchPaymentAggregates(db, ctx.tenantId, selectedMonths),
      db.loan.groupBy({ by: ["status"], _count: { _all: true } }),
      getFundBalance(db, ctx.tenantId),
      db.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT "loanId") as count FROM "LoanInstallment"
        WHERE "tenantId" = ${ctx.tenantId} AND "dueDate" < ${new Date()} AND "amountPaidPaise" < ("interestDuePaise" + "principalDuePaise")
      `,
    ]);
    const tQueries = performance.now();

    const summary = summarizeMonths(paymentAggregates, selectedMonths);
    const memberCounts = Object.fromEntries(memberStatusCounts.map((row) => [row.status, row._count._all]));
    const loanCounts = Object.fromEntries(loanStatusCounts.map((row) => [row.status, row._count._all]));

    const timing = `auth;dur=${(tAuth - t0).toFixed(0)}, queries;dur=${(tQueries - tAuth).toFixed(0)}, total;dur=${(performance.now() - t0).toFixed(0)}`;
    console.log(`[dashboard timing] ${timing}`);

    return jsonOk(
      {
        totalMembers: memberCounts.ACTIVE ?? 0,
        inactiveMembers: memberCounts.INACTIVE ?? 0,
        monthlyCollections: summary.amount,
        monthlyPaidCount: summary.paid,
        monthlyLateCount: summary.late,
        monthlyPendingCount: summary.pending,
        pendingPayments: summary.pending,
        activeLoans: loanCounts.ACTIVE ?? 0,
        overdueLoans: Number(overdueLoansResult[0]?.count ?? 0),
        pendingApprovalLoans: loanCounts.PENDING_APPROVAL ?? 0,
        fundBalance,
      },
      { headers: { "Server-Timing": timing } }
    );
  } catch (err) {
    console.error("Admin dashboard summary API error:", err);
    return jsonError("Failed to load dashboard summary");
  }
}
