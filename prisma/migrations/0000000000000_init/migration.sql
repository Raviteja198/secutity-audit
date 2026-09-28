-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."MemberStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CASH', 'UPI', 'BANK');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PAID', 'PENDING', 'LATE');

-- CreateEnum
CREATE TYPE "public"."LoanStatus" AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'CLOSED', 'DEFAULTED');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('PAYMENT_RECEIVED', 'LOAN_DISBURSED', 'CHARITY_DISBURSED', 'LOAN_REPAYMENT');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" TEXT NOT NULL,
    "memberUid" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "joinDate" TIMESTAMP(3) NOT NULL,
    "exitDate" TIMESTAMP(3),
    "status" "public"."MemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContributionRule" (
    "id" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "effectiveFromMonth" INTEGER NOT NULL,
    "effectiveFromYear" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContributionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PenaltyRule" (
    "id" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PenaltyRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "baseAmountPaise" INTEGER NOT NULL,
    "penaltyAmountPaise" INTEGER NOT NULL DEFAULT 0,
    "totalAmountPaise" INTEGER NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "public"."PaymentMethod",
    "paidAt" TIMESTAMP(3),
    "recordedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Receipt" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Charity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "beneficiary" TEXT NOT NULL,
    "purpose" TEXT,
    "amountPaise" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "imageUrl" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Charity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Loan" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "principalPaise" INTEGER NOT NULL,
    "remainingPaise" INTEGER NOT NULL DEFAULT 0,
    "monthlyRateBps" INTEGER NOT NULL,
    "durationMonths" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."LoanStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "termsJson" JSONB,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoanInstallment" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "installmentNumber" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "interestDuePaise" INTEGER NOT NULL,
    "principalDuePaise" INTEGER NOT NULL,
    "amountPaidPaise" INTEGER NOT NULL DEFAULT 0,
    "paidAt" TIMESTAMP(3),
    "overdueInterestPaise" INTEGER NOT NULL DEFAULT 0,
    "recordedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanInstallment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "oldValue" JSONB,
    "newValue" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Setting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "public"."Fund" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "type" "public"."TransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "paymentId" TEXT,
    "loanId" TEXT,
    "charityId" TEXT,
    "repaymentId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LoanRepayment" (
    "id" TEXT NOT NULL,
    "loanId" TEXT NOT NULL,
    "amountPaise" INTEGER NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanRepayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "public"."User"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberUid_key" ON "public"."Member"("memberUid");

-- CreateIndex
CREATE INDEX "Member_status_idx" ON "public"."Member"("status");

-- CreateIndex
CREATE INDEX "Member_joinDate_idx" ON "public"."Member"("joinDate");

-- CreateIndex
CREATE INDEX "ContributionRule_effectiveFromYear_effectiveFromMonth_idx" ON "public"."ContributionRule"("effectiveFromYear", "effectiveFromMonth");

-- CreateIndex
CREATE INDEX "ContributionRule_createdById_idx" ON "public"."ContributionRule"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "ContributionRule_effectiveFromMonth_effectiveFromYear_key" ON "public"."ContributionRule"("effectiveFromMonth", "effectiveFromYear");

-- CreateIndex
CREATE INDEX "PenaltyRule_effectiveFrom_idx" ON "public"."PenaltyRule"("effectiveFrom");

-- CreateIndex
CREATE INDEX "PenaltyRule_createdById_idx" ON "public"."PenaltyRule"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "PenaltyRule_effectiveFrom_key" ON "public"."PenaltyRule"("effectiveFrom");

-- CreateIndex
CREATE INDEX "Payment_year_month_idx" ON "public"."Payment"("year", "month");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "public"."Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_memberId_idx" ON "public"."Payment"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_memberId_month_year_key" ON "public"."Payment"("memberId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_paymentId_key" ON "public"."Receipt"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_receiptNumber_key" ON "public"."Receipt"("receiptNumber");

-- CreateIndex
CREATE INDEX "Receipt_createdAt_idx" ON "public"."Receipt"("createdAt");

-- CreateIndex
CREATE INDEX "Charity_date_idx" ON "public"."Charity"("date");

-- CreateIndex
CREATE INDEX "Charity_createdById_idx" ON "public"."Charity"("createdById");

-- CreateIndex
CREATE INDEX "Loan_memberId_idx" ON "public"."Loan"("memberId");

-- CreateIndex
CREATE INDEX "Loan_status_idx" ON "public"."Loan"("status");

-- CreateIndex
CREATE INDEX "Loan_startDate_idx" ON "public"."Loan"("startDate");

-- CreateIndex
CREATE INDEX "LoanInstallment_dueDate_idx" ON "public"."LoanInstallment"("dueDate");

-- CreateIndex
CREATE INDEX "LoanInstallment_loanId_idx" ON "public"."LoanInstallment"("loanId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanInstallment_loanId_installmentNumber_key" ON "public"."LoanInstallment"("loanId", "installmentNumber");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "public"."AuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_adminId_timestamp_idx" ON "public"."AuditLog"("adminId", "timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "public"."AuditLog"("entity", "entityId");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "public"."Transaction"("type");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "public"."Transaction"("createdAt");

-- CreateIndex
CREATE INDEX "Transaction_createdById_idx" ON "public"."Transaction"("createdById");

-- CreateIndex
CREATE INDEX "LoanRepayment_loanId_idx" ON "public"."LoanRepayment"("loanId");

-- CreateIndex
CREATE INDEX "LoanRepayment_paidAt_idx" ON "public"."LoanRepayment"("paidAt");

-- AddForeignKey
ALTER TABLE "public"."ContributionRule" ADD CONSTRAINT "ContributionRule_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PenaltyRule" ADD CONSTRAINT "PenaltyRule_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Charity" ADD CONSTRAINT "Charity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanInstallment" ADD CONSTRAINT "LoanInstallment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "public"."Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanInstallment" ADD CONSTRAINT "LoanInstallment_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanRepayment" ADD CONSTRAINT "LoanRepayment_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "public"."Loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LoanRepayment" ADD CONSTRAINT "LoanRepayment_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

