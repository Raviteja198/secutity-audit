import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

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

    const [items, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: [{ year: "desc" }, { month: "desc" }, { createdAt: "desc" }],
        include: {
          member: true,
          receipt: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),

      prisma.payment.count({ where }),
    ]);

    return jsonOk({
      items,
      total,
      page,
      pageSize,
    });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);

    const body = await req.json();

    const memberId = body.memberId;
    const month = Number(body.month);
    const year = Number(body.year);
    const baseAmount = Number(body.baseAmount);
    const penaltyAmount = Number(body.penaltyAmount ?? 0);

    if (!memberId || !month || !year || !baseAmount) {
      return jsonError("Missing required fields");
    }

    const payment = await prisma.payment.create({
      data: {
        month,
        year,
        baseAmountPaise: baseAmount * 100,
        penaltyAmountPaise: penaltyAmount * 100,
        totalAmountPaise: (baseAmount + penaltyAmount) * 100,

        status: "PENDING",

        member: {
          connect: { id: memberId },
        },

recordedBy: {
  connect: { id: admin.userId },
},
      },

      include: {
        member: true,
        receipt: true,
      },
    });

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
//       prisma.payment.findMany({
//         where,
//         orderBy: [{ year: "desc" }, { month: "desc" }, { createdAt: "desc" }],
//         include: { member: true, receipt: true },
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//       }),
//       prisma.payment.count({ where }),
//     ]);

//     return jsonOk({ items, total, page, pageSize });
//   } catch (e) {
//     return jsonError(e);
//   }
// }

