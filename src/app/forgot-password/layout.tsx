import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your People's Youth Association account password.",
  alternates: {
    canonical: "/forgot-password",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
