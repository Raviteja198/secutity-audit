import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));

    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const memberId = searchParams.get("memberId");

    const where: Record<string, unknown> = { memberId: auth.userId };
    if (month) where.month = Number(month);
    if (year) where.year = Number(year);
    if (memberId) where.memberId = memberId;

    const [items, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: [{ year: "desc" }, { month: "desc" }, { createdAt: "desc" }],
        include: { member: true, receipt: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.payment.count({ where }),
    ]);

    return jsonOk({ items, total, page, pageSize });
  } catch (e) {
    return jsonError(e);
  }
}

