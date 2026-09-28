import Link from "next/link";
import { MarketingShell, solutionLinks } from "./MarketingShell";
import { TenantOnboardingForm } from "./TenantOnboardingForm";

export type Faq = { question: string; answer: string };
export type ContentSection = { heading: string; body: string[]; bullets?: string[] };

export type SolutionPageProps = {
  /** Canonical path, e.g. "/chit-fund-management-software" — used for JSON-LD and to hide self-links. */
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  /** Product name inside SoftwareApplication JSON-LD. */
  appName: string;
  appDescription: string;
  sections: ContentSection[];
  faqs: Faq[];
};

export function SolutionPage({
  path,
  eyebrow,
  h1,
  intro,
  appName,
  appDescription,
  sections,
  faqs,
}: SolutionPageProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youthmanagment.com";

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: appName,
    description: appDescription,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteUrl}${path}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Contact for pricing",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const otherSolutions = solutionLinks.filter((item) => item.href !== path);

  return (
    <MarketingShell>
      {/* Plain script tags: JSON-LD must be in the server-rendered HTML for crawlers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="canvas-panel canvas-indigo max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-16 top-1/3 w-40 h-40 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(251,113,133,0.7),transparent_70%)]" />
        <div className="relative max-w-3xl">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.08] text-white">
            {h1}
          </h1>
          <p className="text-indigo-100/70 text-base sm:text-lg leading-relaxed mb-8">{intro}</p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <TenantOnboardingForm triggerClassName="rounded-full bg-indigo-200 text-indigo-950 hover:bg-white transition font-semibold text-sm px-8 py-3.5 w-full sm:w-auto text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]" />
            <Link
              href="/login"
              className="rounded-full border border-white/35 bg-white/10 hover:bg-white/20 transition font-semibold text-sm text-white px-8 py-3.5 w-full sm:w-auto text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.heading}
          className={`canvas-panel ${index % 2 === 0 ? "canvas-violet" : "canvas-plum"} max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20`}
        >
          <div className="relative max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-5">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-indigo-100/70 text-sm sm:text-base leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-6 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-indigo-50/75 text-sm sm:text-base">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="canvas-panel canvas-violet max-w-7xl mx-auto px-6 sm:px-12 py-14 sm:py-20">
        <div className="relative max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-8">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4"
              >
                <summary className="flex items-center justify-between gap-3 cursor-pointer list-none text-white font-medium text-sm sm:text-base">
                  {faq.question}
                  <svg
                    className="w-4 h-4 shrink-0 text-indigo-100/60 transition-transform group-open:rotate-180"
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
        </div>
      </section>

      <section className="canvas-panel canvas-indigo max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-24 w-80 h-80 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(251,113,133,0.4),transparent_70%)]" />
        <div className="relative">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Ready to get your group organized?
          </h2>
          <p className="text-indigo-100/65 text-sm sm:text-base mb-8">
            Send us your group&apos;s details and we&apos;ll set up your workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <TenantOnboardingForm triggerClassName="rounded-full bg-indigo-200 text-indigo-950 hover:bg-white transition font-semibold text-sm px-8 py-3.5 w-full sm:w-auto text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]" />
            <Link
              href="/login"
              className="rounded-full border border-white/35 bg-white/10 hover:bg-white/20 transition font-semibold text-sm text-white px-8 py-3.5 w-full sm:w-auto text-center"
            >
              Sign In
            </Link>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-indigo-100/45 mb-4">Also explore</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {otherSolutions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/15 transition text-sm text-white/80 hover:text-white px-5 py-2.5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
