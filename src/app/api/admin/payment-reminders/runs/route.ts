import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));

    const [items, total] = await Promise.all([
      db.reminderRun.findMany({
        include: { template: true, scheduledReminder: true, triggeredBy: true },
        orderBy: { startedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.reminderRun.count(),
    ]);

    return jsonOk({ items, total, page, pageSize });
  } catch (e) {
    return jsonError(e);
  }
}
