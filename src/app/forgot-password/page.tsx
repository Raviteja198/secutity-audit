"use client";

import { useState } from "react";
import Link from "next/link";

const PASSWORD_RULE_TEXT =
  "7-15 characters, with at least one uppercase letter, one number, and one special character.";

function isValidPassword(password: string): boolean {
  if (password.length <= 6 || password.length > 15) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Failed to send OTP.");
        return;
      }
      setMessage(json?.message ?? "If an account exists for that email, a password reset OTP has been sent.");
      setStep("reset");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!isValidPassword(newPassword)) {
      setError(`Invalid password. ${PASSWORD_RULE_TEXT}`);
      return;
    }
    if (newPassword !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);
      formData.append("newPassword", newPassword);
      if (logo) formData.append("logo", logo);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Failed to reset password.");
        return;
      }
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient blobs behind card — matches /login */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
             style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl overflow-hidden shadow-2xl"
             style={{
               background: "rgba(10, 14, 28, 0.82)",
               border: "1px solid rgba(255,255,255,0.12)",
               backdropFilter: "blur(32px)",
               boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
             }}>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />

          <div className="p-7 sm:p-9">
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg"
                   style={{ boxShadow: "0 8px 25px rgba(139,92,246,0.4)" }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Chits Financial Management</p>
              <h1 className="text-2xl font-bold text-white">Reset your password</h1>
              <p className="text-sm text-white/45 mt-1 text-center">
                {step === "request"
                  ? "Enter your account email — we'll send a one-time code to reset your password."
                  : "Enter the OTP sent to your email along with your new password."}
              </p>
            </div>

            {success ? (
              <div className="space-y-4">
                <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-emerald-300">
                    Password reset successfully. You can now sign in with your new password.
                  </p>
                </div>
                <Link href="/login" className="block w-full text-center btn-gradient py-2.5">
                  Back to log in
                </Link>
              </div>
            ) : step === "request" ? (
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

                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="w-full btn-gradient py-2.5">
                  {loading ? "Sending…" : "Send OTP"}
                </button>

                <Link href="/login" className="block text-center text-xs sm:text-sm text-white/40 hover:text-white/70 transition">
                  Back to log in
                </Link>
              </form>
            ) : (
              <form onSubmit={resetPassword} className="space-y-4">
                {message && (
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-sm text-white/60">{message}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">OTP</label>
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
                  <p className="text-[11px] text-white/30 mt-1 ml-1">Expires 10 minutes after it was sent.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">New Password</label>
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="glass-input"
                    placeholder="New password"
                  />
                  <p className="text-[11px] text-white/30 mt-1 ml-1">{PASSWORD_RULE_TEXT}</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">Confirm New Password</label>
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="glass-input"
                    placeholder="Re-enter new password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5 ml-1">
                    Organization Logo <span className="text-white/30">(optional, admins only)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
                    className="w-full text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white/70 hover:file:bg-white/20"
                  />
                  <p className="text-[11px] text-white/30 mt-1 ml-1">
                    If you&apos;re setting up a new admin account, upload your organization&apos;s logo here — you can change it later in Settings.
                  </p>
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="w-full btn-gradient py-2.5">
                  {loading ? "Resetting…" : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("request")}
                  className="block w-full text-center text-xs sm:text-sm text-white/40 hover:text-white/70 transition"
                >
                  Didn&apos;t get a code? Send again
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full"
             style={{ background: "rgba(139,92,246,0.2)", filter: "blur(20px)" }} />
      </div>
    </div>
  );
}
