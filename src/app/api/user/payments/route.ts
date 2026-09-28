import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    const db = forTenant(auth.tenantId);
    const user = await db.user.findUnique({
      where: { id: auth.userId },
      select: { memberId: true },
    });

    if (!user?.memberId) {
      throw Object.assign(new Error("No member profile is linked to this user."), { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));

    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const where: Record<string, unknown> = { memberId: user.memberId };
    if (month) where.month = Number(month);
    if (year) where.year = Number(year);

    const now = new Date();

    const [items, total, allTimeAgg, thisMonthAgg] = await Promise.all([
      db.payment.findMany({
        where,
        orderBy: [{ year: "desc" }, { month: "desc" }, { createdAt: "desc" }],
        include: { member: true, receipt: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.payment.count({ where }),

      db.payment.aggregate({
        where: { memberId: user.memberId, status: { in: ["PAID", "LATE"] } },
        _sum: { totalAmountPaise: true },
      }),

      db.payment.aggregate({
        where: {
          memberId: user.memberId,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
          status: { in: ["PAID", "LATE"] },
        },
        _sum: { totalAmountPaise: true },
      }),
    ]);

    return jsonOk({
      items,
      total,
      page,
      pageSize,
      allTimeCollected: allTimeAgg._sum.totalAmountPaise ?? 0,
      thisMonthCollected: thisMonthAgg._sum.totalAmountPaise ?? 0,
    });
  } catch (e) {
    return jsonError(e);
  }
}

