import type { TenantPrismaClient } from "@/lib/tenantPrisma";
import { PaymentStatus, Prisma } from "@prisma/client";

type DashboardMode = "month" | "quarter" | "year";
export type MonthRef = { month: number; year: number };
type MonthKey = `${number}-${number}`;
type PaymentAggregateMap = Map<MonthKey, { amount: number; counts: Record<PaymentStatus, number> }>;
type PaymentAggregateRow = {
  month: number;
  year: number;
  amount: bigint;
  paid: bigint;
  late: bigint;
  pending: bigint;
};

export function parseDashboardSelection(url: string) {
  const { searchParams } = new URL(url);
  const now = new Date();

  return {
    mode: (searchParams.get("mode") ?? "month") as DashboardMode,
    year: searchParams.get("year") ? Number(searchParams.get("year")) : now.getFullYear(),
    month: searchParams.get("month") ? Number(searchParams.get("month")) : now.getMonth() + 1,
    quarter: searchParams.get("quarter") ? Number(searchParams.get("quarter")) : Math.ceil((now.getMonth() + 1) / 3),
  };
}

export function quarterMonths(q: number, year: number): MonthRef[] {
  const start = (q - 1) * 3 + 1;
  return [start, start + 1, start + 2].map((month) => ({ month, year }));
}

export function yearMonths(year: number): MonthRef[] {
  return Array.from({ length: 12 }, (_, i) => ({ month: i + 1, year }));
}

function monthKey(month: number, year: number): MonthKey {
  return `${year}-${month}`;
}

function dedupeMonths(months: MonthRef[]): MonthRef[] {
  return Array.from(new Map(months.map((entry) => [monthKey(entry.month, entry.year), entry])).values());
}

export function buildSummaryPeriods(mode: DashboardMode, year: number, month: number, quarter: number) {
  return mode === "quarter" ? quarterMonths(quarter, year) : mode === "year" ? yearMonths(year) : [{ month, year }];
}

export function buildMonthlyTrendPeriods(mode: DashboardMode, year: number, month: number, quarter: number) {
  return mode === "month"
    ? Array.from({ length: 12 }, (_, index) => {
        const d = new Date(year, month - 1 - (11 - index), 1);
        return {
          label: `${d.toLocaleString("default", { month: "short" })} ${String(d.getFullYear()).slice(2)}`,
          year: d.getFullYear(),
          months: [{ month: d.getMonth() + 1, year: d.getFullYear() }],
        };
      })
    : mode === "quarter"
      ? Array.from({ length: 8 }, (_, index) => {
          let q = quarter - (7 - index);
          let y = year;
          while (q <= 0) {
            q += 4;
            y -= 1;
          }
          return { label: `Q${q} ${String(y).slice(2)}`, year: y, months: quarterMonths(q, y) };
        })
      : Array.from({ length: 5 }, (_, index) => {
          const targetYear = year - (4 - index);
          return { label: String(targetYear), year: targetYear, months: yearMonths(targetYear) };
        });
}

export function buildStatusTrendPeriods(mode: DashboardMode, year: number, month: number, quarter: number) {
  return mode === "month"
    ? Array.from({ length: 6 }, (_, index) => {
        const d = new Date(year, month - 1 - (5 - index), 1);
        return {
          label: d.toLocaleString("default", { month: "short" }),
          months: [{ month: d.getMonth() + 1, year: d.getFullYear() }],
        };
      })
    : mode === "quarter"
      ? Array.from({ length: 4 }, (_, index) => {
          let q = quarter - (3 - index);
          let y = year;
          while (q <= 0) {
            q += 4;
            y -= 1;
          }
          return { label: `Q${q} ${String(y).slice(2)}`, months: quarterMonths(q, y) };
        })
      : Array.from({ length: 4 }, (_, index) => {
          const targetYear = year - (3 - index);
          return { label: String(targetYear), months: yearMonths(targetYear) };
        });
}

export function collectMonths(...sets: MonthRef[][]) {
  return dedupeMonths(sets.flat());
}

// $queryRaw bypasses the tenant-scoping Prisma extension entirely, so tenantId
// is filtered explicitly here — one of the raw-SQL call sites flagged in the
// multi-tenancy plan as needing manual scoping.
export async function fetchPaymentAggregates(db: TenantPrismaClient, tenantId: string, months: MonthRef[], memberId?: string): Promise<PaymentAggregateMap> {
  if (months.length === 0) return new Map();

  const monthPairs = months.map(({ month, year }) => Prisma.sql`(${month}, ${year})`);
  const memberFilter = memberId ? Prisma.sql`AND "memberId" = ${memberId}` : Prisma.empty;

  const rows = await db.$queryRaw<PaymentAggregateRow[]>(
    Prisma.sql`
      SELECT
        "month",
        "year",
        COALESCE(SUM(CASE WHEN "status" IN ('PAID', 'LATE') THEN "totalAmountPaise" ELSE 0 END), 0)::bigint AS "amount",
        COALESCE(SUM(CASE WHEN "status" = 'PAID' THEN 1 ELSE 0 END), 0)::bigint AS "paid",
        COALESCE(SUM(CASE WHEN "status" = 'LATE' THEN 1 ELSE 0 END), 0)::bigint AS "late",
        COALESCE(SUM(CASE WHEN "status" = 'PENDING' THEN 1 ELSE 0 END), 0)::bigint AS "pending"
      FROM "Payment"
      WHERE "tenantId" = ${tenantId}
        AND ("month", "year") IN (VALUES ${Prisma.join(monthPairs, ", ")})
        ${memberFilter}
      GROUP BY "year", "month"
    `
  );

  const aggregates: PaymentAggregateMap = new Map();

  for (const row of rows) {
    aggregates.set(monthKey(row.month, row.year), {
      amount: Number(row.amount ?? 0),
      counts: {
        PAID: Number(row.paid ?? 0),
        LATE: Number(row.late ?? 0),
        PENDING: Number(row.pending ?? 0),
      },
    });
  }

  return aggregates;
}

export function summarizeMonths(aggregates: PaymentAggregateMap, months: MonthRef[]) {
  return months.reduce(
    (summary, entry) => {
      const aggregate = aggregates.get(monthKey(entry.month, entry.year));
      if (!aggregate) return summary;
      summary.amount += aggregate.amount;
      summary.paid += aggregate.counts.PAID;
      summary.late += aggregate.counts.LATE;
      summary.pending += aggregate.counts.PENDING;
      return summary;
    },
    { amount: 0, paid: 0, late: 0, pending: 0 }
  );
}
