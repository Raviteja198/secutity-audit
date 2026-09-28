import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { contributionRuleCreateSchema } from "@/lib/validators/rules";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const items = await db.contributionRule.findMany({
      orderBy: [{ effectiveFromYear: "desc" }, { effectiveFromMonth: "desc" }],
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
    const parsed = contributionRuleCreateSchema.parse(body);

    const created = await db.contributionRule.create({
      data: {
        ...parsed,
        tenantId: ctx.tenantId,
        createdById: ctx.userId,
      },
    });

    await writeAuditLog(db, ctx.tenantId, req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "ContributionRule",
      entityId: created.id,
      newValue: created,
    });

    return jsonCreated(created);
  } catch (e) {
    return jsonError(e);
  }
}

