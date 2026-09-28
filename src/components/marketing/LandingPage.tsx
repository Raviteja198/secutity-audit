import Link from "next/link";
import Script from "next/script";
import { MarketingShell } from "./MarketingShell";
import { TenantOnboardingForm } from "./TenantOnboardingForm";
import { FundCards } from "./FundCards";
import { DashboardPreview } from "./DashboardPreview";

const features = [
  {
    title: "Member Management",
    description: "Keep every member's profile, contact details, and status organized in one place.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-3-6.65" />
      </svg>
    ),
  },
  {
    title: "Savings & Contributions",
    description: "Track member savings and contributions automatically, with a clear history for everyone.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.66 0-3 .67-3 1.5S10.34 11 12 11s3 .67 3 1.5-1.34 1.5-3 1.5m0-6V6m0 8v1.5m0-9.5a9 9 0 100 18 9 9 0 000-18z" />
      </svg>
    ),
  },
  {
    title: "Loan Management",
    description: "Issue, approve, and repay loans with rules and penalties enforced automatically.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    title: "Reports & Insights",
    description: "See real-time dashboards and export reports whenever your group needs the numbers.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l7 7-7 7zm0-13H4v13h5" />
      </svg>
    ),
  },
  {
    title: "Payment Reminders",
    description: "Automatic email & WhatsApp alerts before each due date, so members never miss a payment or get hit with a penalty.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: "PDF Receipts",
    description: "Every payment generates an instant, downloadable receipt — no more chasing paper trails.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M9 3h6l5 5v11a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    title: "Audit Trail",
    description: "Every change is logged, so admins can always see who did what and when.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Google Sign-In",
    description: "Members and admins can sign in instantly with Google — no extra passwords to manage.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "What is Youth Management?",
    answer:
      "Youth Management is a dedicated workspace for youth associations and savings groups to manage members, savings contributions, and loans in one place — no more spreadsheets.",
  },
  {
    question: "Is our group's data kept separate from other groups?",
    answer:
      "Yes. Every association gets its own private, tenant-isolated workspace — your members, payments, and loan records never mix with any other group's data.",
  },
  {
    question: "Can individual members log in and see their own account?",
    answer:
      "Yes. Admins get full control over members, loans, and rules, while members get a focused, role-based view of just their own savings and loan activity.",
  },
  {
    question: "How do payment reminders work?",
    answer:
      "The app automatically sends email and WhatsApp alerts before each payment's due date, so members can pay on time and avoid late-payment penalties.",
  },
  {
    question: "Do we need to install any software?",
    answer:
      "No. Youth Management runs entirely in the browser — nothing to install for admins or members, on desktop or mobile.",
  },
  {
    question: "How do we get our group set up?",
    answer:
      "Use the \"Onboard Your Group\" button above to send us your group's details, and we'll set up your workspace. Already have access? Just sign in.",
  },
  {
    question: "Is our financial data secure?",
    answer:
      "Yes. Access requires authentication, every action is recorded in an audit trail, and credentials are stored encrypted — only your group's admins and members can see your data.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const highlights = [
  {
    title: "One space per group",
    description: "Every association gets its own private, tenant-isolated workspace — your data never mixes with anyone else's.",
  },
  {
    title: "Role-based access",
    description: "Admins get full control over members, loans, and rules. Members get a focused view of their own account.",
  },
  {
    title: "Secure by default",
    description: "Authenticated access, audit trails, and encrypted credentials keep your group's finances protected.",
  },
];

