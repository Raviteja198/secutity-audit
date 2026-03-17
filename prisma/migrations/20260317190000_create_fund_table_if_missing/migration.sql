-- Ensure Fund table exists in environments where earlier migrations were skipped.
CREATE TABLE IF NOT EXISTS "public"."Fund" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);
