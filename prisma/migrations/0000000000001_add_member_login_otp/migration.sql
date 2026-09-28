-- Add member login link and OTP tracking to User table

ALTER TABLE "public"."User" ADD COLUMN "memberId" TEXT,
ADD COLUMN "otpGeneratedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX "User_memberId_key" ON "public"."User"("memberId");

CREATE INDEX "User_memberId_idx" ON "public"."User"("memberId");

ALTER TABLE "public"."User" ADD CONSTRAINT "User_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
