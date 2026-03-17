import { prisma } from "@/lib/prisma";

export async function getContributionRuleForMonth(year: number, month: number) {
  return prisma.contributionRule.findFirst({
    where: {
      OR: [
        { effectiveFromYear: { lt: year } },
        { effectiveFromYear: year, effectiveFromMonth: { lte: month } },
      ],
    },
    orderBy: [{ effectiveFromYear: "desc" }, { effectiveFromMonth: "desc" }],
  });
}

export async function getPenaltyRuleForDate(date: Date) {
  return prisma.penaltyRule.findFirst({
    where: { effectiveFrom: { lte: date } },
    orderBy: { effectiveFrom: "desc" },
  });
  
}

