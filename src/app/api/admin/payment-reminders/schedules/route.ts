import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { createScheduledReminder, listScheduledReminders } from "@/lib/scheduledReminders";

export function parseScheduleInput(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const type = body.type === "PAYMENT_GENERATION" ? "PAYMENT_GENERATION" : "PENDING_PAYMENT_REMINDER";
  const enabled = Boolean(body.enabled);
  const dayOfMonth = Number(body.dayOfMonth);
  const hour = Number(body.hour);
  const minute = Number(body.minute);
  const timezone = String(body.timezone ?? "Asia/Kolkata");
  const templateId = body.templateId ? String(body.templateId) : null;
  const sendEmail = body.sendEmail === undefined ? true : Boolean(body.sendEmail);
  const sendWhatsapp = Boolean(body.sendWhatsapp);

  if (!name) throw Object.assign(new Error("Name is required."), { status: 422 });
  if (!Number.isInteger(dayOfMonth) || dayOfMonth < 1 || dayOfMonth > 28) {
    throw Object.assign(new Error("dayOfMonth must be between 1 and 28."), { status: 422 });
  }
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw Object.assign(new Error("hour must be between 0 and 23."), { status: 422 });
  }
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw Object.assign(new Error("minute must be between 0 and 59."), { status: 422 });
  }
  if (!sendEmail && !sendWhatsapp) {
    throw Object.assign(new Error("Select at least one channel (Email or WhatsApp)."), { status: 422 });
  }

  return { name, type, enabled, dayOfMonth, hour, minute, timezone, templateId, sendEmail, sendWhatsapp } as const;
}

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const items = await listScheduledReminders(db);
    return jsonOk({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const body = await req.json().catch(() => ({}));
    const input = parseScheduleInput(body);

    const schedule = await createScheduledReminder(db, auth.tenantId, { ...input, createdById: auth.userId });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "CREATE_SCHEDULED_REMINDER",
      entity: "ScheduledReminder",
      entityId: schedule.id,
      newValue: schedule,
    });

    return jsonOk(schedule);
  } catch (e) {
    return jsonError(e);
  }
}
