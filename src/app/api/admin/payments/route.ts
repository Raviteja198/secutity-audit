import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { invalidateDashboardCache } from "@/lib/dashboardCache";

export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const { searchParams } = new URL(req.url);

    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(
      100,
      Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20)
    );

    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const status = searchParams.get("status")?.toUpperCase();
    const memberId = searchParams.get("memberId");
    const q = (searchParams.get("q") ?? "").trim();

    const where: Record<string, unknown> = {};

    if (month) where.month = Number(month);
    if (year) where.year = Number(year);

    if (status === "PAID" || status === "PENDING" || status === "LATE") {
      where.status = status;
    }

    if (memberId) where.memberId = memberId;

    if (q) {
      where.member = {
        OR: [
          { fullName: { contains: q, mode: "insensitive" } },
          { memberUid: { contains: q, mode: "insensitive" } },
        ],
      };
    }

    const now = new Date();

    const [items, total, allTimeAgg, thisMonthAgg] = await Promise.all([
      db.payment.findMany({
        where,
        orderBy: [{ year: "desc" }, { month: "desc" }, { createdAt: "desc" }],
        include: {
          member: true,
          receipt: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),

      db.payment.count({ where }),

      db.payment.aggregate({
        where: { status: { in: ["PAID", "LATE"] } },
        _sum: { totalAmountPaise: true },
      }),

      db.payment.aggregate({
        where: {
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

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    const db = forTenant(admin.tenantId);

    // Verify the session user actually exists in this database.
    // If it doesn't (e.g. DB was re-seeded), return a clear message rather than a 500.
    const sessionUser = await db.user.findUnique({ where: { id: admin.userId }, select: { id: true } });
    if (!sessionUser) {
      return jsonError(
        Object.assign(
          new Error("Your session is linked to a user that no longer exists in this database. Please sign out and sign in again."),
          { status: 401 }
        )
      );
    }

    const body = await req.json();

    const memberId = body.memberId;
    const month = Number(body.month);
    const year = Number(body.year);
    const baseAmount = Number(body.baseAmount);
    const penaltyAmount = Number(body.penaltyAmount ?? 0);

    if (!memberId || !month || !year || !baseAmount) {
      return jsonError("Missing required fields");
    }

    const payment = await db.payment.create({
      data: {
        tenantId: admin.tenantId,
        month,
        year,
        baseAmountPaise: baseAmount * 100,
        penaltyAmountPaise: penaltyAmount * 100,
        totalAmountPaise: (baseAmount + penaltyAmount) * 100,
        status: "PENDING",
        memberId,
        recordedById: admin.userId,
      },
      include: {
        member: true,
        receipt: true,
      },
    });

    await invalidateDashboardCache();

    return jsonOk(payment);
  } catch (e) {
    return jsonError(e);
  }
}



// import { NextRequest } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { requireAdmin } from "@/lib/api/authz";
// import { jsonError, jsonOk } from "@/lib/api/http";

// export async function GET(req: NextRequest) {
//   try {
//     await requireAdmin(req);
//     const { searchParams } = new URL(req.url);
//     const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
//     const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));

//     const month = searchParams.get("month");
//     const year = searchParams.get("year");
//     const status = searchParams.get("status")?.toUpperCase();
//     const memberId = searchParams.get("memberId");
//     const q = (searchParams.get("q") ?? "").trim();

//     const where: Record<string, unknown> = {};
//     if (month) where.month = Number(month);
//     if (year) where.year = Number(year);
//     if (status === "PAID" || status === "PENDING" || status === "LATE") where.status = status;
//     if (memberId) where.memberId = memberId;
//     if (q) {
//       where.member = {
//         OR: [
//           { fullName: { contains: q, mode: "insensitive" } },
//           { memberUid: { contains: q, mode: "insensitive" } },
//         ],
//       };
//     }

//     const [items, total] = await Promise.all([
//       db.payment.findMany({
//         where,
//         orderBy: [{ year: "desc" }, { month: "desc" }, { createdAt: "desc" }],
//         include: { member: true, receipt: true },
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//       }),
//       db.payment.count({ where }),
//     ]);

//     return jsonOk({ items, total, page, pageSize });
//   } catch (e) {
//     return jsonError(e);
//   }
// }

