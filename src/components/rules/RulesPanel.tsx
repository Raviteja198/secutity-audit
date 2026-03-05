"use client";

import { useEffect, useState } from "react";

type ContributionRule = {
  id: string;
  amountPaise: number;
  effectiveFromMonth: number;
  effectiveFromYear: number;
  createdAt: string;
};

type PenaltyRule = {
  id: string;
  amountPaise: number;
  effectiveFrom: string;
  createdAt: string;
};

function fmt(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function RulesPanel({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/rules" : "/api/user/rules";
  const [contribution, setContribution] = useState<ContributionRule[]>([]);
  const [penalty, setPenalty] = useState<PenaltyRule[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [c, p] = await Promise.all([
        fetch(`${base}/contribution`, { cache: "no-store" }).then((r) => r.json()),
        fetch(`${base}/penalty`, { cache: "no-store" }).then((r) => r.json()),
      ]);
      setContribution(c.items ?? []);
      setPenalty(p.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createContribution(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const amount = Number(form.get("amount") ?? 0);
    const effectiveFromMonth = Number(form.get("month") ?? 0);
    const effectiveFromYear = Number(form.get("year") ?? 0);
    const res = await fetch(`${base}/contribution`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amountPaise: Math.round(amount * 100),
        effectiveFromMonth,
        effectiveFromYear,
      }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    (e.currentTarget as HTMLFormElement).reset();
    await load();
  }

  async function createPenalty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const amount = Number(form.get("amount") ?? 0);
    const effectiveFrom = String(form.get("effectiveFrom") ?? "");
    const res = await fetch(`${base}/penalty`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amountPaise: Math.round(amount * 100),
        effectiveFrom: new Date(effectiveFrom),
      }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    (e.currentTarget as HTMLFormElement).reset();
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Contribution rules</h2>
        {loading ? <span className="text-sm text-zinc-600">Loading…</span> : null}
      </div>

      {mode === "admin" ? (
        <form onSubmit={createContribution} className="grid grid-cols-1 gap-2 md:grid-cols-4">
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Amount (₹)"
            required
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <input
            name="month"
            type="number"
            min={1}
            max={12}
            placeholder="Month"
            required
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <input
            name="year"
            type="number"
            min={2000}
            max={3000}
            placeholder="Year"
            required
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Add rule
          </button>
        </form>
      ) : null}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Effective</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {contribution.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2">
                  {r.effectiveFromMonth}/{r.effectiveFromYear}
                </td>
                <td className="px-3 py-2 font-medium">{fmt(r.amountPaise)}</td>
                <td className="px-3 py-2">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {contribution.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={3}>
                  No contribution rules yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Penalty rules</h2>
      </div>

      {mode === "admin" ? (
        <form onSubmit={createPenalty} className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Penalty (₹)"
            required
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <input
            name="effectiveFrom"
            type="date"
            required
            className="rounded-xl border px-3 py-2 text-sm"
          />
          <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Add rule
          </button>
        </form>
      ) : null}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Effective from</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {penalty.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2">{new Date(r.effectiveFrom).toLocaleDateString()}</td>
                <td className="px-3 py-2 font-medium">{fmt(r.amountPaise)}</td>
                <td className="px-3 py-2">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {penalty.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={3}>
                  No penalty rules yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

