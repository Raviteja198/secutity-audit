import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Renamed from `prisma` to make it obvious this is the *unscoped* client —
// it has no tenant filtering at all. Route handlers and services should use
// `forTenant(tenantId)` from `@/lib/tenantPrisma` instead. The only
// legitimate direct users of this export are: this file, tenantPrisma.ts
// itself, src/lib/auth.ts (runs before a tenant is known), and
// src/lib/scheduledReminders.ts (enumerates all tenants for the cron loop).
export const rawPrisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = rawPrisma;

export default rawPrisma;