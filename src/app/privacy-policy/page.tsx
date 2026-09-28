import Link from "next/link";
import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const title = "Privacy Policy";
const description =
  "Read how People's Youth Association collects, uses, and protects member data across the savings and loans portal.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["privacy policy", "data protection", "People's Youth Association"],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title,
    description,
    url: "/privacy-policy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <BreadcrumbJsonLd id="ld-breadcrumb-privacy" name="Privacy Policy" path="/privacy-policy" />
      <div className="max-w-3xl mx-auto mb-6">
        <Link href="/login" className="text-xs sm:text-sm text-white/40 hover:text-white/70 transition inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sign in
        </Link>
      </div>
      <PrivacyPolicy />
    </div>
  );
}
