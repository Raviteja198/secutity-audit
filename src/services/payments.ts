import { prisma } from "@/lib/prisma";
import { getContributionRuleForMonth, getPenaltyRuleForDate } from "@/services/rules";

function dueDateUtc(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
}

async function getPaymentDueDay(): Promise<number> {
  const s = await prisma.setting.findUnique({ where: { key: "paymentDueDay" } });
  const day = (s?.value as any)?.day;
  if (typeof day === "number" && day >= 1 && day <= 28) return day;
  return 10;
}

async function nextReceiptNumber(): Promise<string> {
  const prefixSetting = await prisma.setting.findUnique({ where: { key: "receiptPrefix" } });
  const prefix = (prefixSetting?.value as any)?.prefix ?? "RCP";
  const date = new Date();
  const y = String(date.getUTCFullYear());
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${y}${m}${d}-${rand}`;
}

export async function generateMonthlyPayments(input: {
  month: number;
  year: number;
  recordedById: string;
}) {
  const rule = await getContributionRuleForMonth(input.year, input.month);
  if (!rule) throw Object.assign(new Error("No contribution rule configured for this month"), { status: 400 });

  const members = await prisma.member.findMany({ where: { status: "ACTIVE" } });
  const creates = members.map((m) =>
    prisma.payment.upsert({
      where: { memberId_month_year: { memberId: m.id, month: input.month, year: input.year } },
      update: {},
      create: {
        memberId: m.id,
        month: input.month,
        year: input.year,
        baseAmountPaise: rule.amountPaise,
        penaltyAmountPaise: 0,
        totalAmountPaise: rule.amountPaise,
        status: "PENDING",
        recordedById: input.recordedById,
      },
    })
  );

  const results = await prisma.$transaction(creates);
  return { createdOrExisting: results.length, baseAmountPaise: rule.amountPaise };
}

export async function recordPayment(input: {
  paymentId: string;
  method: "CASH" | "UPI" | "BANK";
  paidAt?: Date;
  recordedById: string;
}) {
  const paidAt = input.paidAt ?? new Date();
  const payment = await prisma.payment.findUnique({
    where: { id: input.paymentId },
    include: { receipt: true },
  });
  if (!payment) throw Object.assign(new Error("Payment not found"), { status: 404 });

  const dueDay = await getPaymentDueDay();
  const dueDate = dueDateUtc(payment.year, payment.month, dueDay);

  const isLate = paidAt.getTime() > dueDate.getTime();
  const penaltyRule = isLate ? await getPenaltyRuleForDate(paidAt) : null;
  const penaltyAmountPaise = isLate ? penaltyRule?.amountPaise ?? payment.penaltyAmountPaise : 0;
  const totalAmountPaise = payment.baseAmountPaise + penaltyAmountPaise;

  const updated = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      penaltyAmountPaise,
      totalAmountPaise,
      status: isLate ? "LATE" : "PAID",
      paymentMethod: input.method,
      paidAt,
      recordedById: input.recordedById,
    },
  });

  const receipt =
    payment.receipt ??
    (await prisma.receipt.create({
      data: {
        paymentId: payment.id,
        receiptNumber: await nextReceiptNumber(),
      },
    }));

  return { payment: updated, receipt };
}

