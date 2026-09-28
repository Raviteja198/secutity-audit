import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { memberCreateSchema } from "@/lib/validators/members";
import { writeAuditLog } from "@/lib/audit";
import { Prisma } from "@prisma/client";



/*
GET MEMBERS
Used by the table to load members
*/
export async function GET(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const { searchParams } = new URL(req.url);

    const page =
      Math.max(1, Number(searchParams.get("page") ?? "1")) || 1;

    const pageSize =
      Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20"))) || 20;

    const q = (searchParams.get("q") ?? "").trim();

    const status = searchParams.get("status")?.toUpperCase();

    const where: Prisma.MemberWhereInput = {};

    if (q) {
      where.OR = [
        { fullName: { contains: q, mode: "insensitive" } },
        { memberUid: { contains: q, mode: "insensitive" } },
        { phone: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }

    if (status === "ACTIVE" || status === "INACTIVE") {
      where.status = status;
    }

    const [members, total] = await Promise.all([
      db.member.findMany({
        where,
        orderBy: { memberUid: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          loginUser: { select: { id: true, email: true, otpGeneratedAt: true } },
        },
      }),
      db.member.count({ where }),
    ]);

    const loginUserIds = [
      ...new Set(
        members.map((m) => m.loginUser?.id).filter((id): id is string => Boolean(id)),
      ),
    ];

    const lastLoginByUserId = new Map<string, Date | null>();
    if (loginUserIds.length > 0) {
      // $queryRaw bypasses the tenant-scoping extension — filtered explicitly.
      const rows = await db.$queryRaw<Array<{ id: string; lastLoginAt: Date | null }>>(
        Prisma.sql`SELECT id, "lastLoginAt" FROM "User" WHERE "tenantId" = ${ctx.tenantId} AND id IN (${Prisma.join(
          loginUserIds.map((id) => Prisma.sql`${id}`),
        )})`,
      );
      for (const row of rows) {
        lastLoginByUserId.set(row.id, row.lastLoginAt);
      }
    }

    const items = members.map((m) => ({
      ...m,
      hasLogin: !!m.loginUser,
      loginEmail: m.loginUser?.email ?? null,
      otpGeneratedAt: m.loginUser?.otpGeneratedAt ?? null,
      lastLoginAt: m.loginUser ? (lastLoginByUserId.get(m.loginUser.id) ?? null) : null,
    }));

    return jsonOk({ items, total, page, pageSize });

  } catch (e) {
    return jsonError(e);
  }
}



/*
CREATE MEMBER
Auto generates Member ID
*/
export async function POST(req: NextRequest) {
  try {

    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const body = await req.json();

    const parsed = memberCreateSchema.parse(body);



    // Find last member
    const lastMember = await db.member.findFirst({
      orderBy: { createdAt: "desc" },
    });



    let nextNumber = 1;

    if (lastMember?.memberUid) {
      const num = parseInt(lastMember.memberUid.split("-")[1] || "0");
      nextNumber = num + 1;
    }



    const memberUid = `M-${String(nextNumber).padStart(4, "0")}`;



    const created = await db.member.create({
      data: {
        tenantId: ctx.tenantId,
        memberUid,
        fullName: parsed.fullName,
        phone: parsed.phone,
        email: parsed.email,
        address: parsed.address,
        joinDate: parsed.joinDate,
        status: "ACTIVE",
      },
    });



    await writeAuditLog(db, ctx.tenantId, req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "Member",
      entityId: created.id,
      newValue: created,
    });



    return jsonCreated(created);

  } catch (e) {
    return jsonError(e);
  }
}


// export async function GET(req: NextRequest) {
//   try {
//     await requireAdmin(req);
//     const { searchParams } = new URL(req.url);
//     const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
//     const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));
//     const q = (searchParams.get("q") ?? "").trim();
//     const status = searchParams.get("status")?.toUpperCase();

//     const where: Record<string, unknown> = {};
//     if (q) {
//       where.OR = [
//         { fullName: { contains: q, mode: "insensitive" } },
//         { memberUid: { contains: q, mode: "insensitive" } },
//         { phone: { contains: q, mode: "insensitive" } },
//         { email: { contains: q, mode: "insensitive" } },
//       ];
//     }
//     if (status === "ACTIVE" || status === "INACTIVE") where.status = status;

//     const [items, total] = await Promise.all([
//       prisma.member.findMany({
//         where,
//         orderBy: [{ status: "asc" }, { joinDate: "desc" }],
//         skip: (page - 1) * pageSize,
//         take: pageSize,
//       }),
//       prisma.member.count({ where }),
//     ]);

//     return jsonOk({ items, total, page, pageSize });
//   } catch (e) {
//     return jsonError(e);
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const ctx = await requireAdmin(req);
//     const body = await req.json();
//     const parsed = memberCreateSchema.parse(body);

//     const created = await prisma.member.create({
//       data: {
//         memberUid: parsed.memberUid,
//         fullName: parsed.fullName,
//         phone: parsed.phone,
//         email: parsed.email,
//         address: parsed.address,
//         joinDate: parsed.joinDate,
//         status: "ACTIVE",
//       },
//     });

//     await writeAuditLog(req, {
//       adminId: ctx.userId,
//       action: "CREATE",
//       entity: "Member",
//       entityId: created.id,
//       newValue: created,
//     });

//     return jsonCreated(created);
//   } catch (e) {
//     return jsonError(e);
//   }
// }

