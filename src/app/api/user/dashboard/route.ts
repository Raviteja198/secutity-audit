import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { getFundBalance } from "@/services/fund";
import { buildSummaryPeriods, fetchPaymentAggregates, parseDashboardSelection, summarizeMonths } from "@/lib/dashboard";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    const db = forTenant(auth.tenantId);
    const user = await db.user.findUnique({ where: { id: auth.userId }, select: { memberId: true } });

    if (!user?.memberId) {
      throw Object.assign(new Error("No member profile is linked to this user."), { status: 404 });
    }

    const { mode, year, month, quarter } = parseDashboardSelection(req.url);
    const selectedMonths = buildSummaryPeriods(mode, year, month, quarter);

    const [paymentAggregates, totalMembers, totalCollections, yearToDateCollections, activeLoans, overdueLoansResult, totalCharity, fundBalance, totalLoansDisbursed, activeLoanAmount, orgTotalCollectionsAgg, totalInterestCollectedAgg] = await Promise.all([
      fetchPaymentAggregates(db, auth.tenantId, selectedMonths, user.memberId),
      db.member.count({ where: { status: "ACTIVE" } }),
      db.payment.aggregate({ where: { memberId: user.memberId, status: { in: ["PAID", "LATE"] } }, _sum: { totalAmountPaise: true } }),
      db.payment.aggregate({ where: { memberId: user.memberId, year, status: { in: ["PAID", "LATE"] } }, _sum: { totalAmountPaise: true } }),
      db.loan.count({ where: { memberId: user.memberId, status: "ACTIVE" } }),
      db.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT li."loanId") as count
        FROM "LoanInstallment" li
        INNER JOIN "Loan" l ON l.id = li."loanId"
        WHERE l."memberId" = ${user.memberId}
        AND li."tenantId" = ${auth.tenantId}
        AND li."dueDate" < ${new Date()}
        AND li."amountPaidPaise" < (li."interestDuePaise" + li."principalDuePaise")
      `,
      db.charity.aggregate({ _sum: { amountPaise: true } }),
      getFundBalance(db, auth.tenantId),
      db.loan.aggregate({
        where: { status: { in: ["ACTIVE", "CLOSED"] } },
        _sum: { principalPaise: true },
      }),
      db.loan.aggregate({
        where: { memberId: user.memberId, status: "ACTIVE" },
        _sum: { principalPaise: true },
      }),
      db.payment.aggregate({ where: { status: { in: ["PAID", "LATE"] } }, _sum: { totalAmountPaise: true } }),
      db.$queryRaw<{ total: bigint }[]>`
        SELECT COALESCE(SUM(LEAST("amountPaidPaise", "interestDuePaise")), 0)::bigint AS total
        FROM "LoanInstallment"
        WHERE "tenantId" = ${auth.tenantId}
      `,
    ]);

    const orgTotalCollections = orgTotalCollectionsAgg._sum.totalAmountPaise ?? 0;
    const totalInterestCollected = Number(totalInterestCollectedAgg[0]?.total ?? 0);

    const summary = summarizeMonths(paymentAggregates, selectedMonths);

    return jsonOk({
      totalMembers,
      monthlyCollections: summary.amount,
      totalCollections: totalCollections._sum.totalAmountPaise ?? 0,
      yearToDateCollections: yearToDateCollections._sum.totalAmountPaise ?? 0,
      monthlyPaidCount: summary.paid,
      monthlyLateCount: summary.late,
      monthlyPendingCount: summary.pending,
      pendingPayments: summary.pending,
      activeLoans,
      activeLoanAmount: activeLoanAmount._sum.principalPaise ?? 0,
      overdueLoans: Number(overdueLoansResult[0]?.count ?? 0),
      totalCharity: totalCharity._sum.amountPaise ?? 0,
      totalLoansDisbursed: totalLoansDisbursed._sum.principalPaise ?? 0,
      fundBalance,
      totalInterestCollected,
      // "Money in hand": contributions collected (group-wide) + interest received from loans.
      totalInHand: orgTotalCollections + totalInterestCollected,
    });
  } catch (err) {
    console.error("User dashboard summary API error:", err);
    return jsonError("Failed to load dashboard summary");
  }
}
