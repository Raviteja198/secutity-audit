"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [current, setCurrent] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const errs: Record<string, string> = {};
    if (!current) errs.current = "Current password (or OTP) is required.";
    if (!newPwd) errs.newPwd = "New password is required.";
    else if (newPwd.length < 8) errs.newPwd = "New password must be at least 8 characters.";
    if (!confirm) errs.confirm = "Please confirm your new password.";
    else if (newPwd && confirm !== newPwd) errs.confirm = "Passwords do not match.";

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: newPwd }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Failed to change password.");
        return;
      }
      setSuccess(true);
      setCurrent("");
      setNewPwd("");
      setConfirm("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Change Password</h2>
        <p className="text-sm text-white/40 mt-1">
          If you received a one-time password (OTP) from the admin, enter it as your current
          password and set a new one below.
        </p>
      </div>

      {success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
          <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-emerald-300">Password changed successfully!</p>
            <p className="text-xs text-emerald-400/70 mt-0.5">
              Use your new password the next time you sign in.
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-5 space-y-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        {/* Current / OTP */}
        <div className="space-y-1.5">
          <label className="text-xs text-white/45 ml-1">Current Password / OTP *</label>
          <input
            type="password"
            value={current}
            onChange={(e) => { setCurrent(e.target.value); setFieldErrors((p) => ({ ...p, current: "" })); }}
            placeholder="Enter current password or OTP from admin"
            className={["glass-input", fieldErrors.current ? "!border-red-500/50" : ""].join(" ")}
            autoComplete="current-password"
          />
          {fieldErrors.current && <p className="text-xs text-red-400 ml-1">{fieldErrors.current}</p>}
        </div>

        {/* New password */}
        <div className="space-y-1.5">
          <label className="text-xs text-white/45 ml-1">New Password *</label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => { setNewPwd(e.target.value); setFieldErrors((p) => ({ ...p, newPwd: "" })); }}
            placeholder="Minimum 8 characters"
            className={["glass-input", fieldErrors.newPwd ? "!border-red-500/50" : ""].join(" ")}
            autoComplete="new-password"
          />
          {fieldErrors.newPwd && <p className="text-xs text-red-400 ml-1">{fieldErrors.newPwd}</p>}
        </div>

        {/* Confirm */}
        <div className="space-y-1.5">
          <label className="text-xs text-white/45 ml-1">Confirm New Password *</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setFieldErrors((p) => ({ ...p, confirm: "" })); }}
            placeholder="Re-enter new password"
            className={["glass-input", fieldErrors.confirm ? "!border-red-500/50" : ""].join(" ")}
            autoComplete="new-password"
          />
          {fieldErrors.confirm && <p className="text-xs text-red-400 ml-1">{fieldErrors.confirm}</p>}
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
            <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gradient py-2.5 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Changing…
            </>
          ) : "Change Password"}
        </button>
      </form>

      <div className="rounded-2xl px-4 py-3 text-xs text-white/35 space-y-1"
           style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-white/50 font-medium">How it works</p>
        <p>1. Admin generates a one-time password (OTP) for your account.</p>
        <p>2. Admin shares the OTP with you.</p>
        <p>3. You log in using your email + OTP.</p>
        <p>4. Come here and set a new personal password.</p>
      </div>
    </div>
  );
}
