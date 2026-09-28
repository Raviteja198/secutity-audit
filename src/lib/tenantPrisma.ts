import { Prisma, PrismaClient } from "@prisma/client";
import { rawPrisma } from "@/lib/prisma";

/**
 * Every model that carries a tenantId column. Kept as a literal list (not
 * derived from Prisma's DMMF at runtime) so adding a new tenant-scoped model
 * to schema.prisma without adding it here is a visible, deliberate diff.
 */
const TENANT_SCOPED_MODELS = new Set([
  "User",
  "Member",
  "ContributionRule",
  "PenaltyRule",
  "Payment",
  "Receipt",
  "Charity",
  "Loan",
  "LoanInstallment",
  "LoanRepayment",
  "AuditLog",
  "TermsAndConditions",
  "TermsAndConditionsAcceptance",
  "Setting",
  "ReminderTemplate",
  "ScheduledReminder",
  "ReminderRun",
  "ReminderRunRecipient",
  "Fund",
  "Transaction",
]);

// Prisma allows extra non-unique filter fields alongside a unique selector
// (e.g. `findUnique({ where: { id, tenantId } })` is valid and correctly
// excludes rows belonging to another tenant) — so findUnique/update/delete
// are included here too, not just the list/aggregate operations. This is
// what makes a by-id lookup for a guessed/enumerated id from another tenant
// return null/404 instead of leaking data.
const WHERE_SCOPED_OPERATIONS = new Set([
  "findMany",
  "findFirst",
  "findFirstOrThrow",
  "findUnique",
  "findUniqueOrThrow",
  "count",
  "aggregate",
  "groupBy",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
]);

function injectTenant(client: PrismaClient, tenantId: string) {
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!model || !TENANT_SCOPED_MODELS.has(model)) {
            return query(args);
          }

          const a = args as Record<string, unknown>;

          if (WHERE_SCOPED_OPERATIONS.has(operation)) {
            a.where = { ...(a.where as object | undefined), tenantId };
          }

          if (operation === "create") {
            a.data = { ...(a.data as object), tenantId };
          }

          if (operation === "createMany" || operation === "createManyAndReturn") {
            const data = a.data as Record<string, unknown>[] | Record<string, unknown>;
            a.data = Array.isArray(data)
              ? data.map((d) => ({ ...d, tenantId }))
              : { ...data, tenantId };
          }

          if (operation === "upsert") {
            a.where = { ...(a.where as object), tenantId };
            a.create = { ...(a.create as object), tenantId };
          }

          return query(a);
        },
      },
    },
  });
}

export type TenantPrismaClient = ReturnType<typeof injectTenant>;

/** The one supported way to get a DB client in route handlers/services. */
export function forTenant(tenantId: string): TenantPrismaClient {
  if (!tenantId) throw new Error("forTenant() called without a tenantId");
  return injectTenant(rawPrisma, tenantId);
}

export type { Prisma };
