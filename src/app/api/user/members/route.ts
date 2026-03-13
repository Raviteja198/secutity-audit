import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    await requireAuth(req);
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));
    const q = (searchParams.get("q") ?? "").trim();

    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { fullName: { contains: q, mode: "insensitive" } },
        { memberUid: { contains: q, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.member.findMany({
        where,
        orderBy: [{ status: "asc" }, { joinDate: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.member.count({ where }),
    ]);

    return jsonOk({ items, total, page, pageSize });
  } catch (e) {
    return jsonError(e);
  }
}

