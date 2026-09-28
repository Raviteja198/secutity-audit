import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";
import { getReminderTemplate, setDefaultReminderTemplate } from "@/lib/reminderTemplates";

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;

    const template = await getReminderTemplate(db, id);
    if (!template) return jsonError(Object.assign(new Error("Template not found."), { status: 404 }));

    await setDefaultReminderTemplate(db, id);

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "SET_DEFAULT_REMINDER_TEMPLATE",
      entity: "ReminderTemplate",
      entityId: id,
    });

    return jsonOk({ message: "Default template updated." });
  } catch (e) {
    return jsonError(e);
  }
}
