-- ============================================================================
-- Multi-tenancy: row-level isolation
--
-- Phase A: additive, nullable — create Tenant, add tenantId columns (no NOT
--          NULL yet, since existing tables have data).
-- Phase B: backfill — create one default Tenant for all pre-existing data,
--          then point every existing row at it.
-- Phase C: lock it down — NOT NULL, drop old global unique constraints/
--          indexes, add new tenant-composite ones, add FKs.
--
-- The default tenant id below is a fixed, readable string (not a random
-- cuid) so it's easy to recognize/reference later; it fits Prisma's
-- `String` id column (no format is enforced at the DB level).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Phase A — additive, nullable
-- ---------------------------------------------------------------------------

CREATE TABLE "public"."Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "public"."User" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Member" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."ContributionRule" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."PenaltyRule" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Payment" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Receipt" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Charity" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Loan" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."LoanInstallment" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."LoanRepayment" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."AuditLog" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."TermsAndConditions" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."TermsAndConditionsAcceptance" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Setting" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."ReminderTemplate" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."ScheduledReminder" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."ReminderRun" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."ReminderRunRecipient" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Fund" ADD COLUMN "tenantId" TEXT;
ALTER TABLE "public"."Transaction" ADD COLUMN "tenantId" TEXT;

-- ---------------------------------------------------------------------------
-- Phase B — backfill: one default tenant for all pre-existing data
-- ---------------------------------------------------------------------------

INSERT INTO "public"."Tenant" ("id", "name", "createdAt")
VALUES ('default-tenant-000001', 'Default Organization', CURRENT_TIMESTAMP);

UPDATE "public"."User" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Member" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."ContributionRule" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."PenaltyRule" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Payment" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Receipt" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Charity" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Loan" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."LoanInstallment" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."LoanRepayment" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."AuditLog" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."TermsAndConditions" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."TermsAndConditionsAcceptance" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Setting" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."ReminderTemplate" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."ScheduledReminder" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."ReminderRun" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."ReminderRunRecipient" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Fund" SET "tenantId" = 'default-tenant-000001';
UPDATE "public"."Transaction" SET "tenantId" = 'default-tenant-000001';

-- ---------------------------------------------------------------------------
-- Phase C — lock it down: NOT NULL, drop old global constraints/indexes,
-- add new tenant-composite ones, add FKs
-- ---------------------------------------------------------------------------

-- Drop old global unique constraints/indexes superseded by tenant-composite ones
DROP INDEX "public"."AuditLog_timestamp_idx";
DROP INDEX "public"."Charity_date_idx";
DROP INDEX "public"."ContributionRule_effectiveFromMonth_effectiveFromYear_key";
DROP INDEX "public"."ContributionRule_effectiveFromYear_effectiveFromMonth_idx";
DROP INDEX "public"."Loan_memberId_idx";
DROP INDEX "public"."Loan_memberId_status_idx";
DROP INDEX "public"."Loan_startDate_idx";
DROP INDEX "public"."Loan_status_idx";
DROP INDEX "public"."LoanRepayment_loanId_idx";
DROP INDEX "public"."Member_joinDate_idx";
DROP INDEX "public"."Member_memberUid_key";
DROP INDEX "public"."Member_status_idx";
DROP INDEX "public"."Payment_memberId_idx";
DROP INDEX "public"."Payment_memberId_month_year_key";
DROP INDEX "public"."Payment_memberId_status_year_month_idx";
DROP INDEX "public"."Payment_status_idx";
DROP INDEX "public"."Payment_status_year_month_idx";
DROP INDEX "public"."Payment_year_month_idx";
DROP INDEX "public"."PenaltyRule_effectiveFrom_idx";
DROP INDEX "public"."PenaltyRule_effectiveFrom_key";
DROP INDEX "public"."Receipt_createdAt_idx";
DROP INDEX "public"."Receipt_receiptNumber_key";
DROP INDEX "public"."ReminderRun_startedAt_idx";
DROP INDEX "public"."ReminderRun_type_idx";
DROP INDEX "public"."ReminderTemplate_isDefault_idx";
DROP INDEX "public"."ScheduledReminder_enabled_idx";
DROP INDEX "public"."TermsAndConditions_version_idx";
DROP INDEX "public"."Transaction_createdAt_idx";
DROP INDEX "public"."Transaction_type_idx";
DROP INDEX IF EXISTS "public"."User_email_key";

-- NOT NULL
ALTER TABLE "public"."User" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Member" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."ContributionRule" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."PenaltyRule" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Payment" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Receipt" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Charity" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Loan" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."LoanInstallment" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."LoanRepayment" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."AuditLog" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."TermsAndConditions" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."TermsAndConditionsAcceptance" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Setting" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."ReminderTemplate" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."ScheduledReminder" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."ReminderRun" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."ReminderRunRecipient" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Fund" ALTER COLUMN "tenantId" SET NOT NULL;
ALTER TABLE "public"."Transaction" ALTER COLUMN "tenantId" SET NOT NULL;

-- Setting's primary key changes shape from (key) to (tenantId, key)
ALTER TABLE "public"."Setting" DROP CONSTRAINT "Setting_pkey";
ALTER TABLE "public"."Setting" ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("tenantId", "key");

