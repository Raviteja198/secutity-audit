import type { TenantPrismaClient } from "@/lib/tenantPrisma";

// The `tx` param inside db.$transaction(async (tx) => {...}) gets a distinct
// generated type per call site that doesn't structurally unify with
// Prisma.TransactionClient or with TenantPrismaClient itself — a known
// Prisma typing friction point with client extensions used inside
// interactive transactions. Typed loosely here rather than fighting it;
// runtime behavior is correct regardless (same underlying delegate calls).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTxClient = any;

function isMissingFundTableError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const prismaError = error as {
    code?: unknown;
    meta?: {
      table?: unknown;
    };
  };

  return (
    prismaError.code === "P2021"
    && String(prismaError.meta?.table ?? "").includes("Fund")
  );
}

// $queryRaw bypasses the tenant-scoping Prisma extension entirely, so every
// subquery here needs an explicit tenantId filter — one of the raw-SQL call
// sites flagged in the multi-tenancy plan as needing manual scoping.
export async function getFundBalance(db: TenantPrismaClient, tenantId: string) {
  try {
    const [result] = await db.$queryRaw<Array<{ balance: bigint }>>`
      SELECT
        COALESCE((
          SELECT SUM("totalAmountPaise")
          FROM "Payment"
          WHERE "status" IN ('PAID', 'LATE') AND "tenantId" = ${tenantId}
        ), 0) -
        COALESCE((
          SELECT SUM("principalPaise")
          FROM "Loan"
          WHERE "status" IN ('ACTIVE', 'CLOSED') AND "tenantId" = ${tenantId}
        ), 0) -
        COALESCE((
          SELECT SUM("amountPaise")
          FROM "Charity"
          WHERE "tenantId" = ${tenantId}
        ), 0) +
        COALESCE((
          SELECT SUM("amountPaise")
          FROM "LoanRepayment"
          WHERE "tenantId" = ${tenantId}
        ), 0) AS "balance"
    `;

    return Number(result?.balance ?? 0);
  } catch (error) {
    if (isMissingFundTableError(error)) {
      return 0;
    }
    throw error;
  }
}

export async function updateFundBalance(
  db: TenantPrismaClient,
  amount: number,
  tenantId: string,
  tx?: AnyTxClient
) {
  // tx (when provided) is itself already tenant-scoped — Prisma preserves
  // extensions through $transaction — so create/where calls below still get
  // tenantId auto-injected either way.
  const prismaClient = tx ?? db;
  try {
    const fund = await prismaClient.fund.findUnique({ where: { tenantId } });
    if (!fund) {
      await prismaClient.fund.create({
        data: { tenantId, balance: amount },
      });
    } else {
      await prismaClient.fund.update({
        where: { tenantId },
        data: { balance: { increment: amount } },
      });
    }
  } catch (error) {
    if (isMissingFundTableError(error)) {
      return;
    }

    throw error;
  }
}

export async function createTransaction(
  db: TenantPrismaClient,
  input: {
    type: "PAYMENT_RECEIVED" | "LOAN_DISBURSED" | "CHARITY_DISBURSED" | "LOAN_REPAYMENT";
    amount: number;
    description?: string;
    paymentId?: string;
    loanId?: string;
    charityId?: string;
    repaymentId?: string;
    createdById: string;
  },
  tenantId: string
) {
  return db.transaction.create({
    data: { ...input, tenantId },
  });
}

export async function recordTransaction(
  db: TenantPrismaClient,
  input: {
    type: "PAYMENT_RECEIVED" | "LOAN_DISBURSED" | "CHARITY_DISBURSED" | "LOAN_REPAYMENT";
    amount: number;
    description?: string;
    paymentId?: string;
    loanId?: string;
    charityId?: string;
    repaymentId?: string;
    createdById: string;
  },
  tenantId: string,
  tx?: AnyTxClient
) {
  const prismaClient = tx ?? db;
  await updateFundBalance(db, input.amount, tenantId, tx);
  await prismaClient.transaction.create({
    data: { ...input, tenantId },
  });
}
