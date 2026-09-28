"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const DEFAULT_TENANT_NAME = "People's Youth";
export const DEFAULT_LOGO_SRC = "/logo.png";

type TenantBranding = { name: string; logoUrl: string; loaded: boolean };

const TenantBrandingContext = createContext<TenantBranding>({
  name: DEFAULT_TENANT_NAME,
  logoUrl: DEFAULT_LOGO_SRC,
  loaded: false,
});

export function TenantBrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<TenantBranding>({
    name: DEFAULT_TENANT_NAME,
    logoUrl: DEFAULT_LOGO_SRC,
    loaded: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/tenant/branding");
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setBranding({
          name: json?.name?.trim() || DEFAULT_TENANT_NAME,
          logoUrl: json?.logoUrl || DEFAULT_LOGO_SRC,
          loaded: true,
        });
      } catch {
        // keep defaults
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TenantBrandingContext.Provider value={branding}>{children}</TenantBrandingContext.Provider>
  );
}

export function useTenantBranding() {
  return useContext(TenantBrandingContext);
}