-- New tenant-composite indexes
CREATE INDEX "AuditLog_tenantId_timestamp_idx" ON "public"."AuditLog"("tenantId", "timestamp");
CREATE INDEX "Charity_tenantId_date_idx" ON "public"."Charity"("tenantId", "date");
CREATE INDEX "ContributionRule_tenantId_effectiveFromYear_effectiveFromMo_idx" ON "public"."ContributionRule"("tenantId", "effectiveFromYear", "effectiveFromMonth");
CREATE UNIQUE INDEX "ContributionRule_tenantId_effectiveFromMonth_effectiveFromY_key" ON "public"."ContributionRule"("tenantId", "effectiveFromMonth", "effectiveFromYear");
CREATE UNIQUE INDEX "Fund_tenantId_key" ON "public"."Fund"("tenantId");
CREATE INDEX "Loan_tenantId_memberId_idx" ON "public"."Loan"("tenantId", "memberId");
CREATE INDEX "Loan_tenantId_status_idx" ON "public"."Loan"("tenantId", "status");
CREATE INDEX "Loan_tenantId_startDate_idx" ON "public"."Loan"("tenantId", "startDate");
CREATE INDEX "Loan_tenantId_memberId_status_idx" ON "public"."Loan"("tenantId", "memberId", "status");
CREATE INDEX "LoanInstallment_tenantId_idx" ON "public"."LoanInstallment"("tenantId");
CREATE INDEX "LoanRepayment_tenantId_loanId_idx" ON "public"."LoanRepayment"("tenantId", "loanId");
CREATE INDEX "Member_tenantId_status_idx" ON "public"."Member"("tenantId", "status");
CREATE INDEX "Member_tenantId_joinDate_idx" ON "public"."Member"("tenantId", "joinDate");
CREATE UNIQUE INDEX "Member_tenantId_memberUid_key" ON "public"."Member"("tenantId", "memberUid");
CREATE INDEX "Payment_tenantId_year_month_idx" ON "public"."Payment"("tenantId", "year", "month");
CREATE INDEX "Payment_tenantId_status_idx" ON "public"."Payment"("tenantId", "status");
CREATE INDEX "Payment_tenantId_memberId_idx" ON "public"."Payment"("tenantId", "memberId");
CREATE INDEX "Payment_tenantId_status_year_month_idx" ON "public"."Payment"("tenantId", "status", "year", "month");
CREATE INDEX "Payment_tenantId_memberId_status_year_month_idx" ON "public"."Payment"("tenantId", "memberId", "status", "year", "month");
CREATE UNIQUE INDEX "Payment_tenantId_memberId_month_year_key" ON "public"."Payment"("tenantId", "memberId", "month", "year");
CREATE INDEX "PenaltyRule_tenantId_effectiveFrom_idx" ON "public"."PenaltyRule"("tenantId", "effectiveFrom");
CREATE UNIQUE INDEX "PenaltyRule_tenantId_effectiveFrom_key" ON "public"."PenaltyRule"("tenantId", "effectiveFrom");
CREATE INDEX "Receipt_tenantId_createdAt_idx" ON "public"."Receipt"("tenantId", "createdAt");
CREATE UNIQUE INDEX "Receipt_tenantId_receiptNumber_key" ON "public"."Receipt"("tenantId", "receiptNumber");
CREATE INDEX "ReminderRun_tenantId_startedAt_idx" ON "public"."ReminderRun"("tenantId", "startedAt");
CREATE INDEX "ReminderRun_tenantId_type_idx" ON "public"."ReminderRun"("tenantId", "type");
CREATE INDEX "ReminderRunRecipient_tenantId_idx" ON "public"."ReminderRunRecipient"("tenantId");
CREATE INDEX "ReminderTemplate_tenantId_isDefault_idx" ON "public"."ReminderTemplate"("tenantId", "isDefault");
CREATE INDEX "ScheduledReminder_tenantId_enabled_idx" ON "public"."ScheduledReminder"("tenantId", "enabled");
CREATE INDEX "TermsAndConditions_tenantId_version_idx" ON "public"."TermsAndConditions"("tenantId", "version");
CREATE INDEX "TermsAndConditionsAcceptance_tenantId_idx" ON "public"."TermsAndConditionsAcceptance"("tenantId");
CREATE INDEX "Transaction_tenantId_type_idx" ON "public"."Transaction"("tenantId", "type");
CREATE INDEX "Transaction_tenantId_createdAt_idx" ON "public"."Transaction"("tenantId", "createdAt");
CREATE INDEX "User_tenantId_idx" ON "public"."User"("tenantId");
CREATE UNIQUE INDEX "User_tenantId_email_key" ON "public"."User"("tenantId", "email");
CREATE UNIQUE INDEX "User_tenantId_memberId_key" ON "public"."User"("tenantId", "memberId");

-- Foreign keys
ALTER TABLE "public"."User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Member" ADD CONSTRAINT "Member_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."ContributionRule" ADD CONSTRAINT "ContributionRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."PenaltyRule" ADD CONSTRAINT "PenaltyRule_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Charity" ADD CONSTRAINT "Charity_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Loan" ADD CONSTRAINT "Loan_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."LoanInstallment" ADD CONSTRAINT "LoanInstallment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."TermsAndConditions" ADD CONSTRAINT "TermsAndConditions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."TermsAndConditionsAcceptance" ADD CONSTRAINT "TermsAndConditionsAcceptance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Setting" ADD CONSTRAINT "Setting_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."ReminderTemplate" ADD CONSTRAINT "ReminderTemplate_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."ScheduledReminder" ADD CONSTRAINT "ScheduledReminder_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."ReminderRun" ADD CONSTRAINT "ReminderRun_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."ReminderRunRecipient" ADD CONSTRAINT "ReminderRunRecipient_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Fund" ADD CONSTRAINT "Fund_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."LoanRepayment" ADD CONSTRAINT "LoanRepayment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
