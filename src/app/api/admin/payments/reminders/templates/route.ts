import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { createReminderTemplate, listReminderTemplates } from "@/lib/reminderTemplates";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const templates = await listReminderTemplates(db);
    return jsonOk({ items: templates });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const body = await req.json().catch(() => ({}));

    const name = String(body.name ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const templateBody = String(body.body ?? "");

    if (!name) return jsonError(Object.assign(new Error("Name is required."), { status: 422 }));
    if (!subject) return jsonError(Object.assign(new Error("Subject is required."), { status: 422 }));
    if (!templateBody.trim()) return jsonError(Object.assign(new Error("Body is required."), { status: 422 }));

    const template = await createReminderTemplate(db, auth.tenantId, { name, subject, body: templateBody });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "CREATE_REMINDER_TEMPLATE",
      entity: "ReminderTemplate",
      entityId: template.id,
      newValue: template,
    });

    return jsonOk(template);
  } catch (e) {
    return jsonError(e);
  }
}
