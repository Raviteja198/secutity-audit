"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTenantBranding } from "@/components/layout/TenantBrandingProvider";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const ICONS: Record<string, React.ReactNode> = {
  Dashboard: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Members: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Rules: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Payments: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="1" y1="10" x2="23" y2="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Loans: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  Charity: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  Reports: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Audit logs": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "Change Password": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  "Terms & Conditions": (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Settings: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
};

const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: ICONS["Dashboard"] },
  { href: "/admin/members", label: "Members", icon: ICONS["Members"] },
  { href: "/admin/rules", label: "Rules", icon: ICONS["Rules"] },
  { href: "/admin/payments", label: "Payments", icon: ICONS["Payments"] },
  { href: "/admin/loans", label: "Loans", icon: ICONS["Loans"] },
  { href: "/admin/charity", label: "Charity", icon: ICONS["Charity"] },
  { href: "/admin/reports", label: "Reports", icon: ICONS["Reports"] },
  { href: "/admin/audit", label: "Audit logs", icon: ICONS["Audit logs"] },
  { href: "/admin/terms", label: "Terms & Conditions", icon: ICONS["Terms & Conditions"] },
  { href: "/admin/settings", label: "Settings", icon: ICONS["Settings"] },
];

const USER_NAV: NavItem[] = [
  { href: "/user/dashboard", label: "Dashboard", icon: ICONS["Dashboard"] },
  { href: "/user/members", label: "Members", icon: ICONS["Members"] },
  { href: "/user/rules", label: "Rules", icon: ICONS["Rules"] },
  { href: "/user/payments", label: "Payments", icon: ICONS["Payments"] },
  { href: "/user/loans", label: "Loans", icon: ICONS["Loans"] },
  { href: "/user/charity", label: "Charity", icon: ICONS["Charity"] },
  { href: "/user/reports", label: "Reports", icon: ICONS["Reports"] },
  { href: "/user/change-password", label: "Change Password", icon: ICONS["Change Password"] },
  { href: "/user/terms", label: "Terms & Conditions", icon: ICONS["Terms & Conditions"] },
];

function Nav({ items, onClose }: { items: NavItem[]; onClose?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const isRoot = href === "/admin" || href === "/user" || href === "/user/dashboard";
    if (isRoot) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="space-y-0.5">
      {items.map((i) => {
        const active = isActive(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            onClick={onClose}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-gradient-to-r from-blue-600/80 to-violet-600/80 text-white shadow-lg shadow-violet-900/30 border border-white/10"
                : "text-white/50 hover:text-white/90 hover:bg-white/5",
            ].join(" ")}
          >
            <span className={active ? "text-white" : "text-white/40"}>{i.icon}</span>
            <span>{i.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ items, mode, onClose }: { items: NavItem[]; mode: string; onClose?: () => void }) {
  const { name, logoUrl, loaded } = useTenantBranding();
  const isDefaultLogo = logoUrl === "/logo.png";
  const nameParts = name.trim().split(/\s+/);
  const firstLine = nameParts[0];
  const restLine = nameParts.slice(1).join(" ");

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo / Branding */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg overflow-hidden shadow-lg flex-shrink-0 bg-white/5">
            {!loaded ? null : isDefaultLogo ? (
              <Image src={logoUrl} alt={name} width={32} height={32} className="object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={name} width={32} height={32} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="min-w-0">
            {loaded ? (
              <>
                <div className="text-xs font-bold text-white leading-none truncate">{firstLine}</div>
                {restLine && <div className="text-xs font-bold text-white/50 leading-none truncate">{restLine}</div>}
              </>
            ) : (
              <div className="h-2.5 w-20 rounded-full bg-white/8 animate-pulse" />
            )}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-blue-500/40 via-violet-500/40 to-transparent mt-4" />
      </div>

      {/* Section label */}
      <div className="mb-2 px-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">{mode}</span>
      </div>

      <Nav items={items} onClose={onClose} />

      {onClose && (
        <div className="mt-auto pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            Close Menu
          </button>
        </div>
      )}
    </div>
  );
}

/** Desktop-only sidebar — render inside <aside> */
export function AdminSidebarDesktop() {
  return <SidebarInner items={ADMIN_NAV} mode="Admin" />;
}

/** Mobile-only overlay — render at layout root, outside the grid */
export function AdminMobileOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-14 left-2 right-2 z-40 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "rgba(10,14,28,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <SidebarInner items={ADMIN_NAV} mode="Admin" onClose={onClose} />
      </div>
    </>
  );
}

/** Desktop-only sidebar — render inside <aside> */
export function UserSidebarDesktop() {
  return <SidebarInner items={USER_NAV} mode="User" />;
}

/** Mobile-only overlay — render at layout root, outside the grid */
export function UserMobileOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-14 left-2 right-2 z-40 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "rgba(10,14,28,0.97)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <SidebarInner items={USER_NAV} mode="User" onClose={onClose} />
      </div>
    </>
  );
}

// Keep old exports for backward compatibility (they now just wrap the desktop version)
export function AdminSidebar() {
  return <AdminSidebarDesktop />;
}

export function UserSidebar() {
  return <UserSidebarDesktop />;
}
