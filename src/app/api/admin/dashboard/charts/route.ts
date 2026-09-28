import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { buildMonthlyTrendPeriods, buildStatusTrendPeriods, collectMonths, fetchPaymentAggregates, parseDashboardSelection, summarizeMonths } from "@/lib/dashboard";
import { withDashboardCache } from "@/lib/dashboardCache";

export async function GET(req: NextRequest) {
  const t0 = performance.now();
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const tAuth = performance.now();

    const { mode, year, month, quarter } = parseDashboardSelection(req.url);

    const data = await withDashboardCache("admin-charts", { mode, year, month, quarter }, async () => {
      const monthlyTrendPeriods = buildMonthlyTrendPeriods(mode, year, month, quarter);
      const statusTrendPeriods = buildStatusTrendPeriods(mode, year, month, quarter);
      const paymentAggregates = await fetchPaymentAggregates(
        db,
        ctx.tenantId,
        collectMonths(
          monthlyTrendPeriods.flatMap((period) => period.months),
          statusTrendPeriods.flatMap((period) => period.months)
        )
      );

      return {
        monthlyTrend: monthlyTrendPeriods.map((period) => ({
          month: period.label,
          year: period.year,
          amount: summarizeMonths(paymentAggregates, period.months).amount,
        })),
        statusTrend: statusTrendPeriods.map((period) => {
          const summary = summarizeMonths(paymentAggregates, period.months);
          return {
            month: period.label,
            paid: summary.paid,
            late: summary.late,
            pending: summary.pending,
          };
        }),
      };
    });

    const tQueries = performance.now();
    const timing = `auth;dur=${(tAuth - t0).toFixed(0)}, queries;dur=${(tQueries - tAuth).toFixed(0)}, total;dur=${(performance.now() - t0).toFixed(0)}`;
    console.log(`[dashboard charts timing] ${timing}`);

    return jsonOk(data, { headers: { "Server-Timing": timing } });
  } catch (err) {
    console.error("Admin dashboard charts API error:", err);
    return jsonError("Failed to load dashboard charts");
  }
}
