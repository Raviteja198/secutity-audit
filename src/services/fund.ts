import { prisma } from "@/lib/prisma";

export async function getFundBalance() {
  const fund = await prisma.fund.findFirst();
  return fund?.balance ?? 0;
}

export async function updateFundBalance(amount: number, tx?: any) {
  const prismaClient = tx || prisma;
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
}, tx?: any) {
  const prismaClient = tx || prisma;
  await updateFundBalance(input.amount, tx);
  await prismaClient.transaction.create({
    data: input,
  });
}