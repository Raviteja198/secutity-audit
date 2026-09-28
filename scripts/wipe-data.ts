/**
 * wipe-data.ts
 * Deletes all transactional data from the database, keeping Members and Users intact.
 * Run: npx tsx scripts/wipe-data.ts
 *
 * Safe to run against dev DB when you want a clean slate without re-entering members.
 */
import "dotenv/config";
import readline from "node:readline";
// Deliberately uses the raw, unscoped client — this script wipes ALL
// tenants' data, not just one (see the warning prompt below).
import { rawPrisma as prisma } from "../src/lib/prisma";

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  await new Promise<void>((resolve) => {
    rl.question(
      "⚠️  This will DELETE all payments, loans, charity, rules, audit logs, and fund data\n" +
        "   ACROSS EVERY TENANT (this deployment may serve more than one organization).\n" +
        "   Members and Users will NOT be touched.\n" +
        "   Type YES to continue: ",
      (answer: string) => {
        rl.close();
        if (answer.trim() !== "YES") {
          console.log("Aborted.");
          process.exit(0);
        }
        resolve();
      }
    );
  });

  console.log("\nWiping transactional data...");

  // Delete in FK-safe order (children first)
  const [loanRepayments] = await Promise.all([
    prisma.loanRepayment.deleteMany(),
  ]);
  console.log(`  ✓ LoanRepayments deleted: ${loanRepayments.count}`);

  const loanInstallments = await prisma.loanInstallment.deleteMany();
  console.log(`  ✓ LoanInstallments deleted: ${loanInstallments.count}`);

  const loans = await prisma.loan.deleteMany();
  console.log(`  ✓ Loans deleted: ${loans.count}`);

  const receipts = await prisma.receipt.deleteMany();
  console.log(`  ✓ Receipts deleted: ${receipts.count}`);

  const payments = await prisma.payment.deleteMany();
  console.log(`  ✓ Payments deleted: ${payments.count}`);

  const charities = await prisma.charity.deleteMany();
  console.log(`  ✓ Charities deleted: ${charities.count}`);

  const contributionRules = await prisma.contributionRule.deleteMany();
  console.log(`  ✓ ContributionRules deleted: ${contributionRules.count}`);

  const penaltyRules = await prisma.penaltyRule.deleteMany();
  console.log(`  ✓ PenaltyRules deleted: ${penaltyRules.count}`);

  const auditLogs = await prisma.auditLog.deleteMany();
  console.log(`  ✓ AuditLogs deleted: ${auditLogs.count}`);

  const transactions = await prisma.transaction.deleteMany();
  console.log(`  ✓ Transactions deleted: ${transactions.count}`);

  const funds = await prisma.fund.deleteMany();
  console.log(`  ✓ Fund records deleted: ${funds.count}`);

  const settings = await prisma.setting.deleteMany();
  console.log(`  ✓ Settings deleted: ${settings.count}`);

  // Summary of what was kept
  const memberCount = await prisma.member.count();
  const userCount = await prisma.user.count();

  console.log(`\n✅ Wipe complete.`);
  console.log(`   Kept: ${memberCount} members, ${userCount} users.`);
  console.log(`\n   Run 'npm run seed' to re-create settings and admin user.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
