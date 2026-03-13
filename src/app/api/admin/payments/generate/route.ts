import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { generatePaymentsSchema } from "@/lib/validators/payments";
import { generateMonthlyPayments } from "@/services/payments";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const body = await req.json();
    const parsed = generatePaymentsSchema.parse(body);

    const result = await generateMonthlyPayments({
      ...parsed,
      recordedById: ctx.userId,
    });

    await writeAuditLog(req, {
      adminId: ctx.userId,
      action: "GENERATE",
      entity: "Payment",
      entityId: `${parsed.year}-${parsed.month}`,
      newValue: result,
    });

    return jsonOk(result);
  } catch (e) {
    return jsonError(e);
  }
}

