"use client";

import { useState } from "react";

export default function OnboardTenantPage() {
  const [step, setStep] = useState<"request" | "onboard" | "done">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ tenant: { id: string; name: string }; admin: { id: string; email: string } } | null>(null);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/system/onboard-tenant/request-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      setMessage(json?.message ?? "If eligible, a verification code has been sent.");
      setStep("onboard");
    } finally {
      setLoading(false);
    }
  }

  async function createTenant(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/system/onboard-tenant/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp, tenantName, tenantId, adminEmail }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Failed to onboard tenant.");
        return;
      }
      setResult(json);
      setStep("done");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(10, 14, 28, 0.85)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(32px)",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />

          <div className="p-7 sm:p-9">
            <div className="flex flex-col items-center mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">System</p>
              <h1 className="text-2xl font-bold text-white">Onboard a tenant</h1>
              <p className="text-sm text-white/45 mt-1 text-center">
                {step === "request"
                  ? "Enter your email to receive a verification code."
                  : step === "onboard"
                    ? "Enter the code and the new tenant's details."
                    : "Tenant created."}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            {message && step !== "done" && (
              <div className="mb-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3">
                <p className="text-sm text-emerald-300">{message}</p>
              </div>
            )}

            {step === "request" && (
              <form onSubmit={requestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Email address</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="glass-input"
                    placeholder="you@example.com"
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full btn-gradient py-2.5">
                  {loading ? "Sending…" : "Send verification code"}
                </button>
              </form>
            )}

            {step === "onboard" && (
              <form onSubmit={createTenant} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Verification code</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    className="clarity-mask glass-input tracking-widest"
                    placeholder="6-digit code"
                  />
                </div>

                <div className="h-px bg-white/10 my-2" />

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Tenant name</label>
                  <input
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    type="text"
                    required
                    className="glass-input"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Tenant id (optional — derived from name)</label>
                  <input
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    type="text"
                    className="glass-input"
                    placeholder="acme_corp"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Admin email</label>
                  <input
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    type="email"
                    autoComplete="off"
                    required
                    className="clarity-mask glass-input"
                    placeholder="admin@acmecorp.com"
                  />
                  <p className="text-[11px] text-white/30 mt-1 ml-1">
                    They&apos;ll get an email with a code to set their own password via &quot;Forgot password&quot;.
                  </p>
                </div>

                <button type="submit" disabled={loading} className="w-full btn-gradient py-2.5">
                  {loading ? "Creating…" : "Create tenant"}
                </button>
              </form>
            )}

            {step === "done" && result && (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 space-y-1">
                  <p className="text-xs text-white/40">Tenant</p>
                  <p className="text-sm text-white/80 clarity-mask">{result.tenant.name} ({result.tenant.id})</p>
                  <p className="text-xs text-white/40 mt-2">Admin login</p>
                  <p className="text-sm text-white/80 clarity-mask">{result.admin.email}</p>
                </div>
                <p className="text-xs text-white/40">
                  A &quot;set your password&quot; email was sent to {result.admin.email}. They&apos;ll use the code on the
                  &quot;Forgot password&quot; page to set their own password.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStep("request");
                    setEmail("");
                    setOtp("");
                    setTenantName("");
                    setTenantId("");
                    setAdminEmail("");
                    setResult(null);
                    setMessage(null);
                  }}
                  className="w-full btn-gradient py-2.5"
                >
                  Onboard another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
