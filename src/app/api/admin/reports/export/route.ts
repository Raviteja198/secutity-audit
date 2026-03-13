export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";

export async function GET(req: NextRequest) {
  await requireAdmin(req);
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month") ? Number(searchParams.get("month")) : null;
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : null;
  const memberId = searchParams.get("memberId");

  const paymentWhere: Record<string, unknown> = {};
  if (month) paymentWhere.month = month;
  if (year) paymentWhere.year = year;
  if (memberId) paymentWhere.memberId = memberId;

  const [payments, charities, loans] = await Promise.all([
    prisma.payment.findMany({
      where: paymentWhere,
      include: { member: true, receipt: true },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    }),
    prisma.charity.findMany({
      where: year
        ? {
            date: {
              gte: new Date(Date.UTC(year, month ? month - 1 : 0, 1)),
              lt: new Date(Date.UTC(year, month ? month : 12, 1)),
            },
          }
        : undefined,
      orderBy: [{ date: "desc" }],
    }),
    prisma.loan.findMany({
      where: memberId ? { memberId } : undefined,
      include: { member: true },
      orderBy: [{ createdAt: "desc" }],
    }),
  ]);

  const wb = XLSX.utils.book_new();

  const paymentsRows = payments.map((p) => ({
    memberUid: p.member.memberUid,
    memberName: p.member.fullName,
    month: p.month,
    year: p.year,
    baseAmount: p.baseAmountPaise / 100,
    penaltyAmount: p.penaltyAmountPaise / 100,
    totalAmount: p.totalAmountPaise / 100,
    status: p.status,
    method: p.paymentMethod ?? "",
    paidAt: p.paidAt ? p.paidAt.toISOString() : "",
    receiptNumber: p.receipt?.receiptNumber ?? "",
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(paymentsRows), "Payments");

  const charityRows = charities.map((c) => ({
    title: c.title,
    beneficiary: c.beneficiary,
    purpose: c.purpose ?? "",
    amount: c.amountPaise / 100,
    date: c.date.toISOString().slice(0, 10),
    notes: c.notes ?? "",
    imageUrl: c.imageUrl ?? "",
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(charityRows), "Charity");

  const loanRows = loans.map((l) => ({
    memberUid: l.member.memberUid,
    memberName: l.member.fullName,
    principal: l.principalPaise / 100,
    monthlyRatePercent: l.monthlyRateBps / 100,
    durationMonths: l.durationMonths,
    startDate: l.startDate.toISOString().slice(0, 10),
    status: l.status,
    approvedAt: l.approvedAt ? l.approvedAt.toISOString().slice(0, 10) : "",
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(loanRows), "Loans");

  const totalCollected = payments
    .filter((p) => p.status === "PAID" || p.status === "LATE")
    .reduce((sum, p) => sum + p.totalAmountPaise, 0);
  const totalCharity = charities.reduce((sum, c) => sum + c.amountPaise, 0);
  const totalLoansIssued = loans
    .filter((l) => l.status === "ACTIVE" || l.status === "CLOSED")
    .reduce((sum, l) => sum + l.principalPaise, 0);
  const availableBalance = totalCollected - totalCharity - totalLoansIssued;

  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet([
      {
        totalCollected: totalCollected / 100,
        totalCharitySpent: totalCharity / 100,
        totalLoansIssued: totalLoansIssued / 100,
        availableBalance: availableBalance / 100,
      },
    ]),
    "Summary"
  );

  const file = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  const nameParts = ["report"];
  if (year) nameParts.push(String(year));
  if (month) nameParts.push(String(month).padStart(2, "0"));
  const filename = `${nameParts.join("-")}.xlsx`;

  return new NextResponse(file, {
    status: 200,
    headers: {
      "content-type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": `attachment; filename="${filename}"`,
      "cache-control": "no-store",
    },
  });
}

