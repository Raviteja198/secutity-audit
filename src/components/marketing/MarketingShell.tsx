import Link from "next/link";
import { TenantOnboardingForm } from "./TenantOnboardingForm";

export type NavLink = { href: string; label: string };

/** Solution pages — also the sitewide internal links search engines follow. */
export const solutionLinks: NavLink[] = [
  { href: "/self-help-group-management-software", label: "SHG Software" },
  { href: "/member-contribution-tracking", label: "Contribution Tracking" },
  { href: "/chit-fund-management-software", label: "For Chit Groups" },
];

export function BrandMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-8 h-8 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.35)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ym-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="55%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#ym-mark)" />
      <g fill="#ffffff" fillOpacity="0.92">
        <circle cx="15.5" cy="29.5" r="4.3" />
        <rect x="10.5" y="38" width="10" height="10" rx="4.2" />
        <circle cx="32" cy="23" r="4.3" />
        <rect x="27" y="31.5" width="10" height="16.5" rx="4.2" />
      </g>
      <g fill="#6ee7b7">
        <circle cx="48.5" cy="16.5" r="4.3" />
        <rect x="43.5" y="25" width="10" height="23" rx="4.2" />
      </g>
    </svg>
  );
}

export function MarketingShell({
  navLinks = solutionLinks,
  children,
}: {
  navLinks?: NavLink[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 px-3 sm:px-5 pt-3 pb-2">
        <div className="max-w-7xl mx-auto rounded-full border border-white/15 bg-[rgba(10,13,28,0.72)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] pl-4 pr-3 sm:pl-5 sm:pr-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-semibold text-white/90 text-sm sm:text-base">Youth Management</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-white/55 hover:text-white hover:bg-white/10 transition"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-white/55 hover:text-white hover:bg-white/10 transition"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <Link
            href="/login"
            className="rounded-full bg-indigo-200 text-indigo-950 hover:bg-white transition font-semibold text-sm px-5 py-2.5 inline-flex items-center"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="px-3 sm:px-5 pt-4 pb-6 space-y-4 sm:space-y-5">{children}</main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-8 pb-10">
        <div className="border-t border-white/10 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs pb-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <BrandMark />
              <span className="font-semibold text-white/90 text-sm">Youth Management</span>
            </div>
            <p className="text-white/40 leading-relaxed">
              Contribution, savings and loan management for Indian youth associations and self help groups.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white/70 mb-3">Solutions</p>
            <ul className="space-y-2 text-white/40">
              {solutionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white/70 transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white/70 mb-3">Product</p>
            <ul className="space-y-2 text-white/40">
              <li>
                <Link href="/" className="hover:text-white/70 transition">Overview</Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white/70 transition">Features</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white/70 transition">FAQ</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white/70 transition">Sign In</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white/70 mb-3">Legal</p>
            <ul className="space-y-2 text-white/40">
              <li>
                <Link href="/privacy-policy" className="hover:text-white/70 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white/70 transition">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} Youth Management. All rights reserved.</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/ashoksmart143"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition"
              >
                Anumula Ashok
              </a>
            </span>
          </div>
          <TenantOnboardingForm triggerClassName="rounded-full border border-white/25 bg-white/10 hover:bg-white/20 transition font-semibold text-xs text-white px-5 py-2.5" />
        </div>
      </footer>
    </div>
  );
}
