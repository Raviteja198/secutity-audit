export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { runDueScheduledReminders } from "@/lib/scheduledReminders";

/**
 * Triggered periodically (currently by an external scheduler such as cron-job.org
 * hitting this URL hourly — see README/setup notes; previously Vercel Cron before
 * hitting the Hobby-plan frequency limit). Delegates to the same schedule-check used
 * by the in-process node-cron scheduler (src/lib/cronScheduler.ts) for non-Vercel
 * deployments — only one of the two actually fires depending on the host. Checks
 * every enabled ScheduledReminder row and runs whichever ones are due.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const outcomes = await runDueScheduledReminders();
  return NextResponse.json({ outcomes });
}
