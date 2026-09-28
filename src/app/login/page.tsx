"use client";

import { Suspense, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { isValidEmail, type FieldErrors } from "@/lib/validators/client";
import { TermsConditions } from "@/components/TermsConditions";
import { Bubbles } from "@/components/ui/Bubbles";

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "This Google account isn't registered with the group. Ask an admin to invite you first.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    oauthError ? GOOGLE_ERROR_MESSAGES[oauthError] ?? "Google sign-in failed. Please try again." : null
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // T&C acceptance gate
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingRole, setPendingRole] = useState<string | null>(null);

  function handleAcceptTerms() {
    if (!termsAccepted) return;
    if (pendingRole === "ADMIN") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/user/dashboard";
    }
  }

  function handleDeclineTerms() {
    setShowTerms(false);
    setTermsAccepted(false);
    setPendingRole(null);
    signOut({ redirect: false });
  }

  async function signInWithGoogle() {
    setError(null);
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const errs: FieldErrors = {};
    if (!email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin/dashboard",
      });

      if (!res || res.error) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      const session = await fetch("/api/auth/session").then((r) => r.json());
      const role = (session?.user as { role?: string } | undefined)?.role;

      setPendingRole(role ?? "USER");
      setShowTerms(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10">

      {/* Ambient blobs behind card */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      {/* Bubbles drifting up behind the card */}
      <Bubbles />

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_minmax(0,26rem)] gap-10 lg:gap-14 items-center">

        {/* Brand / value panel — desktop only */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-10">
            <svg viewBox="0 0 64 64" className="w-11 h-11 rounded-xl shrink-0" aria-hidden="true">
              <defs>
                <linearGradient id="cfm-mark" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="55%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#cfm-mark)" />
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
            <div className="leading-tight">
              <p className="text-lg font-bold text-white">Chits Financial</p>
              <p className="text-lg font-bold gradient-text -mt-1">Management</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-[1.1] mb-5">
            One platform.
            <br />
            <span className="gradient-text">Many organizations.</span>
            <br />
            Complete control.
          </h2>
          <p className="text-white/50 text-base max-w-md mb-10">
            Manage your chit funds, members, collections and reports — each association
            in its own private, isolated workspace.
          </p>

          <ul className="space-y-4 max-w-md">
            {[
              {
                title: "Members",
                body: "Manage members, roles, and group access",
                path: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-3-6.65",
              },
              {
                title: "Collections",
                body: "Track monthly dues, payments, and penalties",
                path: "M12 8c-1.66 0-3 .67-3 1.5S10.34 11 12 11s3 .67 3 1.5-1.34 1.5-3 1.5m0-6V6m0 8v1.5m0-9.5a9 9 0 100 18 9 9 0 000-18z",
              },
              {
                title: "Reports",
                body: "Live dashboards, audit trail, and Excel export",
                path: "M9 19V6l7 7-7 7zm0-13H4v13h5",
              },
              {
                title: "Isolated by design",
                body: "Every organization's data is kept fully separate",
                path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-violet-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white/90">{item.title}</span>
                  <span className="block text-sm text-white/45">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0">
        <div className="rounded-2xl overflow-hidden shadow-2xl"
             style={{
               background: "rgba(10, 14, 28, 0.82)",
               border: "1px solid rgba(255,255,255,0.12)",
               backdropFilter: "blur(32px)",
               boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
             }}>

          {/* Card header gradient bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />

          <div className="p-7 sm:p-9">
            {/* Icon + Title */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg"
                   style={{ boxShadow: "0 8px 25px rgba(139,92,246,0.4)" }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-1.5 text-center">
                Chits Financial Management
              </p>
              <h1 className="text-2xl font-bold text-white">Log in</h1>
              <p className="text-sm text-white/45 mt-1 text-center">
                Log in to access your organization
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Email address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: "" })); }}
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className={["glass-input pl-9", fieldErrors.email ? "!border-red-500/50 focus:!ring-red-500/20" : ""].join(" ")}
                  />
                </div>
                {fieldErrors.email && <p className="text-xs text-red-400 mt-1 ml-1">{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5 ml-1 mr-1">
                  <label className="block text-xs font-medium text-white/50">Password</label>
                  <a href="/forgot-password" className="text-xs text-white/40 hover:text-white/70 transition">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: "" })); }}
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={["glass-input pl-9 pr-10", fieldErrors.password ? "!border-red-500/50 focus:!ring-red-500/20" : ""].join(" ")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                  >
                    {showPw ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-xs text-red-400 mt-1 ml-1">{fieldErrors.password}</p>}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient py-2.5 mt-2 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] text-white/25 uppercase tracking-wider">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google sign-in */}
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl py-2.5 text-sm font-medium transition disabled:opacity-60"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z"/>
                <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 014.9 12c0-.79.14-1.56.37-2.28V6.61H1.27A12 12 0 000 12c0 1.94.46 3.77 1.27 5.39l4-3.11z"/>
                <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z"/>
              </svg>
              {googleLoading ? "Redirecting…" : "Log in with Google"}
            </button>

            <p className="mt-6 text-center text-xs text-white/25">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-white/40 hover:text-white/70 underline transition">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-white/40 hover:text-white/70 underline transition">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full"
             style={{ background: "rgba(139,92,246,0.2)", filter: "blur(20px)" }} />
        </div>
      </div>

      {/* Terms & Conditions Acceptance Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(10, 14, 28, 0.95)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(32px)",
            }}>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 flex-shrink-0" />

            <div className="px-5 sm:px-7 pt-5 pb-3 flex-shrink-0">
              <h2 className="text-lg font-bold text-white/90">Accept Terms &amp; Conditions</h2>
              <p className="text-xs text-white/40 mt-1">Please read and accept the terms to continue</p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 sm:px-7 pb-4">
              <TermsConditions />
            </div>

            <div className="flex-shrink-0 px-5 sm:px-7 py-4 border-t border-white/[0.08] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border transition-all duration-200
                    peer-checked:bg-violet-600 peer-checked:border-violet-500
                    border-white/20 bg-white/5 flex items-center justify-center">
                    {termsAccepted && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-white/60 leading-relaxed">
                  I have read and agree to the <strong className="text-white/80">Terms &amp; Conditions</strong> of People&apos;s Youth group.
                </span>
              </label>

              <div className="flex gap-2">
                <button
                  onClick={handleAcceptTerms}
                  disabled={!termsAccepted}
                  className="flex-[2] btn-gradient py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Accept &amp; Continue
                </button>
                <button
                  onClick={handleDeclineTerms}
                  className="flex-1 btn-ghost py-2.5 text-sm font-medium"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
