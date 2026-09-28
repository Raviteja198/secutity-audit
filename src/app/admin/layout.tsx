"use client";

import { AdminSidebarDesktop, AdminMobileOverlay } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { TenantBrandingProvider, useTenantBranding } from "@/components/layout/TenantBrandingProvider";
import { useState } from "react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { name, loaded } = useTenantBranding();

  return (
    <div className="min-h-screen p-2 sm:p-3 md:p-4">
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 shadow-lg transition"
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay — lives outside the grid so it always renders */}
      <AdminMobileOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="mx-auto grid max-w-[1400px] gap-3 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar — hidden on mobile, shown in grid on md+ */}
        <aside className="app-shell hidden rounded-2xl md:flex md:flex-col md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:overflow-y-auto">
          <AdminSidebarDesktop />
        </aside>

        {/* Main content */}
        <div className="app-shell rounded-2xl overflow-hidden flex flex-col min-h-[calc(100vh-2rem)]">
          <Topbar title={loaded ? `${name} — Admin` : ""} />
          <div className="flex-1 p-3 sm:p-4 md:p-5 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <TenantBrandingProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </TenantBrandingProvider>
  );
}
