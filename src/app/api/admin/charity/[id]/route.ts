import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { charityUpdateSchema } from "@/lib/validators/charity";
import { writeAuditLog } from "@/lib/audit";

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const { id } = await ctx.params;
    const old = await prisma.charity.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const body = await req.json();
    const parsed = charityUpdateSchema.parse(body);
    const updated = await prisma.charity.update({ where: { id }, data: parsed });

    await writeAuditLog(req, {
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
    const { id } = await ctx.params;
    const old = await prisma.charity.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    await prisma.charity.delete({ where: { id } });

    await writeAuditLog(req, {
      adminId: auth.userId,
      action: "DELETE",
      entity: "Charity",
      entityId: id,
      oldValue: old,
      newValue: null,
    });

    return jsonOk({ ok: true });
  } catch (e) {
    return jsonError(e);
  }
}

