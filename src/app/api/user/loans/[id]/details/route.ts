import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth(req);
    const { id } = await ctx.params;
    const loan = await prisma.loan.findUnique({
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