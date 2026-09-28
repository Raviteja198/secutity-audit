import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/SolutionPage";

const path = "/member-contribution-tracking";

export const metadata: Metadata = {
  title: {
    absolute: "Member Contribution Tracking Software — Dues, Receipts & Penalties",
  },
  description:
    "Track monthly member contributions for an association or welfare group: who paid, who is pending, automatic receipts, late-payment penalties and WhatsApp reminders.",
  alternates: { canonical: path },
  openGraph: {
    title: "Member Contribution Tracking Software",
    description:
      "Track who paid and who is pending, issue receipts, apply penalties and send reminders automatically.",
    url: path,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Member Contribution Tracking Software",
    description:
      "Track who paid and who is pending, issue receipts, apply penalties and send reminders automatically.",
  },
};

export default function Page() {
  return (
    <SolutionPage
      path={path}
      eyebrow="For associations & welfare groups"
      h1="Member contribution tracking software"
      intro="Stop reconstructing who paid from WhatsApp messages and a notebook. Record every monthly contribution once, issue a receipt automatically, and let the system chase the pending members for you."
      appName="Youth Management — Contribution Tracking"
      appDescription="Web software to track monthly member contributions, issue receipts, apply late-payment penalties and send automated payment reminders."
      sections={[
        {
          heading: "The monthly collection problem",
          body: [
            "Every association that collects a monthly contribution runs into the same three questions at the end of the month: who has paid, how much is pending, and does the total match what is actually in hand.",
            "On paper, answering those takes an hour of adding up columns, and the answer is only as reliable as the handwriting. In a spreadsheet it is faster but no safer — one person holds the file, formulas break silently, and there is no record of who changed what.",
            "Recording each contribution as a proper transaction removes the guesswork. The paid list, the pending list and the fund balance are all derived from the same records, so they cannot disagree with each other.",
          ],
          bullets: [
            "A single fixed contribution amount for the group, set per month and year",
            "Payments recorded against a member, a month and a method — cash, transfer or otherwise",
            "Paid and pending views derived from the same records, never maintained separately",
            "A running fund balance that updates with every payment received",
          ],
        },
        {
          heading: "Receipts and penalties, handled consistently",
          body: [
            "A receipt is what turns a payment from something a member remembers into something they can prove. Every contribution recorded here generates one, tied to the member, the period and the amount.",
            "Penalties are where most groups quietly lose consistency. The rule says fifty rupees after the tenth, but in practice it gets waived for some and enforced for others, and by the third month nobody can say what the rule even is.",
            "Here, penalty rules are versioned and applied by due date, and the penalty that applied is stored permanently on the payment itself. Changing the rule next year does not silently rewrite what someone owed last year. The rule is applied the same way for everyone, which is usually the point of having one.",
          ],
          bullets: [
            "Automatic receipts for every recorded contribution",
            "Versioned penalty rules applied by due date",
            "The applied penalty stored permanently on each payment record",
            "A full audit log of who recorded, edited or waived what",
          ],
        },
        {
          heading: "Let the reminders do the chasing",
          body: [
            "Most unpaid contributions are not refusals. They are things a member meant to do and forgot, and the cost of chasing them falls entirely on whoever volunteered to be treasurer.",
            "Scheduled reminders go out by WhatsApp and email before the due date and again once a payment is overdue. Because they arrive where members already read messages, they get acted on rather than ignored.",
            "Groups that send reminders before the due date collect more and penalise less. That is a better outcome for the fund and a considerably better one for the treasurer's evenings.",
          ],
          bullets: [
            "WhatsApp and email reminders, scheduled before and after the due date",
            "Reminder templates you can edit to sound like your association",
            "A record of every reminder sent and to whom",
          ],
        },
        {
          heading: "Transparency members can check themselves",
          body: [
            "The fastest way to end an argument about money is to let people look it up. Members sign in and see their own contribution history, receipts and outstanding amounts without going through the treasurer.",
            "Admins see the full picture: the paid and pending lists, the fund balance, loans outstanding and every transaction behind them. Reports export whenever the group, an auditor or a bank asks.",
            "Every action is written to an audit log. Not because anyone is assumed dishonest, but because a group that can show its working has far fewer arguments.",
          ],
          bullets: [
            "Members see their own history and receipts on sign-in",
            "Admin dashboards for paid, pending, fund balance and transactions",
            "Exportable reports for audits and bank linkage",
            "A permanent audit trail of every change",
          ],
        },
      ]}
      faqs={[
        {
          question: "Can different members pay different amounts?",
          answer:
            "The contribution rule sets one amount for the group per period, which is how most associations and welfare groups operate. If your group needs per-member amounts, tell us through the onboarding form — we are collecting exactly this kind of requirement to decide what to build next.",
        },
        {
          question: "Can we record cash payments?",
          answer:
            "Yes. Payments record the method used, so cash collected at a meeting is captured the same way as a bank transfer, and both flow into the same fund balance.",
        },
        {
          question: "What happens if we record a payment by mistake?",
          answer:
            "Admins can correct records, and every change is written to the audit log with the user and timestamp. Corrections are visible rather than silent, which is what an auditor will want to see.",
        },
        {
          question: "Do members need to install an app?",
          answer:
            "No. It runs in any browser on a phone or laptop. Members sign in with Google or email.",
        },
        {
          question: "Can we change the contribution amount mid-year?",
          answer:
            "Yes. Set a new rule effective from the month it takes effect. Earlier months keep the amount that actually applied, so your history stays accurate.",
        },
      ]}
    />
  );
}
