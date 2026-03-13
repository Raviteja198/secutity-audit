import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "ravitejamusku198@gmail.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@1234";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "ADMIN",
      isActive: true,
      name: "Admin",
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      isActive: true,
      name: "Admin",
    },
  });

  const userEmail = process.env.SEED_USER_EMAIL ?? "peopleyouth@gmail.com";
  const userPassword = process.env.SEED_USER_PASSWORD ?? "User@1234";
  const userPasswordHash = await bcrypt.hash(userPassword, 12);

  await prisma.user.upsert({
    where: { email: userEmail },
    update: {
      passwordHash: userPasswordHash,
      role: "USER",
      isActive: true,
      name: "Read-only User",
    },
    create: {
      email: userEmail,
      passwordHash: userPasswordHash,
      role: "USER",
      isActive: true,
      name: "Read-only User",
    },
  });

  await prisma.setting.upsert({
    where: { key: "receiptPrefix" },
    update: {},
    create: { key: "receiptPrefix", value: { prefix: "RCP" } },
  });

  await prisma.setting.upsert({
    where: { key: "paymentDueDay" },
    update: {},
    create: { key: "paymentDueDay", value: { day: 10 } },
  });

  const now = new Date();
  const month = now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();

  await prisma.contributionRule.upsert({
    where: {
      effectiveFromMonth_effectiveFromYear: { effectiveFromMonth: month, effectiveFromYear: year },
    },
    update: { amountPaise: 100000 },
    create: {
      amountPaise: 100000,
      effectiveFromMonth: month,
      effectiveFromYear: year,
      createdById: admin.id,
    },
  });

  await prisma.penaltyRule.upsert({
    where: { effectiveFrom: new Date(Date.UTC(year, month - 1, 1)) },
    update: { amountPaise: 5000 },
    create: {
      amountPaise: 5000,
      effectiveFrom: new Date(Date.UTC(year, month - 1, 1)),
      createdById: admin.id,
    },
  });

  const member = await prisma.member.upsert({
    where: { memberUid: "M-0001" },
    update: { status: "ACTIVE" },
    create: {
      memberUid: "M-0001",
      fullName: "Sample Member",
      joinDate: new Date(),
      status: "ACTIVE",
      phone: "9999999999",
    },
  });

  await prisma.payment.upsert({
    where: { memberId_month_year: { memberId: member.id, month, year } },
    update: {},
    create: {
      memberId: member.id,
      month,
      year,
      baseAmountPaise: 100000,
      penaltyAmountPaise: 0,
      totalAmountPaise: 100000,
      status: "PENDING",
      recordedById: admin.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

