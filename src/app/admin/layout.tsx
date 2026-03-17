"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const adminItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/members", label: "Members" },
    { href: "/admin/rules", label: "Rules" },
    { href: "/admin/payments", label: "Payments" },
    { href: "/admin/loans", label: "Loans" },
    { href: "/admin/charity", label: "Charity" },
    { href: "/admin/reports", label: "Reports" },
    { href: "/admin/audit", label: "Audit logs" },
  ];

  const isActive = (href: string) => {
    const isRootSection = href === "/admin";
    if (isRootSection) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-6">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-3 left-3 z-50 p-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-30 top-12"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="md:hidden fixed top-12 left-0 right-0 bg-white z-40 rounded-b-2xl shadow-lg max-h-[calc(100vh-48px)] overflow-y-auto">
            <div className="p-4 space-y-2">
              <div className="mb-3 rounded-xl bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                Admin Menu
              </div>
              <nav className="space-y-1">
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition",
                      isActive(item.href)
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow"
                        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 mt-4"
              >
                Close Menu
              </button>
            </div>
          </div>
        </>
      )}

      <div className="mx-auto grid max-w-6xl gap-3 sm:gap-4 md:grid-cols-[240px_1fr]">
        <aside className="app-shell hidden rounded-xl sm:rounded-2xl md:block md:max-h-screen md:overflow-y-auto">
          <AdminSidebar isOpen={isMenuOpen} onToggle={setIsMenuOpen} />
        </aside>
        <div className="app-shell overflow-hidden rounded-xl sm:rounded-2xl">
          <Topbar title="Money Management (Admin)" />
          <div className="p-2 sm:p-3 md:p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
