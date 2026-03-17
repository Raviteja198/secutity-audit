import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

function isMissingFundTableError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError
    && error.code === "P2021"
    && String(error.meta?.table ?? "").includes("Fund")
  );
}

export async function getFundBalance() {
  try {
    const fund = await prisma.fund.findFirst();
    return fund?.balance ?? 0;
  } catch (error) {
    if (isMissingFundTableError(error)) {
      return 0;
    }

    throw error;
  }
}

export async function updateFundBalance(amount: number, tx?: Prisma.TransactionClient) {
  const prismaClient = tx || prisma;
  try {
    const fund = await prismaClient.fund.findFirst();
    if (!fund) {
      // Create initial fund
      await prismaClient.fund.create({
        data: { balance: amount },
      });
    } else {
      await prismaClient.fund.update({
        where: { id: fund.id },
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

export async function createTransaction(input: {
  type: "PAYMENT_RECEIVED" | "LOAN_DISBURSED" | "CHARITY_DISBURSED" | "LOAN_REPAYMENT";
  amount: number;
  description?: string;
  paymentId?: string;
  loanId?: string;
  charityId?: string;
  repaymentId?: string;
  createdById: string;
}) {
  return prisma.transaction.create({
    data: input,
  });
}

export async function recordTransaction(input: {
  type: "PAYMENT_RECEIVED" | "LOAN_DISBURSED" | "CHARITY_DISBURSED" | "LOAN_REPAYMENT";
  amount: number;
  description?: string;
  paymentId?: string;
  loanId?: string;
  charityId?: string;
  repaymentId?: string;
  createdById: string;
}, tx?: Prisma.TransactionClient) {
  const prismaClient = tx || prisma;
  await updateFundBalance(input.amount, tx);
  await prismaClient.transaction.create({
    data: input,
  });
}
