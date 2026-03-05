import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { memberUpdateSchema } from "@/lib/validators/members";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin(req);
    const { id } = await ctx.params;
    const member = await prisma.member.findUnique({ where: { id } });
    if (!member) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));
    return jsonOk(member);
  } catch (e) {
    return jsonError(e);
  }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const { id } = await ctx.params;
    const old = await prisma.member.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const body = await req.json();
    const parsed = memberUpdateSchema.parse(body);

    const updated = await prisma.member.update({
      where: { id },
      data: {
        memberUid: parsed.memberUid,
        fullName: parsed.fullName,
        phone: parsed.phone,
        email: parsed.email,
        address: parsed.address,
        joinDate: parsed.joinDate,
        status: parsed.status,
        exitDate: parsed.exitDate,
      },
    });

    await writeAuditLog(req, {
      adminId: auth.userId,
      action: "UPDATE",
      entity: "Member",
      entityId: id,
      oldValue: old,
      newValue: updated,
    });

    return jsonOk(updated);
  } catch (e) {
    return jsonError(e);
  }
}

// Soft-deactivate
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const { id } = await ctx.params;
    const old = await prisma.member.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const updated = await prisma.member.update({
      where: { id },
      data: {
        status: "INACTIVE",
        exitDate: old.exitDate ?? new Date(),
      },
    });

    await writeAuditLog(req, {
      adminId: auth.userId,
      action: "DEACTIVATE",
      entity: "Member",
      entityId: id,
      oldValue: old,
      newValue: updated,
    });

    return jsonOk(updated);
  } catch (e) {
    return jsonError(e);
  }
}

