import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { charityCreateSchema } from "@/lib/validators/charity";
import { writeAuditLog } from "@/lib/audit";
import { recordTransaction, getFundBalance } from "@/services/fund";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);
    const items = await db.charity.findMany({ orderBy: [{ date: "desc" }, { createdAt: "desc" }] });
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
    const parsed = charityCreateSchema.parse(body);

    // Check fund balance
    const balance = await getFundBalance(db, ctx.tenantId);
    if (balance < parsed.amountPaise) {
      return jsonError("Insufficient funds for charity disbursement");
    }

    const created = await db.$transaction(async (tx) => {
      const c = await tx.charity.create({
        data: { ...parsed, tenantId: ctx.tenantId, createdById: ctx.userId },
      });

      // Record fund transaction for charity disbursement
      await recordTransaction(db, {
        type: "CHARITY_DISBURSED",
        amount: -parsed.amountPaise,
        description: `Charity disbursement for ${parsed.amountPaise} paise`,
        charityId: c.id,
        createdById: ctx.userId,
      }, ctx.tenantId, tx);

      return c;
    });

    await writeAuditLog(db, ctx.tenantId, req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "Charity",
      entityId: created.id,
      newValue: created,
    });

    return jsonCreated(created);
  } catch (e) {
    return jsonError(e);
  }
}

