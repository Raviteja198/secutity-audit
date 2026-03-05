"use client";

import { useEffect, useState } from "react";

type Loan = {
  id: string;
  principalPaise: number;
  monthlyRateBps: number;
  durationMonths: number;
  startDate: string;
  status: "PENDING_APPROVAL" | "ACTIVE" | "CLOSED" | "DEFAULTED";
  member: { id: string; memberUid: string; fullName: string };
};

function fmt(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function LoansTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/loans" : "/api/user/loans";
  const [items, setItems] = useState<Loan[]>([]);

  async function load() {
    const res = await fetch(base, { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch(base, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        memberId: String(fd.get("memberId")),
        principalPaise: Math.round(Number(fd.get("principal") ?? 0) * 100),
        monthlyRateBps: Math.round(Number(fd.get("ratePercent") ?? 0) * 100),
        durationMonths: Number(fd.get("durationMonths") ?? 0),
        startDate: new Date(String(fd.get("startDate") ?? "")),
      }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    (e.currentTarget as HTMLFormElement).reset();
    await load();
  }

  async function approve(id: string) {
    const res = await fetch(`/api/admin/loans/${id}/approve`, { method: "POST" });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    await load();
  }

  return (
    <div className="space-y-3">
      {mode === "admin" ? (
        <details className="rounded-xl border bg-white p-3">
          <summary className="cursor-pointer text-sm font-medium text-zinc-900">Create loan</summary>
          <form onSubmit={create} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            <input name="memberId" placeholder="Member ID (internal DB id)" required className="rounded-xl border px-3 py-2 text-sm" />
            <input name="principal" type="number" step="0.01" placeholder="Principal (₹)" required className="rounded-xl border px-3 py-2 text-sm" />
            <input name="ratePercent" type="number" step="0.01" placeholder="Monthly rate (%)" required className="rounded-xl border px-3 py-2 text-sm" />
            <input name="durationMonths" type="number" min={2} max={240} placeholder="Duration (months)" required className="rounded-xl border px-3 py-2 text-sm" />
            <input name="startDate" type="date" required className="rounded-xl border px-3 py-2 text-sm" />
            <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 md:col-span-3">
              Create
            </button>
            <div className="md:col-span-3 text-xs text-zinc-600">
              Note: For now, enter the Member database `id`. A member picker UI is the next polish item.
            </div>
          </form>
        </details>
      ) : null}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Member</th>
              <th className="px-3 py-2">Principal</th>
              <th className="px-3 py-2">Rate</th>
              <th className="px-3 py-2">Duration</th>
              <th className="px-3 py-2">Start</th>
              <th className="px-3 py-2">Status</th>
              {mode === "admin" ? <th className="px-3 py-2">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {items.map((l) => (
              <tr key={l.id}>
                <td className="px-3 py-2">
                  <div className="font-medium text-zinc-900">{l.member.fullName}</div>
                  <div className="text-xs text-zinc-600">{l.member.memberUid}</div>
                </td>
                <td className="px-3 py-2">{fmt(l.principalPaise)}</td>
                <td className="px-3 py-2">{(l.monthlyRateBps / 100).toFixed(2)}%</td>
                <td className="px-3 py-2">{l.durationMonths}</td>
                <td className="px-3 py-2">{new Date(l.startDate).toLocaleDateString()}</td>
                <td className="px-3 py-2">{l.status}</td>
                {mode === "admin" ? (
                  <td className="px-3 py-2">
                    {l.status === "PENDING_APPROVAL" ? (
                      <button
                        onClick={() => void approve(l.id)}
                        className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
                      >
                        Approve & schedule
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 7 : 6}>
                  No loans yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

