import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type AuditInput = {
  adminId: string;
  action: string;
  entity: string;
  entityId?: string | null;
  oldValue?: Prisma.InputJsonValue;
  newValue?: Prisma.InputJsonValue;
};

export async function writeAuditLog(req: NextRequest, input: AuditInput) {
  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;
  const userAgent = req.headers.get("user-agent");

  await prisma.auditLog.create({
    data: {
      adminId: input.adminId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      oldValue: input.oldValue ?? Prisma.JsonNull,
      newValue: input.newValue ?? Prisma.JsonNull,
      ipAddress,
      userAgent,
    },
  });
}

