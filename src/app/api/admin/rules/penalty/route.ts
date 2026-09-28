import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { penaltyRuleCreateSchema } from "@/lib/validators/rules";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const items = await db.penaltyRule.findMany({
      orderBy: [{ effectiveFrom: "desc" }],
      include: { createdBy: { select: { id: true, email: true, name: true } } },
    });
    return jsonOk({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const body = await req.json();
    const parsed = penaltyRuleCreateSchema.parse(body);

    const created = await db.penaltyRule.create({
      data: {
        ...parsed,
        tenantId: ctx.tenantId,
        createdById: ctx.userId,
      },
    });

    await writeAuditLog(db, ctx.tenantId, req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "PenaltyRule",
      entityId: created.id,
      newValue: created,
    });

    return jsonCreated(created);
  } catch (e) {
    return jsonError(e);
  }
}

