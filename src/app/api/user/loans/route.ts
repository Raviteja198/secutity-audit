import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAuth(req);
    const db = forTenant(ctx.tenantId);
    const items = await db.loan.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: { member: true, installments: { orderBy: { installmentNumber: "asc" } } },
    });
    return jsonOk({ items });
  } catch (e) {
    return jsonError(e);
  }
}

