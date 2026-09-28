import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { deleteReminderTemplate, getReminderTemplate, updateReminderTemplate } from "@/lib/reminderTemplates";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;
    const template = await getReminderTemplate(db, id);
    if (!template) return jsonError(Object.assign(new Error("Template not found."), { status: 404 }));
    return jsonOk(template);
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

    const name = String(body.name ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const templateBody = String(body.body ?? "");

    if (!name) return jsonError(Object.assign(new Error("Name is required."), { status: 422 }));
    if (!subject) return jsonError(Object.assign(new Error("Subject is required."), { status: 422 }));
    if (!templateBody.trim()) return jsonError(Object.assign(new Error("Body is required."), { status: 422 }));

    const previous = await getReminderTemplate(db, id);
    if (!previous) return jsonError(Object.assign(new Error("Template not found."), { status: 404 }));

    const template = await updateReminderTemplate(db, id, { name, subject, body: templateBody });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "UPDATE_REMINDER_TEMPLATE",
      entity: "ReminderTemplate",
      entityId: id,
      oldValue: previous,
      newValue: template,
    });

    return jsonOk(template);
  } catch (e) {
    return jsonError(e);
  }
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;

    const previous = await getReminderTemplate(db, id);
    if (!previous) return jsonError(Object.assign(new Error("Template not found."), { status: 404 }));

    await deleteReminderTemplate(db, id);

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "DELETE_REMINDER_TEMPLATE",
      entity: "ReminderTemplate",
      entityId: id,
      oldValue: previous,
    });

    return jsonOk({ message: "Template deleted." });
  } catch (e) {
    return jsonError(e);
  }
}
