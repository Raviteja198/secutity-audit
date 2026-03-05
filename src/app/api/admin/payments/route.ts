import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));

    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const status = searchParams.get("status")?.toUpperCase();
    const memberId = searchParams.get("memberId");
    const q = (searchParams.get("q") ?? "").trim();

    const where: any = {};
    if (month) where.month = Number(month);
    if (year) where.year = Number(year);
    if (status === "PAID" || status === "PENDING" || status === "LATE") where.status = status;
    if (memberId) where.memberId = memberId;
    if (q) {
      where.member = {
        OR: [
          { fullName: { contains: q, mode: "insensitive" } },
          { memberUid: { contains: q, mode: "insensitive" } },
        ],
      };
    }

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

