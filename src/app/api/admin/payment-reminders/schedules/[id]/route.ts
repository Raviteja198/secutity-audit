import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { deleteScheduledReminder, getScheduledReminder, updateScheduledReminder } from "@/lib/scheduledReminders";
import { parseScheduleInput } from "../route";

export async function GET(req: NextRequest, routeCtx: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const { id } = await routeCtx.params;
    const schedule = await getScheduledReminder(db, id);
    if (!schedule) return jsonError(Object.assign(new Error("Schedule not found."), { status: 404 }));
    return jsonOk(schedule);
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;
    const body = await req.json().catch(() => ({}));
    const input = parseScheduleInput(body);

    const previous = await getScheduledReminder(db, id);
    if (!previous) return jsonError(Object.assign(new Error("Schedule not found."), { status: 404 }));

    const schedule = await updateScheduledReminder(db, id, input);

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "UPDATE_SCHEDULED_REMINDER",
      entity: "ScheduledReminder",
      entityId: id,
      oldValue: previous,
      newValue: schedule,
    });

    return jsonOk(schedule);
  } catch (e) {
    return jsonError(e);
  }
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;

    const previous = await getScheduledReminder(db, id);
    if (!previous) return jsonError(Object.assign(new Error("Schedule not found."), { status: 404 }));

    await deleteScheduledReminder(db, id);

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "DELETE_SCHEDULED_REMINDER",
      entity: "ScheduledReminder",
      entityId: id,
      oldValue: previous,
    });

    return jsonOk({ message: "Schedule deleted." });
  } catch (e) {
    return jsonError(e);
  }
}
