"use client";

import { signOut } from "next-auth/react";

export function Topbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="text-sm font-semibold text-zinc-900">{title}</div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg border px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
      >
        Sign out
      </button>
    </div>
  );
}

