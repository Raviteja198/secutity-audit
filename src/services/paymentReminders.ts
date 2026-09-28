import type { TenantPrismaClient } from "@/lib/tenantPrisma";
import type { Payment, Member, ScheduledReminderType, ReminderRunTrigger } from "@prisma/client";
import { sendNotification } from "@/services/notifications";
import { deriveHtmlFromBody, renderReminderTemplate, resolveReminderTemplate } from "@/lib/reminderTemplates";
import { getBaseUrl } from "@/lib/url";

function formatMoney(paise: number) {
  return `Rs. ${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatPeriod(month: number, year: number) {
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export type ReminderResult = {
  sent: number;
  skipped: number;
  failed: Array<{ memberId: string; email: string | null; error: string }>;
};

type PaymentWithMember = Payment & { member: Member };

type RunContext = {
  type: ScheduledReminderType;
  trigger: ReminderRunTrigger;
  scheduledReminderId?: string | null;
  triggeredById?: string | null;
  templateId?: string | null;
  period?: string | null;
  sendEmail?: boolean;
  sendWhatsapp?: boolean;
};

/**
 * Groups payments by member, renders the resolved template, sends the email/WhatsApp
 * notification per member, and records a ReminderRun + ReminderRunRecipient[] row for
 * history/drill-down. Shared by both "send to everyone with a pending payment" and
 * "notify just these newly-generated payments."
 */
async function sendReminderEmails(db: TenantPrismaClient, tenantId: string, payments: PaymentWithMember[], ctx: RunContext): Promise<ReminderResult> {
  const grouped = new Map<string, { email: string | null; phone: string | null; fullName: string; items: PaymentWithMember[] }>();
  const skippedNoContact: string[] = [];

  for (const payment of payments) {
    const email = payment.member.email?.trim() || null;
    const phone = payment.member.phone?.trim() || null;
    if (!email && !phone) {
      if (!skippedNoContact.includes(payment.memberId)) skippedNoContact.push(payment.memberId);
      continue;
    }
    const current = grouped.get(payment.memberId);
    if (current) {
      current.items.push(payment);
    } else {
      grouped.set(payment.memberId, { email, phone, fullName: payment.member.fullName, items: [payment] });
    }
  }

  let sent = 0;
  const failed: ReminderResult["failed"] = [];
  const recipients: { tenantId: string; memberId: string; email: string | null; status: "SENT" | "FAILED" | "SKIPPED"; error?: string }[] = [];
  const template = await resolveReminderTemplate(db, tenantId, ctx.templateId);

  for (const [memberId, group] of grouped.entries()) {
    const totalDue = group.items.reduce((sum, item) => sum + item.totalAmountPaise, 0);
    const itemsList = group.items
      .map((item) => `• ${formatPeriod(item.month, item.year)} — ${formatMoney(item.totalAmountPaise)}`)
      .join("\n");

    const vars = {
      fullName: group.fullName,
      totalDue: formatMoney(totalDue),
      itemsList,
    };

    try {
      const loginUrl = `${getBaseUrl()}/login`;
      const subject = renderReminderTemplate(template.subject, vars);
      const text = `${renderReminderTemplate(template.body, vars)}\n\nLog in to pay: ${loginUrl}`;
      const html = `${deriveHtmlFromBody(renderReminderTemplate(template.body, vars))}<p>Log in to pay: <a href="${loginUrl}">${loginUrl}</a></p>`;

      await sendNotification({
        user: {
          name: group.fullName,
          email: group.email,
          phoneNumber: group.phone,
        },
        payment: {
          amount: Number((totalDue / 100).toFixed(2)),
          dueDate: group.items.map((item) => formatPeriod(item.month, item.year)).join(", "),
        },
        email: {
          subject,
          text,
          html,
        },
        channels: { email: ctx.sendEmail ?? true, whatsapp: ctx.sendWhatsapp ?? false },
      });
      sent += 1;
      recipients.push({ tenantId, memberId, email: group.email, status: "SENT" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      failed.push({ memberId, email: group.email, error: message });
      recipients.push({ tenantId, memberId, email: group.email, status: "FAILED", error: message });
    }
  }

  for (const memberId of skippedNoContact) {
    recipients.push({ tenantId, memberId, email: null, status: "SKIPPED" });
  }

  await db.reminderRun.create({
    data: {
      tenantId,
      type: ctx.type,
      trigger: ctx.trigger,
      scheduledReminderId: ctx.scheduledReminderId ?? null,
      templateId: template.id,
      triggeredById: ctx.triggeredById ?? null,
      sentCount: sent,
      skippedCount: skippedNoContact.length,
      period: ctx.period ?? null,
      recipients: { create: recipients },
    },
  });

  return { sent, skipped: skippedNoContact.length, failed };
}

/** Emails every member with a PENDING payment a reminder listing their dues. */
export async function sendPendingPaymentReminders(db: TenantPrismaClient, tenantId: string, ctx: {
  templateId?: string | null;
  trigger: ReminderRunTrigger;
  scheduledReminderId?: string | null;
  triggeredById?: string | null;
  sendEmail?: boolean;
  sendWhatsapp?: boolean;
}): Promise<ReminderResult> {
  const payments = await db.payment.findMany({
    where: { status: "PENDING" },
    include: { member: true },
    orderBy: [{ year: "asc" }, { month: "asc" }],
  });

  return sendReminderEmails(db, tenantId, payments, {
    type: "PENDING_PAYMENT_REMINDER",
    trigger: ctx.trigger,
    scheduledReminderId: ctx.scheduledReminderId,
    triggeredById: ctx.triggeredById,
    templateId: ctx.templateId,
    sendEmail: ctx.sendEmail,
    sendWhatsapp: ctx.sendWhatsapp,
  });
}

/** Notifies just the members behind these specific (newly-generated) payments. */
export async function notifyGeneratedPayments(
  db: TenantPrismaClient,
  tenantId: string,
  payments: PaymentWithMember[],
  ctx: {
    templateId?: string | null;
    trigger: ReminderRunTrigger;
    scheduledReminderId?: string | null;
    triggeredById?: string | null;
    period?: string | null;
    sendEmail?: boolean;
    sendWhatsapp?: boolean;
  }
): Promise<ReminderResult> {
  return sendReminderEmails(db, tenantId, payments, {
    type: "PAYMENT_GENERATION",
    trigger: ctx.trigger,
    scheduledReminderId: ctx.scheduledReminderId,
    triggeredById: ctx.triggeredById,
    templateId: ctx.templateId,
    period: ctx.period,
    sendEmail: ctx.sendEmail,
    sendWhatsapp: ctx.sendWhatsapp,
  });
}
