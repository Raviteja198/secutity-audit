"use client";

import { signOut, useSession } from "next-auth/react";

export function Topbar({ title }: { title: string }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? null;

  return (
    <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-white/5">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 hidden sm:block mb-0.5">
          Control Center
        </p>
        {title ? (
          <div className="text-sm sm:text-[15px] font-semibold text-white/80 truncate">{title}</div>
        ) : (
          <div className="h-4 w-32 rounded-full bg-white/8 animate-pulse" />
        )}
      </div>

      <div className="ml-3 flex items-center gap-2 sm:gap-3">
        {userEmail && (
          <div className="flex flex-col items-end min-w-0 max-w-[160px] sm:max-w-[220px]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">Signed in as</span>
            <span className="clarity-mask truncate text-xs font-medium text-white/70">{userEmail}</span>
          </div>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-red-500/10 hover:border-red-500/25 whitespace-nowrap flex-shrink-0 transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}
