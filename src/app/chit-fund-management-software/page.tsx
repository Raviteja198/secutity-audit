import type { Metadata } from "next";
import { SolutionPage } from "@/components/marketing/SolutionPage";

const path = "/chit-fund-management-software";

export const metadata: Metadata = {
  title: {
    absolute: "Chit Fund vs Group Savings Software — Which One Does Your Group Need?",
  },
  description:
    "How auction-based chit funds differ from fixed-contribution savings groups, and which kind of software each needs. Built today for fixed-contribution groups — tell us if you run an auction chit.",
  alternates: { canonical: path },
  openGraph: {
    title: "Chit Fund vs Group Savings Software",
    description:
      "How auction-based chit funds differ from fixed-contribution savings groups — and which software each one needs.",
    url: path,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Chit Fund vs Group Savings Software",
    description:
      "How auction-based chit funds differ from fixed-contribution savings groups — and which software each one needs.",
  },
};

export default function Page() {
  return (
    <SolutionPage
      path={path}
      eyebrow="For chit & savings groups"
      h1="Chit fund or group savings? They need different software"
      intro="Both pool money from members every month, so they get lumped together — but they run on completely different mechanics, and software built for one handles the other badly. Here is the difference, stated plainly, so you can tell which one you are running before you pay for anything."
      appName="Youth Management"
      appDescription="Web software for fixed-contribution savings groups and associations to manage member contributions, pooled funds, group loans and repayments."
      sections={[
        {
          heading: "How an auction chit fund works",
          body: [
            "In a chit fund, a group of subscribers agrees on a total — the chit value — and a duration. Each month every subscriber pays an instalment, and the collected pot is auctioned among them.",
            "Subscribers bid by offering to take less than the full pot. Whoever accepts the largest reduction wins that month and becomes the prized subscriber, receiving the pot minus their discount and minus the foreman's commission. The foreman is the person or company organising the chit.",
            "The discount the winner gave up does not vanish. It is distributed among all subscribers as a dividend, which reduces what everyone pays the following month. A subscriber who has already won cannot bid again, but keeps paying instalments until the chit ends.",
            "In India this is a regulated business. The Chit Funds Act, 1982 governs registered chits — foreman commission is capped, chits must be registered with the state Registrar of Chits, and minute books and periodic filings are required.",
          ],
          bullets: [
            "A fixed chit value and duration agreed up front",
            "A monthly auction where subscribers bid a discount",
            "A prized subscriber each month who takes the pot minus discount and commission",
            "Dividend distributed to all subscribers, lowering next month's instalment",
            "Statutory obligations under the Chit Funds Act, 1982 for registered chits",
          ],
        },
        {
          heading: "How a fixed-contribution savings group works",
          body: [
            "A savings group, self help group or welfare association runs on a different principle entirely. Every member pays the same fixed amount each month, and there is no auction and no bidding.",
            "The money accumulates in a common fund. When a member needs money, the group lends it to them from that fund, usually with interest and an agreed repayment schedule. Repayments flow back into the pool, so the fund grows over time rather than being emptied and rebuilt each cycle.",
            "Nobody wins a pot. There is no discount, no dividend and no foreman commission. The group's wealth is the fund balance, and each member's stake is what they have contributed.",
            "This is what most youth associations, welfare committees and self help groups actually run — including many that colloquially call themselves a chit.",
          ],
          bullets: [
            "The same fixed contribution from every member, every month",
            "One pooled fund that grows rather than resetting each cycle",
            "Loans disbursed from the pool with scheduled repayments and interest",
            "No auction, no bidding, no dividend, no foreman commission",
          ],
        },
        {
          heading: "Which one are you running?",
          body: [
            "The test is simple. Does your group hold a monthly auction where members bid to take the pot early? If yes, you are running a chit fund. If everyone pays the same amount and the group lends out of the accumulated pool, you are running a savings group.",
            "This matters because the software differs at the data level, not just the labels. Chit software has to model auctions, bids, prized subscribers, dividend distribution and commission caps. Savings-group software has to model a persistent fund balance, loan schedules and repayments. Neither is a configuration option of the other.",
            "Being direct about what we have built: this platform handles fixed-contribution savings groups. Contributions, pooled fund, loans, repayments, penalties, receipts and reminders are all live and in use today. Auction and bidding features are not built.",
          ],
          bullets: [
            "Monthly auction and bidding → you need chit fund software",
            "Same amount from everyone, lending from the pool → you need savings group software",
            "Registered under the Chit Funds Act with Registrar filings → you need chit software with compliance features",
          ],
        },
        {
          heading: "Running an auction chit? Tell us",
          body: [
            "We are deciding what to build next, and auction chit support is the most-requested direction. Whether it gets built depends on how many real groups need it.",
            "If you run an auction-based chit, send us your details through the onboarding form. Tell us your chit value, your duration, how many subscribers you have and whether you are registered with the Registrar of Chits. That is a genuine input into what we build, not a mailing list.",
            "If you run a fixed-contribution group, you do not need to wait for anything. The platform does what you need today, and you can be set up this week.",
          ],
          bullets: [
            "Auction chit organisers: send your requirements and we will tell you honestly where we are",
            "Fixed-contribution groups: set up now, no waiting",
            "We would rather turn you away than sell you software that does not fit",
          ],
        },
      ]}
      faqs={[
        {
          question: "Does this software run chit auctions?",
          answer:
            "No. Auction, bidding, prized subscriber, dividend distribution and foreman commission are not built. The platform manages fixed-contribution savings groups: contributions, a pooled fund, member loans, repayments, penalties and receipts. If you need auction management, tell us through the onboarding form — demand is what decides whether we build it.",
        },
        {
          question: "Our group calls itself a chit but everyone pays the same amount. Which are we?",
          answer:
            "You are running a fixed-contribution savings group, and this platform fits you as-is. Many Indian youth associations and welfare committees use the word chit informally for what is structurally a savings-and-credit group. If there is no monthly auction, there is no chit in the regulatory sense.",
        },
        {
          question: "Is a chit fund the same as a self help group?",
          answer:
            "No. A chit fund auctions the monthly pot to the subscriber who accepts the largest discount, and it is a regulated business under the Chit Funds Act, 1982. A self help group collects equal contributions and lends from the accumulated fund. Different mechanics, different obligations, different software.",
        },
        {
          question: "Do you handle Chit Funds Act compliance and Registrar filings?",
          answer:
            "No. Registered chits have statutory obligations including foreman commission caps, minute books and filings with the state Registrar of Chits. We do not provide those features, and you should not rely on this platform for chit compliance.",
        },
        {
          question: "Can we start now and move to chit features later?",
          answer:
            "If your group runs on fixed contributions, yes — you can start today. If you specifically need auctions, we would rather you knew now that they do not exist than discover it after onboarding.",
        },
      ]}
    />
  );
}
