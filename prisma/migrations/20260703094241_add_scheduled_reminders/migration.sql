-- CreateEnum
CREATE TYPE "public"."ScheduledReminderType" AS ENUM ('PENDING_PAYMENT_REMINDER', 'PAYMENT_GENERATION');

-- CreateEnum
CREATE TYPE "public"."ReminderRunTrigger" AS ENUM ('MANUAL', 'SCHEDULED');

-- CreateTable
CREATE TABLE "public"."ScheduledReminder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ScheduledReminderType" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "dayOfMonth" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL DEFAULT 0,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "templateId" TEXT,
    "lastRunPeriod" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduledReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReminderRun" (
    "id" TEXT NOT NULL,
    "type" "public"."ScheduledReminderType" NOT NULL,
    "trigger" "public"."ReminderRunTrigger" NOT NULL,
    "scheduledReminderId" TEXT,
    "templateId" TEXT,
    "triggeredById" TEXT,
    "sentCount" INTEGER NOT NULL,
    "skippedCount" INTEGER NOT NULL,
    "period" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReminderRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReminderRunRecipient" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL,
    "error" TEXT,

    CONSTRAINT "ReminderRunRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScheduledReminder_enabled_idx" ON "public"."ScheduledReminder"("enabled");

-- CreateIndex
CREATE INDEX "ReminderRun_startedAt_idx" ON "public"."ReminderRun"("startedAt");

-- CreateIndex
CREATE INDEX "ReminderRun_type_idx" ON "public"."ReminderRun"("type");

-- CreateIndex
CREATE INDEX "ReminderRunRecipient_runId_idx" ON "public"."ReminderRunRecipient"("runId");

-- CreateIndex
CREATE INDEX "ReminderRunRecipient_memberId_idx" ON "public"."ReminderRunRecipient"("memberId");

-- AddForeignKey
ALTER TABLE "public"."ScheduledReminder" ADD CONSTRAINT "ScheduledReminder_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ReminderTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ScheduledReminder" ADD CONSTRAINT "ScheduledReminder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReminderRun" ADD CONSTRAINT "ReminderRun_scheduledReminderId_fkey" FOREIGN KEY ("scheduledReminderId") REFERENCES "public"."ScheduledReminder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReminderRun" ADD CONSTRAINT "ReminderRun_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ReminderTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReminderRun" ADD CONSTRAINT "ReminderRun_triggeredById_fkey" FOREIGN KEY ("triggeredById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReminderRunRecipient" ADD CONSTRAINT "ReminderRunRecipient_runId_fkey" FOREIGN KEY ("runId") REFERENCES "public"."ReminderRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReminderRunRecipient" ADD CONSTRAINT "ReminderRunRecipient_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
