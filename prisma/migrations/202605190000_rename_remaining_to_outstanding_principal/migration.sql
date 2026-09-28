-- Rename remainingPaise to outstandingPrincipalPaise for better semantic clarity
ALTER TABLE "public"."Loan" RENAME COLUMN "remainingPaise" TO "outstandingPrincipalPaise";
