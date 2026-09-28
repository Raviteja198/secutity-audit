import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/api/authz";
import { forTenant } from "@/lib/tenantPrisma";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAuth(req);
    const db = forTenant(ctx.tenantId);
    const tenant = await db.tenant.findUnique({
      where: { id: ctx.tenantId },
      select: { name: true, logoUrl: true },
    });
    return jsonOk({ name: tenant?.name ?? null, logoUrl: tenant?.logoUrl ?? null });
  } catch (e) {
    return jsonError(e);
  }
}
