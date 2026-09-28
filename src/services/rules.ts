import type { TenantPrismaClient } from "@/lib/tenantPrisma";

export async function getContributionRuleForMonth(db: TenantPrismaClient, year: number, month: number) {
  return db.contributionRule.findFirst({
    where: {
      OR: [
        { effectiveFromYear: { lt: year } },
        { effectiveFromYear: year, effectiveFromMonth: { lte: month } },
      ],
    },
    orderBy: [{ effectiveFromYear: "desc" }, { effectiveFromMonth: "desc" }],
  });
}

export async function getPenaltyRuleForDate(db: TenantPrismaClient, date: Date) {
  return db.penaltyRule.findFirst({
    where: { effectiveFrom: { lte: date } },
    orderBy: { effectiveFrom: "desc" },
  });
}
