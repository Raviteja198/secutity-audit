-- AlterTable
ALTER TABLE "public"."ScheduledReminder" ADD COLUMN     "sendEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sendWhatsapp" BOOLEAN NOT NULL DEFAULT false;
