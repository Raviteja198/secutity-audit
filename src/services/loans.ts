import type { TenantPrismaClient } from "@/lib/tenantPrisma";
import { recordTransaction, getFundBalance } from "@/services/fund";

function addMonthsUtc(date: Date, months: number) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

function calcMonthlyInterestPaise(outstandingPaise: number, monthlyRateBps: number) {
  // bps = basis points, so divide by 10_000
  return Math.floor((outstandingPaise * monthlyRateBps) / 10_000);
}

export async function createLoan(db: TenantPrismaClient, tenantId: string, input: {
  memberId: string;
  principalPaise: number;
  monthlyRateBps: number;
  durationMonths: number;
  startDate: Date;
  createdById: string;
}) {
  return db.loan.create({
    data: {
      tenantId,
      memberId: input.memberId,
      principalPaise: input.principalPaise,
      monthlyRateBps: input.monthlyRateBps,
      durationMonths: input.durationMonths,
      startDate: input.startDate,
      status: "PENDING_APPROVAL",
      createdById: input.createdById,
    },
  });
}

export async function approveLoan(db: TenantPrismaClient, tenantId: string, input: { loanId: string; approvedById: string }) {
  const loan = await db.loan.findUnique({ where: { id: input.loanId } });
  if (!loan) throw Object.assign(new Error("Loan not found"), { status: 404 });
  if (loan.status !== "PENDING_APPROVAL") {
    throw Object.assign(new Error("Loan is not pending approval"), { status: 400 });
  }

  // Check fund balance
  const balance = await getFundBalance(db, tenantId);
  if (balance < loan.principalPaise) {
    throw Object.assign(new Error("Insufficient funds to disburse loan"), { status: 400 });
  }

  const months = loan.durationMonths;
  const principalInstallments = months - 1;
  const basePrincipalPerMonth = Math.floor(loan.principalPaise / principalInstallments);

  let outstanding = loan.principalPaise;
  const installments: {
    installmentNumber: number;
    dueDate: Date;
    interestDuePaise: number;
    principalDuePaise: number;
  }[] = [];

  for (let n = 1; n <= months; n++) {
    const interest = calcMonthlyInterestPaise(outstanding, loan.monthlyRateBps);
    let principalDue = 0;
    if (n > 1) {
      principalDue = n === months ? outstanding : basePrincipalPerMonth;
    }
    installments.push({
      installmentNumber: n,
      dueDate: addMonthsUtc(loan.startDate, n),
      interestDuePaise: interest,
      principalDuePaise: principalDue,
    });
    outstanding -= principalDue;
  }

  const updated = await db.$transaction(async (tx) => {
    const u = await tx.loan.update({
      where: { id: loan.id },
      data: {
        status: "ACTIVE",
        approvedById: input.approvedById,
        approvedAt: new Date(),
      },
    });
    await tx.loanInstallment.createMany({
      data: installments.map((i) => ({ ...i, tenantId, loanId: loan.id })),
    });

    // Record fund transaction for loan disbursement
    await recordTransaction(db, {
      type: "LOAN_DISBURSED",
      amount: -loan.principalPaise,
      description: `Loan disbursement for ${loan.principalPaise} paise`,
      loanId: loan.id,
      createdById: input.approvedById,
    }, tenantId, tx);

    return u;
  });

  return updated;
}

/**
 * Calculate overdue penalty for a loan installment.
 * Penalty = 10% of the installment amount per month overdue (configurable).
 */
export async function calculateInstallmentPenalty(
  installment: {
    dueDate: Date | string;
    interestDuePaise: number;
    principalDuePaise: number;
    amountPaidPaise: number;
  },
  asOfDate: Date = new Date()
): Promise<number> {
  const dueDate = new Date(installment.dueDate);
  if (dueDate >= asOfDate) return 0; // Not overdue yet

  const totalDue = installment.interestDuePaise + installment.principalDuePaise;
  const unpaid = totalDue - installment.amountPaidPaise;
  if (unpaid <= 0) return 0; // Already paid

  // Calculate months overdue (rounded up)
  const msOverdue = asOfDate.getTime() - dueDate.getTime();
  const daysOverdue = Math.floor(msOverdue / (1000 * 60 * 60 * 24));
  const monthsOverdue = Math.ceil(daysOverdue / 30);

  if (monthsOverdue <= 0) return 0;

  // Penalty: 10% of unpaid amount per month overdue
  const penaltyRate = 0.10;
  const penalty = Math.floor(unpaid * penaltyRate * monthsOverdue);

  return penalty;
}

/**
 * Update overdue penalties for all unpaid installments of a loan.
 */
export async function updateLoanPenalties(db: TenantPrismaClient, loanId: string) {
  const installments = await db.loanInstallment.findMany({
    where: { loanId },
    orderBy: { dueDate: "asc" },
  });

  const now = new Date();
  const updates: Promise<unknown>[] = [];

  for (const inst of installments) {
    const penalty = await calculateInstallmentPenalty(inst, now);
    if (penalty !== inst.overdueInterestPaise) {
      updates.push(
        db.loanInstallment.update({
          where: { id: inst.id },
          data: { overdueInterestPaise: penalty },
        })
      );
    }
  }

  if (updates.length > 0) {
    await Promise.all(updates);
  }
}
