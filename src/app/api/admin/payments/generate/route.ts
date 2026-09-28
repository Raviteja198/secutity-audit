import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { generatePaymentsSchema } from "@/lib/validators/payments";
import { generateMonthlyPayments } from "@/services/payments";
import { writeAuditLog } from "@/lib/audit";
import { invalidateDashboardCache } from "@/lib/dashboardCache";

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const body = await req.json();
    const parsed = generatePaymentsSchema.parse(body);

    const generated = await generateMonthlyPayments(db, ctx.tenantId, {
      ...parsed,
      recordedById: ctx.userId,
    });
    const result = {
      createdOrExisting: generated.createdOrExisting,
      createdCount: generated.createdCount,
      baseAmountPaise: generated.baseAmountPaise,
    };

    await writeAuditLog(db, ctx.tenantId, req, {
      adminId: ctx.userId,
      action: "GENERATE",
      entity: "Payment",
      entityId: `${parsed.year}-${parsed.month}`,
      newValue: result,
    });

    await invalidateDashboardCache();

    return jsonOk(result);
  } catch (e) {
    return jsonError(e);
  }
}
