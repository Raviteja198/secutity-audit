/**
 * seed.ts — Idempotent seed for both local dev and Vercel/production.
 *
 * Creates:
 *   1. Admin user (from env SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)
 *   2. Default app settings (receipt prefix, payment due day)
 *
 * Does NOT create: viewer users, members, payments, loans, rules, or any business data.
 * All upserts are safe to run multiple times (idempotent).
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { rawPrisma as prisma } from "../src/lib/prisma";

// Matches the default tenant backfilled by the multi-tenant migration.
const DEFAULT_TENANT_ID = "default-tenant-000001";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in environment variables."
    );
  }

  const tenant = await prisma.tenant.upsert({
    where: { id: DEFAULT_TENANT_ID },
    update: {},
    create: { id: DEFAULT_TENANT_ID, name: "Default Organization" },
  });

  const adminHash = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: adminEmail.toLowerCase() } },
    update: { passwordHash: adminHash, role: "ADMIN", isActive: true, name: "Admin" },
    create: {
      tenantId: tenant.id,
      email: adminEmail.toLowerCase(),
      passwordHash: adminHash,
      role: "ADMIN",
      isActive: true,
      name: "Admin",
    },
  });
  console.log(`✓ Admin user: ${admin.email} (id: ${admin.id}, tenant: ${tenant.id})`);

  // Default settings (idempotent - only creates if missing)
  await prisma.setting.upsert({
    where: { tenantId_key: { tenantId: tenant.id, key: "receiptPrefix" } },
    update: {},
    create: { tenantId: tenant.id, key: "receiptPrefix", value: { prefix: "RCP" } },
  });

  await prisma.setting.upsert({
    where: { tenantId_key: { tenantId: tenant.id, key: "paymentDueDay" } },
    update: {},
    create: { tenantId: tenant.id, key: "paymentDueDay", value: { day: 10 } },
  });

  console.log("✓ Default settings: receiptPrefix=RCP, paymentDueDay=10");
  console.log("\n✅ Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
