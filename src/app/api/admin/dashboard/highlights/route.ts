import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { parseDashboardSelection } from "@/lib/dashboard";
import { withDashboardCache } from "@/lib/dashboardCache";

export async function GET(req: NextRequest) {
  const t0 = performance.now();
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const tAuth = performance.now();
    const { year } = parseDashboardSelection(req.url);

    const data = await withDashboardCache("admin-highlights", { year }, async () => {
      const [row] = await db.$queryRaw<Array<{
        totalCollections: bigint;
        yearToDateCollections: bigint;
        totalCharity: bigint;
        totalLoansDisbursed: bigint;
        activeLoanAmount: bigint;
        closedLoans: bigint;
        totalInterestCollected: bigint;
      }>>`
        SELECT
          COALESCE((SELECT SUM("totalAmountPaise") FROM "Payment" WHERE "tenantId" = ${ctx.tenantId} AND "status" IN ('PAID', 'LATE')), 0)::bigint AS "totalCollections",
          COALESCE((SELECT SUM("totalAmountPaise") FROM "Payment" WHERE "tenantId" = ${ctx.tenantId} AND "year" = ${year} AND "status" IN ('PAID', 'LATE')), 0)::bigint AS "yearToDateCollections",
          COALESCE((SELECT SUM("amountPaise") FROM "Charity" WHERE "tenantId" = ${ctx.tenantId}), 0)::bigint AS "totalCharity",
          COALESCE((SELECT SUM("principalPaise") FROM "Loan" WHERE "tenantId" = ${ctx.tenantId} AND "status" IN ('ACTIVE', 'CLOSED')), 0)::bigint AS "totalLoansDisbursed",
          COALESCE((SELECT SUM("principalPaise") FROM "Loan" WHERE "tenantId" = ${ctx.tenantId} AND "status" = 'ACTIVE'), 0)::bigint AS "activeLoanAmount",
          COALESCE((SELECT COUNT(*) FROM "Loan" WHERE "tenantId" = ${ctx.tenantId} AND "status" = 'CLOSED'), 0)::bigint AS "closedLoans",
          COALESCE((SELECT SUM(LEAST("amountPaidPaise", "interestDuePaise")) FROM "LoanInstallment" WHERE "tenantId" = ${ctx.tenantId}), 0)::bigint AS "totalInterestCollected"
      `;

      const totalCollections = Number(row?.totalCollections ?? 0);
      const totalInterestCollected = Number(row?.totalInterestCollected ?? 0);

      return {
        totalCollections,
        yearToDateCollections: Number(row?.yearToDateCollections ?? 0),
        totalCharity: Number(row?.totalCharity ?? 0),
        totalLoansDisbursed: Number(row?.totalLoansDisbursed ?? 0),
        activeLoanAmount: Number(row?.activeLoanAmount ?? 0),
        closedLoans: Number(row?.closedLoans ?? 0),
        totalInterestCollected,
        // "Money in hand": contributions collected + interest received from loans.
        totalInHand: totalCollections + totalInterestCollected,
      };
    });

    const tQueries = performance.now();
    const timing = `auth;dur=${(tAuth - t0).toFixed(0)}, queries;dur=${(tQueries - tAuth).toFixed(0)}, total;dur=${(performance.now() - t0).toFixed(0)}`;
    console.log(`[dashboard highlights timing] ${timing}`);

    return jsonOk(data, { headers: { "Server-Timing": timing } });
  } catch (err) {
    console.error("Admin dashboard highlights API error:", err);
    return jsonError("Failed to load dashboard highlights");
  }
}
