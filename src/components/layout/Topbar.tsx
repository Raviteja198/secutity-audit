"use client";

import { signOut } from "next-auth/react";

export function Topbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/40 bg-gradient-to-r from-indigo-500/10 via-transparent to-cyan-500/10 px-4 py-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Control Center</p>
        <div className="text-sm font-semibold text-zinc-900">{title}</div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg border border-indigo-200/60 bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-white"
      >
        Sign out
      </button>
    </div>
  );
}
