import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { getFundBalance } from "@/services/fund";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    // Use provided month/year or current date
    const currentMonth = month ? Number(month) : new Date().getMonth() + 1;
    const currentYear = year ? Number(year) : new Date().getFullYear();
    const now = new Date();

    // Total Members (ACTIVE)
    const totalMembers = await prisma.member.count({
      where: { status: "ACTIVE" },
    });

    // Monthly Collections (current month paid or late payments)
    const monthlyCollections = await prisma.payment.aggregate({
      where: {
        month: currentMonth,
        year: currentYear,
        status: { in: ["PAID", "LATE"] },
      },
      _sum: {
        totalAmountPaise: true,
      },
    });

    // Total Collections (all time paid or late)
    const totalCollections = await prisma.payment.aggregate({
      where: {
        status: { in: ["PAID", "LATE"] },
      },
      _sum: {
        totalAmountPaise: true,
      },
    });

    // Pending Payments
    const pendingPayments = await prisma.payment.count({
      where: { status: "PENDING" },
    });

    // Overdue Loans (installments past due and not fully paid)
    const overdueLoansResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count
      FROM "LoanInstallment"
      WHERE "dueDate" < ${now}
      AND "amountPaidPaise" < ("interestDuePaise" + "principalDuePaise")
    `;
    const overdueLoans = Number(overdueLoansResult[0]?.count || 0);

    // Active Loans
    const activeLoans = await prisma.loan.count({
      where: { status: "ACTIVE" },
    });

    // Total Charity Distributed
    const totalCharity = await prisma.charity.aggregate({
      _sum: {
        amountPaise: true,
      },
    });

    // Monthly collections trend (last 12 months from selected year/month)
    const monthlyTrend = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1 - i, 1);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const collections = await prisma.payment.aggregate({
        where: {
          month,
          year,
          status: { in: ["PAID", "LATE"] },
        },
        _sum: {
          totalAmountPaise: true,
        },
      });

      monthlyTrend.push({
        month: date.toLocaleString('default', { month: 'short' }),
        year,
        amount: collections._sum.totalAmountPaise || 0,
      });
    }

    // Fund Balance
    const fundBalance = await getFundBalance();

    return jsonOk({
      totalMembers,
      monthlyCollections: monthlyCollections._sum.totalAmountPaise || 0,
      totalCollections: totalCollections._sum.totalAmountPaise || 0,
      pendingPayments,
      overdueLoans,
      activeLoans,
      totalCharity: totalCharity._sum.amountPaise || 0,
      fundBalance,
      monthlyTrend,
    });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return jsonError("Failed to load dashboard data");
  }
}