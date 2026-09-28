import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest, routeCtx: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const { id } = await routeCtx.params;

    const run = await db.reminderRun.findUnique({
      where: { id },
      include: {
        template: true,
        scheduledReminder: true,
        triggeredBy: true,
        recipients: {
          include: { member: true },
          orderBy: { id: "asc" },
        },
      },
    });

    if (!run) return jsonError(Object.assign(new Error("Run not found."), { status: 404 }));

    return jsonOk(run);
  } catch (e) {
    return jsonError(e);
  }
}
