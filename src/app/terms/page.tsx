import Link from "next/link";
import type { Metadata } from "next";
import { TermsConditions } from "@/components/TermsConditions";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const title = "Terms & Conditions";
const description =
  "Terms and conditions governing membership, savings, and loans with People's Youth Association.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["terms and conditions", "membership rules", "People's Youth Association"],
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title,
    description,
    url: "/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PublicTermsPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <BreadcrumbJsonLd id="ld-breadcrumb-terms" name="Terms & Conditions" path="/terms" />
      <div className="max-w-3xl mx-auto mb-6">
        <Link href="/login" className="text-xs sm:text-sm text-white/40 hover:text-white/70 transition inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sign in
        </Link>
      </div>
      <TermsConditions />
    </div>
  );
}
