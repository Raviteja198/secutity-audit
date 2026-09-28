import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { buildMonthlyTrendPeriods, collectMonths, fetchPaymentAggregates, parseDashboardSelection, summarizeMonths } from "@/lib/dashboard";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    const db = forTenant(auth.tenantId);
    const user = await db.user.findUnique({ where: { id: auth.userId }, select: { memberId: true } });

    if (!user?.memberId) {
      throw Object.assign(new Error("No member profile is linked to this user."), { status: 404 });
    }

    const { mode, year, month, quarter } = parseDashboardSelection(req.url);
    const monthlyTrendPeriods = buildMonthlyTrendPeriods(mode, year, month, quarter);
    const paymentAggregates = await fetchPaymentAggregates(
      db,
      auth.tenantId,
      collectMonths(monthlyTrendPeriods.flatMap((period) => period.months)),
      user.memberId
    );

    return jsonOk({
      monthlyTrend: monthlyTrendPeriods.map((period) => ({
        month: period.label,
        year: period.year,
        amount: summarizeMonths(paymentAggregates, period.months).amount,
      })),
    });
  } catch (err) {
    console.error("User dashboard charts API error:", err);
    return jsonError("Failed to load dashboard charts");
  }
}
