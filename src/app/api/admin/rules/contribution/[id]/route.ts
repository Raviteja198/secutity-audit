import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAuditLog } from "@/lib/audit";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const { id } = await params;

    const existing = await db.contributionRule.findUnique({ where: { id } });
    if (!existing) {
      return jsonError({ message: "Rule not found", status: 404 });
    }

    const deleted = await db.contributionRule.delete({ where: { id } });

    await writeAuditLog(db, ctx.tenantId, req, {
      adminId: ctx.userId,
      action: "DELETE",
      entity: "ContributionRule",
      entityId: id,
      oldValue: existing,
    });

    return jsonOk({ deleted });
  } catch (e) {
    return jsonError(e);
  }
}
