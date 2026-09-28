import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest, routeCtx: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAuth(req);
    const db = forTenant(ctx.tenantId);
    const { id } = await routeCtx.params;
    const loan = await db.loan.findUnique({
      where: { id },
      include: {
        member: true,
        installments: {
          orderBy: { dueDate: "asc" },
        },
      },
    });
    if (!loan) return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));

    return jsonOk({ loan });
  } catch (e) {
    return jsonError(e);
  }
}