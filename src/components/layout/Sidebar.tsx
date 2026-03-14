"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

function Nav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((i) => {
        const active = pathname === i.href || pathname.startsWith(i.href + "/");
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

export function AdminSidebar() {
  return (
    <div className="p-3">
      <div className="mb-2 rounded-xl bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
        Admin
      </div>
      <Nav
        items={[
          { href: "/admin", label: "Dashboard" },
          { href: "/admin/members", label: "Members" },
          { href: "/admin/rules", label: "Rules" },
          { href: "/admin/payments", label: "Payments" },
          { href: "/admin/loans", label: "Loans" },
          { href: "/admin/charity", label: "Charity" },
          { href: "/admin/reports", label: "Reports" },
          { href: "/admin/audit", label: "Audit logs" },
        ]}
      />
    </div>
  );
}

export function UserSidebar() {
  return (
    <div className="p-3">
      <div className="mb-2 rounded-xl bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
        User
      </div>
      <Nav
        items={[
          { href: "/user", label: "Dashboard" },
          { href: "/user/members", label: "Members" },
          { href: "/user/rules", label: "Rules" },
          { href: "/user/payments", label: "Payments" },
          { href: "/user/loans", label: "Loans" },
          { href: "/user/charity", label: "Charity" },
          { href: "/user/reports", label: "Reports" },
        ]}
      />
    </div>
  );
}
