import { prisma } from "@/lib/prisma";

function addMonthsUtc(date: Date, months: number) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

function calcMonthlyInterestPaise(outstandingPaise: number, monthlyRateBps: number) {
  // bps = basis points, so divide by 10_000
  return Math.floor((outstandingPaise * monthlyRateBps) / 10_000);
}

export async function createLoan(input: {
  memberId: string;
  principalPaise: number;
  monthlyRateBps: number;
  durationMonths: number;
  startDate: Date;
  createdById: string;
}) {
  return prisma.loan.create({
    data: {
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

export async function approveLoan(input: { loanId: string; approvedById: string }) {
  const loan = await prisma.loan.findUnique({ where: { id: input.loanId } });
  if (!loan) throw Object.assign(new Error("Loan not found"), { status: 404 });
  if (loan.status !== "PENDING_APPROVAL") {
    throw Object.assign(new Error("Loan is not pending approval"), { status: 400 });
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

  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.loan.update({
      where: { id: loan.id },
      data: {
        status: "ACTIVE",
        approvedById: input.approvedById,
        approvedAt: new Date(),
      },
    });
    await tx.loanInstallment.createMany({
      data: installments.map((i) => ({ ...i, loanId: loan.id })),
    });
    return u;
  });

  return updated;
}

