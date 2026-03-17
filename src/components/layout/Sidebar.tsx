"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

function Nav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const isRootSection = href === "/admin" || href === "/user";
    if (isRootSection) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="space-y-1">
      {items.map((i) => {
        const active = isActive(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            className={[
              "block rounded-xl px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow"
                : "text-zinc-700 hover:bg-white/70 hover:text-zinc-900",
            ].join(" ")}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onClose, items, mode }: { onClose?: () => void; items: NavItem[]; mode: string }) {
  return (
    <>
      <div className="p-3">
        <div className="mb-2 rounded-xl bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
          {mode}
        </div>
        <Nav items={items} />
      </div>
      {onClose && (
        <div className="border-t p-3 md:hidden">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
          >
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}

export function AdminSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: (open: boolean) => void }) {
  const items = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/members", label: "Members" },
    { href: "/admin/rules", label: "Rules" },
    { href: "/admin/payments", label: "Payments" },
    { href: "/admin/loans", label: "Loans" },
    { href: "/admin/charity", label: "Charity" },
    { href: "/admin/reports", label: "Reports" },
    { href: "/admin/audit", label: "Audit logs" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="p-3 hidden md:block">
        <div className="mb-2 rounded-xl bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
          Admin
        </div>
        <Nav items={items} />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-30 top-12"
            onClick={() => onToggle(false)}
          />
          <div className="md:hidden fixed top-12 right-0 left-0 bg-white z-40 rounded-b-2xl shadow-lg max-h-[calc(100vh-48px)] overflow-y-auto">
            <SidebarContent onClose={() => onToggle(false)} items={items} mode="Admin" />
          </div>
        </>
      )}
    </>
  );
}

export function UserSidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: (open: boolean) => void }) {
  const items = [
    { href: "/user", label: "Dashboard" },
    { href: "/user/members", label: "Members" },
    { href: "/user/rules", label: "Rules" },
    { href: "/user/payments", label: "Payments" },
    { href: "/user/loans", label: "Loans" },
    { href: "/user/charity", label: "Charity" },
    { href: "/user/reports", label: "Reports" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="p-3 hidden md:block">
        <div className="mb-2 rounded-xl bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
          User
        </div>
        <Nav items={items} />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-30 top-12"
            onClick={() => onToggle(false)}
          />
          <div className="md:hidden fixed top-12 right-0 left-0 bg-white z-40 rounded-b-2xl shadow-lg max-h-[calc(100vh-48px)] overflow-y-auto">
            <SidebarContent onClose={() => onToggle(false)} items={items} mode="User" />
          </div>
        </>
      )}
    </>
  );
}
