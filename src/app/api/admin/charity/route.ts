import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError, jsonOk } from "@/lib/api/http";
import { charityCreateSchema } from "@/lib/validators/charity";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const items = await prisma.charity.findMany({ orderBy: [{ date: "desc" }, { createdAt: "desc" }] });
    return jsonOk({ items });
  } catch (e) {
    return jsonError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ctx = await requireAdmin(req);
    const body = await req.json();
    const parsed = charityCreateSchema.parse(body);

    const created = await prisma.charity.create({
      data: { ...parsed, createdById: ctx.userId },
    });

    await writeAuditLog(req, {
      adminId: ctx.userId,
      action: "CREATE",
      entity: "Charity",
      entityId: created.id,
      oldValue: null,
      newValue: created,
    });

    return jsonCreated(created);
  } catch (e) {
    return jsonError(e);
  }
}

