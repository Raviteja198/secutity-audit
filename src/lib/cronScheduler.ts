import cron from "node-cron";
import { runDueScheduledReminders } from "@/lib/scheduledReminders";

// Guards against double-registration across Next.js hot-reloads in dev, same
// pattern as the Prisma client singleton in src/lib/prisma.ts.
const globalForCron = globalThis as unknown as { reminderCronStarted?: boolean };

/**
 * In-process alternative to Vercel Cron, for deployments that run as a persistent
 * Node process (a VPS, Docker, Render, Railway, etc. via `next start`) rather than
 * Vercel's serverless functions. node-cron only works because something keeps this
 * process alive between ticks — on Vercel, nothing does, which is why that platform
 * needs its own external scheduler (see src/app/api/cron/payment-reminders/route.ts
 * + the "crons" entry in vercel.json) instead of this.
 *
 * Only starts when NOT running on Vercel (VERCEL is set automatically by their
 * runtime), so the exact same codebase behaves correctly on either host.
 */
export function startReminderCronIfNeeded() {
  if (process.env.VERCEL) return;
  if (globalForCron.reminderCronStarted) return;
  globalForCron.reminderCronStarted = true;

  // Every 15 minutes — fine enough that a schedule's configured minute (not just its
  // hour) is actually respected; see the "at or past scheduled time" check in
  // runDueScheduledReminders. The schedule itself (day/hour/minute/enabled) is read
  // from the database on every tick.
  cron.schedule("*/15 * * * *", () => {
    runDueScheduledReminders().catch((err) => {
      console.error("[reminder-cron] Failed to check/run scheduled reminders:", err);
    });
  });

  console.log("[reminder-cron] In-process reminder scheduler started (non-Vercel host detected).");
}
