import type { Metadata } from "next";

const title = "Sign In";
const description = "Sign in to the People's Youth Association member portal.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title,
    description,
    url: "/login",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
