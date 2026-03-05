import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { approveLoan } from "@/services/loans";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const { id } = await ctx.params;
    const old = await prisma.loan.findUnique({ where: { id } });
    if (!old) return jsonError(Object.assign(new Error("Not found"), { status: 404 }));

    const updated = await approveLoan({ loanId: id, approvedById: auth.userId });

    await writeAuditLog(req, {
      adminId: auth.userId,
      action: "APPROVE",
      entity: "Loan",
      entityId: id,
      oldValue: old,
      newValue: updated,
    });

    return jsonOk(updated);
  } catch (e) {
    return jsonError(e);
  }
}

