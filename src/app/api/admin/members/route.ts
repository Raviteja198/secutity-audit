import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { memberCreateSchema } from "@/lib/validators/members";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
    const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") ?? "20") || 20));
    const q = (searchParams.get("q") ?? "").trim();
    const status = searchParams.get("status")?.toUpperCase();

    const where: any = {};
    if (q) {
      where.OR = [
        { fullName: { contains: q, mode: "insensitive" } },
        { memberUid: { contains: q, mode: "insensitive" } },
        { phone: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }
    if (status === "ACTIVE" || status === "INACTIVE") where.status = status;

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

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const body = await req.json();
    const parsed = memberCreateSchema.parse(body);

    const created = await prisma.member.create({
      data: {
        memberUid: parsed.memberUid,
        fullName: parsed.fullName,
        phone: parsed.phone,
        email: parsed.email,
        address: parsed.address,
        joinDate: parsed.joinDate,
        status: "ACTIVE",
      },
    });

    await writeAuditLog(req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "Member",
      entityId: created.id,
      oldValue: null,
      newValue: created,
    });

    return jsonCreated(created);
  } catch (e) {
    return jsonError(e);
  }
}

