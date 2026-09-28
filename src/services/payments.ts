import type { TenantPrismaClient } from "@/lib/tenantPrisma";
import { getContributionRuleForMonth, getPenaltyRuleForDate } from "@/services/rules";
import { recordTransaction } from "@/services/fund";
import { buildReceiptPdf } from "@/services/receipts";
import { sendEmail } from "@/services/email";

function dueDateUtc(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
}

function formatMoney(paise: number) {
  return `Rs. ${(paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPeriod(month: number, year: number) {
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

async function getPaymentDueDay(db: TenantPrismaClient, tenantId: string): Promise<number> {
  const s = await db.setting.findUnique({ where: { tenantId_key: { tenantId, key: "paymentDueDay" } } });
  const day = (s?.value as unknown as { day?: unknown } | null)?.day;
  if (typeof day === "number" && day >= 1 && day <= 28) return day;
  return 10;
}

async function nextReceiptNumber(db: TenantPrismaClient, tenantId: string): Promise<string> {
  const prefixSetting = await db.setting.findUnique({ where: { tenantId_key: { tenantId, key: "receiptPrefix" } } });
  const prefix =
    (prefixSetting?.value as unknown as { prefix?: unknown } | null)?.prefix ?? "RCP";
  const date = new Date();
  const y = String(date.getUTCFullYear());
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${y}${m}${d}-${rand}`;
}

export async function generateMonthlyPayments(db: TenantPrismaClient, tenantId: string, input: {
  month: number;
  year: number;
  recordedById: string;
}) {
  const rule = await getContributionRuleForMonth(db, input.year, input.month);
  if (!rule) {
    throw Object.assign(new Error("No contribution rule configured for this month"), {
      status: 400,
    });
  }

  const members = await db.member.findMany({ where: { status: "ACTIVE" } });

  const existing = await db.payment.findMany({
    where: { month: input.month, year: input.year, memberId: { in: members.map((m) => m.id) } },
    select: { memberId: true },
  });
  const existingMemberIds = new Set(existing.map((p) => p.memberId));
  const newMembers = members.filter((m) => !existingMemberIds.has(m.id));

  const creates = newMembers.map((m) =>
    db.payment.create({
      data: {
        tenantId,
        memberId: m.id,
        month: input.month,
        year: input.year,
        baseAmountPaise: rule.amountPaise,
        penaltyAmountPaise: 0,
        totalAmountPaise: rule.amountPaise,
        status: "PENDING",
        recordedById: input.recordedById,
      },
      include: { member: true, receipt: true },
    })
  );

  const created = creates.length > 0 ? await db.$transaction(creates) : [];

  return {
    createdOrExisting: existingMemberIds.size + created.length,
    createdCount: created.length,
    createdPayments: created,
    baseAmountPaise: rule.amountPaise,
  };
}

export async function recordPayment(db: TenantPrismaClient, tenantId: string, input: {
  paymentId: string;
  method: "CASH" | "UPI" | "BANK";
  paidAt?: Date;
  recordedById: string;
}) {
  const paidAt = input.paidAt ?? new Date();
  const payment = await db.payment.findUnique({
    where: { id: input.paymentId },
    include: { receipt: true, member: true },
  });
  if (!payment) throw Object.assign(new Error("Payment not found"), { status: 404 });

  const alreadyRecorded = payment.status === "PAID" || payment.status === "LATE";

  const dueDay = await getPaymentDueDay(db, tenantId);
  const dueDate = dueDateUtc(payment.year, payment.month, dueDay);

  const isPastDueDate = paidAt.getTime() > dueDate.getTime();
  const penaltyRule = isPastDueDate ? await getPenaltyRuleForDate(db, paidAt) : null;
  const penaltyAmountPaise = isPastDueDate ? penaltyRule?.amountPaise ?? payment.penaltyAmountPaise : 0;
  const shouldStayLate = payment.status === "LATE";
  const shouldMarkLate = shouldStayLate || penaltyAmountPaise > 0;
  const totalAmountPaise = payment.baseAmountPaise + penaltyAmountPaise;

  const previousTotal = payment.totalAmountPaise;
  const fundDelta = alreadyRecorded ? (totalAmountPaise - previousTotal) : totalAmountPaise;

  const updated = await db.$transaction(async (tx) => {
    const updatedPayment = await tx.payment.update({
      where: { id: payment.id },
      data: {
        penaltyAmountPaise,
        totalAmountPaise,
        status: shouldMarkLate ? "LATE" : "PAID",
        paymentMethod: input.method,
        paidAt,
        recordedById: input.recordedById,
      },
    });

    const receipt =
      payment.receipt ??
      (await tx.receipt.create({
        data: {
          tenantId,
          paymentId: payment.id,
          receiptNumber: await nextReceiptNumber(db, tenantId),
        },
      }));

    if (fundDelta !== 0) {
      await recordTransaction(
        db,
        {
          type: "PAYMENT_RECEIVED",
          amount: fundDelta,
          description: `Payment received for ${totalAmountPaise} paise`,
          paymentId: payment.id,
          createdById: input.recordedById,
        },
        tenantId,
        tx
      );
    }

    return { payment: updatedPayment, receipt };
  });

  if (payment.member.email) {
    try {
      const { bytes, receiptNumber } = await buildReceiptPdf(db, payment.id);
      const paymentPeriod = formatPeriod(payment.month, payment.year);
      await sendEmail({
        to: payment.member.email,
        subject: `Payment received for ${payment.member.fullName}`,
        text: [
          `Hello ${payment.member.fullName},`,
          "",
          `Your payment for ${paymentPeriod} has been recorded successfully.`,
          `Amount received: ${formatMoney(totalAmountPaise)}`,
          `Payment method: ${input.method}`,
          `Receipt number: ${updated.receipt.receiptNumber}`,
          "",
          "Your receipt PDF is attached to this email.",
          "Thank you.",
        ].join("\n"),
        html: `
          <p>Hello ${payment.member.fullName},</p>
          <p>Your payment for <strong>${paymentPeriod}</strong> has been recorded successfully.</p>
          <p>
            <strong>Amount received:</strong> ${formatMoney(totalAmountPaise)}<br/>
            <strong>Payment method:</strong> ${input.method}<br/>
            <strong>Receipt number:</strong> ${updated.receipt.receiptNumber}
          </p>
          <p>Your receipt PDF is attached to this email.</p>
          <p>Thank you.</p>
        `,
        attachments: [
          {
            filename: `${receiptNumber}.pdf`,
            content: bytes,
            contentType: "application/pdf",
          },
        ],
      });
    } catch (error) {
      console.error("Failed to send payment receipt email", error);
    }
  }

  return updated;
}
