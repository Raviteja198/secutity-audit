import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { loanCreateSchema } from "@/lib/validators/loans";
import { createLoan } from "@/services/loans";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const items = await prisma.loan.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: { member: true },
    });
    return jsonOk({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const body = await req.json();
    const parsed = loanCreateSchema.parse(body);

    const created = await createLoan({ ...parsed, createdById: ctx.userId });

    await writeAuditLog(req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "Loan",
      entityId: created.id,
      newValue: created,
    });

    return jsonCreated(created);
  } catch (e) {
    return jsonError(e);
  }
}

