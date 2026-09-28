import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/SolutionPage";

const path = "/self-help-group-management-software";

export const metadata: Metadata = {
  title: {
    absolute: "Self Help Group Management Software — SHG Savings, Loans & Records",
  },
  description:
    "Software for self help groups and youth associations to manage member contributions, a pooled fund, group loans and repayments — with receipts, penalties and a full audit trail.",
  alternates: { canonical: path },
  openGraph: {
    title: "Self Help Group Management Software",
    description:
      "Manage SHG member contributions, pooled savings, group loans and repayments in one place.",
    url: path,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Self Help Group Management Software",
    description:
      "Manage SHG member contributions, pooled savings, group loans and repayments in one place.",
  },
};

export default function Page() {
  return (
    <SolutionPage
      path={path}
      eyebrow="For self help groups"
      h1="Self help group management software"
      intro="Run your SHG's contributions, pooled fund and member loans without a register book or a spreadsheet nobody trusts. Every rupee in and out is recorded, receipted and traceable — so the monthly meeting is about decisions, not arithmetic."
      appName="Youth Management — SHG Software"
      appDescription="Web software for self help groups to manage member contributions, pooled savings, group loans, repayments, penalties and receipts."
      sections={[
        {
          heading: "Built for how an SHG actually works",
          body: [
            "A self help group runs on a simple loop: every member pays a fixed contribution each month, the money pools into a common fund, and the group lends from that fund to members who need it. The loan comes back with interest, the fund grows, and the cycle repeats.",
            "That loop is easy to describe and painfully hard to track on paper. Who has paid this month? What did we lend in March, and how much is still outstanding? Does the balance in the book match the balance in the bank? Most groups only discover the gap at audit time, when reconstructing it is hardest.",
            "This software models that loop directly. Contributions, the pooled fund, loans and repayments are separate records that always reconcile against each other.",
          ],
          bullets: [
            "A fixed monthly contribution amount for the whole group, versioned by month and year — change it from April and history stays intact",
            "One pooled fund balance per group, updated automatically by every payment, disbursement and repayment",
            "Group loans with scheduled instalments, tracked repayments and outstanding balances",
            "Late-payment penalty rules applied by due date, with each payment permanently storing the penalty that applied to it",
            "Charitable and welfare disbursements recorded as first-class transactions, not scribbled notes",
          ],
        },
        {
          heading: "Every member knows where they stand",
          body: [
            "Most disputes in a savings group are not about dishonesty. They are about memory. Someone is sure they paid in cash at the July meeting; the register says otherwise; nobody can prove either version.",
            "Receipts fix this. Every payment recorded in the system produces a receipt tied to that member, that month and that amount. Members sign in with their own account and see their own contribution history, their loan balance and what falls due next — without having to ask the treasurer.",
            "Role-based access keeps this safe. Admins manage members, contribution rules, loans and penalties. Members see only their own account. Nobody browses anybody else's finances.",
          ],
          bullets: [
            "Receipts generated for every recorded payment",
            "Members sign in with Google or email and see only their own record",
            "Admins get full control over members, rules, loans and disbursements",
            "An audit log records who did what and when — every action, permanently",
          ],
        },
        {
          heading: "Reminders that reach members where they already are",
          body: [
            "Collection is the hardest part of running a group, and it is almost never because members refuse to pay. They simply forget, and chasing them one by one costs the treasurer an evening every month.",
            "The system sends scheduled reminders by WhatsApp and email before contributions fall due, and again when a payment is overdue. Templates are yours to edit, so the message sounds like your association rather than a bank.",
            "The practical effect is that penalties become rare. A reminder three days before the due date collects far more money than a penalty rule applied three weeks after it.",
          ],
          bullets: [
            "Scheduled WhatsApp and email reminders before and after the due date",
            "Editable reminder templates per group",
            "A record of every reminder run and who received it",
          ],
        },
        {
          heading: "Your group's data stays your group's",
          body: [
            "Each association gets its own isolated workspace. Your members, funds, loans and documents are separated at the database level from every other group using the platform — not merely hidden by a filter in the interface.",
            "You can upload your own logo and set your group's name, so admins and members see your association rather than generic software. Terms and conditions can be published and formally accepted by members, with acceptances recorded.",
            "There is nothing to install. It runs in a browser on a phone or a laptop, which matters when your treasurer works from a phone at the monthly meeting.",
          ],
          bullets: [
            "Tenant-isolated data — one private workspace per association",
            "Your logo and group name across the admin and member views",
            "Publishable terms and conditions with recorded member acceptance",
            "Nothing to install — works in any browser, on phone or desktop",
          ],
        },
      ]}
      faqs={[
        {
          question: "Is this suitable for a registered SHG or a bank-linked group?",
          answer:
            "Yes. The contribution, pooled fund, loan and repayment records give you the transaction history and audit trail that bank linkage and periodic audits require. Reports can be exported whenever your group or your bank asks for the numbers.",
        },
        {
          question: "Can the monthly contribution amount change?",
          answer:
            "Yes. Contribution rules are versioned by month and year. If your group raises the monthly amount from April, you set a new rule effective from April — earlier months keep the amount that actually applied at the time, so historical records stay accurate.",
        },
        {
          question: "How are late payments handled?",
          answer:
            "You define penalty rules that apply from a given date. When a payment is late, the applicable penalty is calculated and stored permanently on that payment record — so changing your penalty rule later never rewrites what a member already owed or paid.",
        },
        {
          question: "Can members see each other's contributions or loans?",
          answer:
            "No. Access is role-based. Members see only their own contributions, receipts and loan balance. Only admins see the full group picture.",
        },
        {
          question: "Does it handle loans given to members from the group fund?",
          answer:
            "Yes. Loans are disbursed from the pooled fund, tracked with scheduled instalments, and reduced as repayments come in. The fund balance updates automatically with every disbursement and repayment, so the pool always reflects reality.",
        },
        {
          question: "What does it cost?",
          answer:
            "Send us your group's details through the onboarding form and we will set up your workspace and discuss pricing based on your group's size.",
        },
      ]}
    />
  );
}
