import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { charityUpdateSchema } from "@/lib/validators/charity";
import { writeAuditLog } from "@/lib/audit";

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;
    const old = await db.charity.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const body = await req.json();
    const parsed = charityUpdateSchema.parse(body);
    const updated = await db.charity.update({ where: { id }, data: parsed });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "UPDATE",
      entity: "Charity",
      entityId: id,
      oldValue: old,
      newValue: updated,
    });

    return jsonOk(updated);
  } catch (e) {
    return jsonError(e);
  }
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;
    const old = await db.charity.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    await db.charity.delete({ where: { id } });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "DELETE",
      entity: "Charity",
      entityId: id,
      oldValue: old,
    });

    return jsonOk({ ok: true });
  } catch (e) {
    return jsonError(e);
  }
}

