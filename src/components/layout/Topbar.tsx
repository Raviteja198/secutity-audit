"use client";

import { signOut } from "next-auth/react";

export function Topbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/40 bg-gradient-to-r from-indigo-500/10 via-transparent to-cyan-500/10 px-3 sm:px-4 py-2 sm:py-3 gap-2">
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 hidden sm:block">Control Center</p>
        <div className="text-sm sm:text-base font-semibold text-zinc-200 truncate">{title}</div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg border border-indigo-200/60 bg-white/70 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 hover:bg-red-600 whitespace-nowrap flex-shrink-0"
      >
        Sign out
      </button>
    </div>
  );
}
