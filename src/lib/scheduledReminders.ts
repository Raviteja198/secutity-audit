// Allowed to import the raw client directly: this is the one place that
// enumerates every tenant for the cron loop below, before any single
// tenantId is known.
import { rawPrisma } from "@/lib/prisma";
import { forTenant, type TenantPrismaClient } from "@/lib/tenantPrisma";
import type { ScheduledReminderType } from "@prisma/client";
import { generateMonthlyPayments } from "@/services/payments";
import { notifyGeneratedPayments, sendPendingPaymentReminders } from "@/services/paymentReminders";

export type ScheduledReminderInput = {
  name: string;
  type: ScheduledReminderType;
  enabled: boolean;
  dayOfMonth: number;
  hour: number;
  minute: number;
  timezone: string;
  templateId: string | null;
  sendEmail: boolean;
  sendWhatsapp: boolean;
};

export function listScheduledReminders(db: TenantPrismaClient) {
  return db.scheduledReminder.findMany({
    include: { template: true },
    orderBy: [{ createdAt: "asc" }],
  });
}

export function getScheduledReminder(db: TenantPrismaClient, id: string) {
  return db.scheduledReminder.findUnique({ where: { id }, include: { template: true } });
}

export function createScheduledReminder(db: TenantPrismaClient, tenantId: string, input: ScheduledReminderInput & { createdById: string }) {
  return db.scheduledReminder.create({ data: { ...input, tenantId } });
}

export function updateScheduledReminder(db: TenantPrismaClient, id: string, input: ScheduledReminderInput) {
  // Reset lastRunPeriod on every edit: an admin changing day/hour/minute (or any other
  // setting) means "make this take effect", not "keep treating this month as already
  // sent" — otherwise a schedule that already ran once this period stays blocked until
  // next month even after being reconfigured to a still-upcoming day.
  return db.scheduledReminder.update({ where: { id }, data: { ...input, lastRunPeriod: null } });
}

export function deleteScheduledReminder(db: TenantPrismaClient, id: string) {
  return db.scheduledReminder.delete({ where: { id } });
}

/** Returns the wall-clock day/hour/minute for a timezone, e.g. "day: 10, hour: 9, minute: 45". */
export function getWallClock(date: Date, timeZone: string): { day: number; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const day = Number(parts.find((p) => p.type === "day")?.value ?? date.getUTCDate());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? date.getUTCHours());
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? date.getUTCMinutes());
  return { day, hour, minute };
}

/** "YYYY-MM" for a date in a given timezone, used to key "already ran this month". */
export function getYearMonth(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  return `${year}-${month}`;
}

export type ScheduledReminderOutcome =
  | { id: string; name: string; tenantId: string; ran: false; reason: "not-scheduled-time" | "already-ran-this-period"; day?: number; hour?: number; period?: string }
  | { id: string; name: string; tenantId: string; ran: true; period: string; sent: number; skipped: number; createdCount?: number };

/**
 * Checked on every poll (see src/app/api/cron/payment-reminders/route.ts and the
 * in-process node-cron scheduler in src/lib/cronScheduler.ts): runs every *enabled*
 * ScheduledReminder, across every tenant, whose configured day/hour/minute has
 * arrived (or passed) "now" in its own timezone, and that hasn't already run this
 * calendar month. Uses an "at or after" comparison rather than an exact-time match,
 * so it works correctly no matter how often the caller polls — lastRunPeriod is
 * what prevents duplicate sends/generations once it has fired.
 *
 * Tenants are enumerated and processed sequentially (not in parallel) — this is a
 * low-frequency background job, and sequential processing keeps DB load and
 * outbound email/WhatsApp send rate predictable regardless of tenant count.
 */
export async function runDueScheduledReminders(): Promise<ScheduledReminderOutcome[]> {
  const tenants = await rawPrisma.tenant.findMany({ select: { id: true } });
  const now = new Date();
  const outcomes: ScheduledReminderOutcome[] = [];

  for (const { id: tenantId } of tenants) {
    const db = forTenant(tenantId);
    const schedules = await db.scheduledReminder.findMany({ where: { enabled: true } });

    for (const schedule of schedules) {
      const { day, hour, minute } = getWallClock(now, schedule.timezone);
      const currentPeriod = getYearMonth(now, schedule.timezone);

      const isAtOrPastScheduledTime =
        day === schedule.dayOfMonth &&
        (hour > schedule.hour || (hour === schedule.hour && minute >= schedule.minute));

      if (!isAtOrPastScheduledTime) {
        outcomes.push({ id: schedule.id, name: schedule.name, tenantId, ran: false, reason: "not-scheduled-time", day, hour });
        continue;
      }

      if (schedule.lastRunPeriod === currentPeriod) {
        outcomes.push({ id: schedule.id, name: schedule.name, tenantId, ran: false, reason: "already-ran-this-period", period: currentPeriod });
        continue;
      }

      if (schedule.type === "PENDING_PAYMENT_REMINDER") {
        const result = await sendPendingPaymentReminders(db, tenantId, {
          templateId: schedule.templateId,
          trigger: "SCHEDULED",
          scheduledReminderId: schedule.id,
          sendEmail: schedule.sendEmail,
          sendWhatsapp: schedule.sendWhatsapp,
        });
        await db.scheduledReminder.update({ where: { id: schedule.id }, data: { lastRunPeriod: currentPeriod } });
        outcomes.push({ id: schedule.id, name: schedule.name, tenantId, ran: true, period: currentPeriod, sent: result.sent, skipped: result.skipped });
      } else {
        const [month, year] = currentPeriod.split("-").reverse().map(Number);
        const generateResult = await generateMonthlyPayments(db, tenantId, { month, year, recordedById: schedule.createdById });

        let sent = 0;
        let skipped = 0;
        if (generateResult.createdPayments.length > 0) {
          const notifyResult = await notifyGeneratedPayments(db, tenantId, generateResult.createdPayments, {
            templateId: schedule.templateId,
            trigger: "SCHEDULED",
            scheduledReminderId: schedule.id,
            period: currentPeriod,
            sendEmail: schedule.sendEmail,
            sendWhatsapp: schedule.sendWhatsapp,
          });
          sent = notifyResult.sent;
          skipped = notifyResult.skipped;
        }

        await db.scheduledReminder.update({ where: { id: schedule.id }, data: { lastRunPeriod: currentPeriod } });
        outcomes.push({ id: schedule.id, name: schedule.name, tenantId, ran: true, period: currentPeriod, sent, skipped, createdCount: generateResult.createdCount });
      }
    }
  }

  return outcomes;
}
