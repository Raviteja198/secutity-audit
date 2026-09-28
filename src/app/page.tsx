import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSession } from "@/lib/server-auth";
import { LandingPage } from "@/components/marketing/LandingPage";

export const metadata: Metadata = {
  title: {
    absolute: "Youth Management — Member Contributions, Savings & Loans Software",
  },
  description:
    "Youth Management is a workspace for youth associations and self help groups to track member contributions, manage a pooled fund, and run group loans — with receipts, penalties and automatic reminders.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Youth Management",
    description:
      "A workspace for youth associations and self help groups to track member contributions, manage a pooled fund, and run group loans.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Youth Management",
    description:
      "A workspace for youth associations and self help groups to track member contributions, manage a pooled fund, and run group loans.",
  },
};

export default async function Home() {
  const session = await getSession();
  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/user");
  }

  return <LandingPage />;
}
