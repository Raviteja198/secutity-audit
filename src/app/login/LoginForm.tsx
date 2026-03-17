"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });
      if (!res || res.error) {
        setError("Invalid email or password.");
        return;
      }
      window.location.href = res.url ?? callbackUrl;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md rounded-lg sm:rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
        <h1 className="text-lg sm:text-xl font-semibold text-zinc-900">Sign in</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-600">
          Use your email and password to access the group ledger.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3 sm:space-y-4">
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-medium text-zinc-800">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg sm:rounded-xl border bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-900/10"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-1"> 
            <label className="text-xs sm:text-sm font-medium text-zinc-800">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="rounded-lg sm:rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg sm:rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

