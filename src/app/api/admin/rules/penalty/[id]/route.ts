import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAdmin(req);
    const { id } = await params;

    const existing = await prisma.penaltyRule.findUnique({ where: { id } });
    if (!existing) {
      return jsonError({ message: "Rule not found", status: 404 });
    }

    const deleted = await prisma.penaltyRule.delete({ where: { id } });

    await writeAuditLog(req, {
      adminId: ctx.userId,
      action: "DELETE",
      entity: "PenaltyRule",
      entityId: id,
      oldValue: existing,
    });

    return jsonOk({ deleted });
  } catch (e) {
    return jsonError(e);
  }
}
