-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "resetOtpAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resetOtpExpiresAt" TIMESTAMP(3),
ADD COLUMN     "resetOtpHash" TEXT;

-- CreateTable
CREATE TABLE "public"."TermsAndConditions" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TermsAndConditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TermsAndConditionsAcceptance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "acceptedVersion" INTEGER NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TermsAndConditionsAcceptance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TermsAndConditions_version_idx" ON "public"."TermsAndConditions"("version");

-- CreateIndex
CREATE INDEX "TermsAndConditions_updatedById_idx" ON "public"."TermsAndConditions"("updatedById");

-- CreateIndex
CREATE INDEX "TermsAndConditionsAcceptance_userId_idx" ON "public"."TermsAndConditionsAcceptance"("userId");

-- CreateIndex
CREATE INDEX "TermsAndConditionsAcceptance_acceptedAt_idx" ON "public"."TermsAndConditionsAcceptance"("acceptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TermsAndConditionsAcceptance_userId_acceptedVersion_key" ON "public"."TermsAndConditionsAcceptance"("userId", "acceptedVersion");

-- AddForeignKey
ALTER TABLE "public"."TermsAndConditions" ADD CONSTRAINT "TermsAndConditions_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TermsAndConditionsAcceptance" ADD CONSTRAINT "TermsAndConditionsAcceptance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