const homeNavLinks = [
  { href: "/self-help-group-management-software", label: "SHG Software" },
  { href: "/member-contribution-tracking", label: "Contributions" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

export function LandingPage() {
  return (
    <MarketingShell navLinks={homeNavLinks}>
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
        <section className="canvas-panel canvas-indigo max-w-7xl mx-auto">
          <div>
            {/* Ambient orbs on the canvas */}
            <div className="pointer-events-none absolute -left-16 top-1/3 w-40 h-40 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(251,113,133,0.7),transparent_70%)]" />
            <div className="pointer-events-none absolute left-[45%] -bottom-10 w-32 h-32 rounded-full bg-indigo-950/60 blur-sm" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 sm:px-12 pt-14 sm:pt-20 pb-14 sm:pb-20">
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  Start saving together
                </p>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight mb-5 leading-[1.06] text-white">
                  Group savings
                  <br />
                  have never
                  <br />
                  been easier.
                </h1>
                <p className="text-indigo-100/70 text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8">
                  The easiest way to run your association&apos;s finances. Track member savings,
                  manage loans, send reminders before due dates, and issue receipts — all in one
                  private workspace.
                </p>
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                  <Link
                    href="/login"
                    className="rounded-full bg-indigo-200 text-indigo-950 hover:bg-white transition font-semibold text-sm px-8 py-3.5 w-full sm:w-auto text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                  >
                    Get started
                  </Link>
                  <TenantOnboardingForm triggerClassName="text-sm font-semibold text-white/85 hover:text-white transition px-2 py-3.5 inline-flex items-center gap-1.5" />
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 mt-10 text-left">
                  <div>
                    <p className="text-xl font-bold text-white leading-none">350+</p>
                    <p className="text-[11px] text-indigo-100/50 mt-1">payments tracked</p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <p className="text-xl font-bold text-white leading-none">20</p>
                    <p className="text-[11px] text-indigo-100/50 mt-1">loans managed</p>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div>
                    <p className="text-xl font-bold text-white leading-none">0</p>
                    <p className="text-[11px] text-indigo-100/50 mt-1">spreadsheets needed</p>
                  </div>
                </div>
              </div>

              <FundCards />
            </div>

            <div className="relative text-center pb-8">
              <a href="#compare" className="inline-block text-xs text-indigo-100/50 hover:text-white transition">
                Learn how it replaces the paper register &darr;
              </a>
            </div>
          </div>
        </section>

        <section id="compare" className="canvas-panel canvas-violet max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
          <div className="pointer-events-none absolute -right-20 top-0 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(251,113,133,0.45),transparent_70%)]" />

          <div className="relative max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Say goodbye to lost notebooks and math errors.
            </h2>
            <p className="text-indigo-100/65 text-sm sm:text-base">
              How the traditional paper register compares to your group&apos;s live digital ledger.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 items-start">
            {/* Paper register (before) — a real notebook page */}
            <div className="relative">
              <div className="relative rounded-lg bg-[#f7f2e4] md:-rotate-[1.2deg] shadow-[0_25px_55px_rgba(0,0,0,0.45)] overflow-hidden">
                {/* ruled lines */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.5]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0 25px, #9cb4d8 25px 26px)",
                  }}
                />
                {/* red margin rule */}
                <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-rose-400/60" />

                <div className="relative pl-14 pr-6 py-6">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-semibold text-[#2c3a52] text-base leading-tight">
                        Contributions — July
                      </h3>
                      <p className="text-[11px] text-[#2c3a52]/55 mt-0.5">
                        Group register · kept by hand
                      </p>
                    </div>
                    <span className="shrink-0 rotate-[8deg] rounded-md border-2 border-rose-500/60 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-rose-500/80">
                      Error-prone
                    </span>
                  </div>

                  <div className="space-y-[9px] text-[13px] text-[#2c3a52]">
                    <div className="flex justify-between gap-3 leading-[25px]">
                      <span>10 Jul · M-0012 monthly</span>
                      <span className="line-through decoration-rose-500 decoration-2 text-[#2c3a52]/60">
                        ₹2,000
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 leading-[25px]">
                      <span className="text-rose-600 italic">…paid? ask again</span>
                      <span className="text-rose-600 text-lg leading-none">?</span>
                    </div>
                    <div className="flex justify-between gap-3 leading-[25px]">
                      <span>Loan balance total</span>
                      <span className="text-rose-600">doesn&apos;t add up</span>
                    </div>
                    <div className="flex justify-between gap-3 leading-[25px]">
                      <span>Receipt given</span>
                      <span className="text-[#2c3a52]/60 italic">verbal only</span>
                    </div>
                    <div className="flex justify-between gap-3 leading-[25px]">
                      <span>Due-date reminder</span>
                      <span className="text-[#2c3a52]/60 italic">have to call</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-indigo-50/70 mt-6 px-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-300 mt-0.5">✕</span>
                  One lost or damaged notebook erases the group&apos;s whole history.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-300 mt-0.5">✕</span>
                  Hours every month tallying contributions and loan interest by hand.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-300 mt-0.5">✕</span>
                  No audit trail when a payment is disputed.
                </li>
              </ul>
            </div>

            {/* Digital ledger (after) — the app itself */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(110,231,183,0.22),transparent_70%)]" />

              <div className="relative rounded-2xl border border-white/25 bg-[rgba(14,17,44,0.82)] backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-white/[0.06] border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-[9px] font-bold text-white">
                      YM
                    </span>
                    <div className="leading-tight">
                      <h3 className="font-semibold text-white text-[13px]">Contributions — July</h3>
                      <p className="text-[10px] text-indigo-100/55">Live group ledger</p>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-100 text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    In sync
                  </span>
                </div>

                <ul className="divide-y divide-white/10">
                  {[
                    { label: "Payment recorded", meta: "M-0012 · 10 Jul", value: "₹2,000", tone: "emerald" },
                    { label: "PDF receipt emailed", meta: "sent automatically", value: "#R-0142", tone: "sky" },
                    { label: "WhatsApp reminder", meta: "3 days before due", value: "Delivered", tone: "emerald" },
                    { label: "Audit log", meta: "who changed what, when", value: "Recorded", tone: "muted" },
                  ].map((row) => (
                    <li key={row.label} className="flex items-center gap-3 px-5 py-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          row.tone === "emerald"
                            ? "bg-emerald-400/20 text-emerald-200"
                            : row.tone === "sky"
                              ? "bg-sky-400/20 text-sky-200"
                              : "bg-white/10 text-indigo-100/70"
                        }`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium text-white truncate">{row.label}</span>
                        <span className="block text-[10px] text-indigo-100/50 truncate">{row.meta}</span>
                      </span>
                      <span className="shrink-0 text-[12px] font-semibold text-white/90 font-mono">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="space-y-2.5 text-sm text-indigo-50/75 mt-6 px-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-300 mt-0.5">✓</span>
                  Every payment, loan, and rule stored safely — nothing to lose or misplace.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-300 mt-0.5">✓</span>
                  Dues generated automatically from your rules, penalties applied consistently.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-300 mt-0.5">✓</span>
                  Full audit trail plus one-click Excel export for reviews.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="dashboard" className="canvas-panel canvas-indigo max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-20 top-10 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(244,114,182,0.4),transparent_70%)]" />
          <div className="pointer-events-none absolute right-6 bottom-0 w-48 h-48 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(56,189,248,0.35),transparent_70%)]" />

          <div className="relative max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Your whole association, on one screen.
            </h2>
            <p className="text-indigo-100/65 text-sm sm:text-base">
              Who has paid, what&apos;s still due, how the fund is growing, and every action
              your admins took — without opening a single spreadsheet.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <DashboardPreview />
          </div>
        </section>

        <section id="features" className="canvas-panel canvas-plum max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-16 bottom-4 w-56 h-56 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(129,140,248,0.5),transparent_70%)]" />

          <div className="relative max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Everything your association runs on.
            </h2>
            <p className="text-indigo-100/65 text-sm sm:text-base">
              One workspace for members, money, and the paperwork in between.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="frost-card p-5">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{feature.title}</h3>
                <p className="text-indigo-100/65 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="canvas-panel canvas-indigo max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
          <div className="pointer-events-none absolute right-8 -top-10 w-48 h-48 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(244,114,182,0.45),transparent_70%)]" />

          <div className="relative max-w-2xl mb-9">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Built for your group, not a generic dashboard.
            </h2>
            <p className="text-indigo-100/65 text-sm sm:text-base">
              Every youth association or savings group that signs up gets its own isolated,
              private workspace with its own members, rules, and history.
            </p>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div key={item.title} className="frost-card p-5">
                <h3 className="font-semibold text-white text-sm mb-1.5">{item.title}</h3>
                <p className="text-indigo-100/65 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="reminders" className="canvas-panel canvas-violet max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
          <div className="pointer-events-none absolute left-1/3 -bottom-16 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(251,113,133,0.4),transparent_70%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                Reminders that reach members where they already are.
              </h2>
              <p className="text-indigo-100/65 text-sm sm:text-base mb-6">
                Before each due date, members get an automatic WhatsApp message and email —
                no app to install, no admin chasing anyone by phone. You control the template,
                the schedule, and the timezone.
              </p>
              <ul className="space-y-3 text-sm text-indigo-50/75 text-left max-w-md mx-auto md:mx-0">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-300 mt-0.5">✓</span>
                  Editable message templates per association
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-300 mt-0.5">✓</span>
                  Scheduled by day of month, hour, and timezone
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-300 mt-0.5">✓</span>
                  Email fallback when a member has no WhatsApp number
                </li>
              </ul>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center" aria-hidden="true">
              <div className="w-full max-w-[300px] rounded-[2rem] border-4 border-white/25 bg-[#141034]/90 backdrop-blur-xl shadow-[0_30px_70px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="flex items-center gap-2.5 bg-emerald-500/20 border-b border-white/15 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex items-center justify-center text-[10px] font-bold text-white">
                    YM
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-white">Youth Management</p>
                    <p className="text-[9px] text-emerald-200">WhatsApp Business</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="rounded-2xl rounded-tl-sm bg-white/10 border border-white/15 p-3.5 text-xs text-indigo-50/85 leading-relaxed">
                    <p className="mb-1.5">Hi <span className="font-semibold text-white">Raviteja</span> 👋</p>
                    <p>
                      Your monthly contribution of{" "}
                      <span className="font-semibold text-emerald-200">₹2,000</span> is due on{" "}
                      <span className="font-semibold text-white">10 July</span>.
                    </p>
                    <p className="mt-1.5 text-indigo-100/60">Pay on time to avoid late fee penalties.</p>
                    <p className="text-right text-[9px] text-indigo-100/40 mt-2">08:00 · automated</p>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/10 border border-white/15 p-3.5 text-xs text-indigo-50/85">
                    <p className="flex items-center gap-1.5 text-emerald-200 font-semibold mb-1">
                      ✓ Payment received
                    </p>
                    <p className="text-indigo-100/70">Receipt #R-0142 has been emailed to you.</p>
                    <p className="text-right text-[9px] text-indigo-100/40 mt-2">2 days later</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="canvas-panel canvas-plum max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
          <div className="pointer-events-none absolute -right-14 top-1/4 w-52 h-52 rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(167,139,250,0.5),transparent_70%)]" />

          <div className="relative max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Frequently asked questions
            </h2>
            <p className="text-indigo-100/65 text-sm sm:text-base">
              Everything you need to know before onboarding your group.
            </p>
          </div>
          <div className="relative max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="frost-card p-5">
                <summary className="flex items-center justify-between gap-4 font-semibold text-white text-sm">
                  {faq.question}
                  <svg
                    className="w-4 h-4 shrink-0 text-indigo-100/60 transition-transform [details[open]>&]:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-indigo-100/70 text-sm leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="canvas-panel canvas-indigo max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center">
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-24 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(251,113,133,0.4),transparent_70%)]" />

          <div className="relative">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Ready to get your group organized?
            </h2>
            <p className="text-indigo-100/65 text-sm sm:text-base mb-8">
              Already have a workspace? Sign in. New group? Send us your details.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="rounded-full bg-indigo-200 text-indigo-950 hover:bg-white transition font-semibold text-sm px-8 py-3.5 w-full sm:w-auto text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Sign In
              </Link>
              <TenantOnboardingForm triggerClassName="rounded-full border border-white/35 bg-white/10 hover:bg-white/20 transition font-semibold text-sm text-white px-8 py-3.5 w-full sm:w-auto text-center" />
            </div>
          </div>
        </section>
    </MarketingShell>
  );
}
