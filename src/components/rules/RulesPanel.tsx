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
  const [creatingContribution, setCreatingContribution] = useState(false);
  const [creatingPenalty, setCreatingPenalty] = useState(false);
  const [deletingContribution, setDeletingContribution] = useState<string | null>(null);
  const [deletingPenalty, setDeletingPenalty] = useState<string | null>(null);
  const [contributionError, setContributionError] = useState<string | null>(null);
  const [penaltyError, setPenaltyError] = useState<string | null>(null);

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
    setContributionError(null);
    setCreatingContribution(true);

    try {
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
      if (!res.ok) {
        setContributionError(json?.error ?? "Failed to create contribution rule.");
        return;
      }
      (e.currentTarget as HTMLFormElement).reset();
      await load();
    } finally {
      setCreatingContribution(false);
    }
  }

  async function createPenalty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPenaltyError(null);
    setCreatingPenalty(true);

    try {
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
      if (!res.ok) {
        setPenaltyError(json?.error ?? "Failed to create penalty rule.");
        return;
      }
      (e.currentTarget as HTMLFormElement).reset();
      await load();
    } finally {
      setCreatingPenalty(false);
    }
  }

  async function deleteContribution(id: string) {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    setDeletingContribution(id);
    try {
      const res = await fetch(`${base}/contribution/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json();
        alert(json?.error ?? "Failed to delete rule");
        return;
      }
      await load();
    } finally {
      setDeletingContribution(null);
    }
  }

  async function deletePenalty(id: string) {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    setDeletingPenalty(id);
    try {
      const res = await fetch(`${base}/penalty/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json();
        alert(json?.error ?? "Failed to delete rule");
        return;
      }
      await load();
    } finally {
      setDeletingPenalty(null);
    }
  }

  return (
    <div className="space-y-6 text-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900">Contribution rules</h2>
        {loading ? <span className="text-sm text-zinc-600">Loading…</span> : null}
      </div>

      {mode === "admin" ? (
        <form onSubmit={createContribution} className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-4">
          <div className="space-y-1">
            <label htmlFor="contribAmount" className="text-xs sm:text-sm font-medium text-zinc-800">Amount (₹)</label>
            <input
              id="contribAmount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Amount"
              required
              className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="contribMonth" className="text-xs sm:text-sm font-medium text-zinc-800">Month</label>
            <input
              id="contribMonth"
              name="month"
              type="number"
              min={1}
              max={12}
              placeholder="Month"
              required
              className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="contribYear" className="text-xs sm:text-sm font-medium text-zinc-800">Year</label>
            <input
              id="contribYear"
              name="year"
              type="number"
              min={2000}
              max={3000}
              placeholder="Year"
              required
              className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={creatingContribution}
            className="rounded-lg sm:rounded-xl bg-indigo-600 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition h-fit sm:mt-6"
          >
            {creatingContribution ? "Saving..." : "Add rule"}
          </button>
          {contributionError ? (
            <div className="md:col-span-4 rounded-lg sm:rounded-xl border border-red-200 bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700">
              {contributionError}
            </div>
          ) : null}
        </form>
      ) : null}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Effective</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Created</th>
              {mode === "admin" && <th className="px-3 py-2">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {contribution.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50">
                <td className="px-3 py-2">
                  {r.effectiveFromMonth}/{r.effectiveFromYear}
                </td>
                <td className="px-3 py-2 font-medium text-indigo-600">{fmt(r.amountPaise)}</td>
                <td className="px-3 py-2 text-zinc-600">{new Date(r.createdAt).toLocaleString()}</td>
                {mode === "admin" && (
                  <td className="px-3 py-2">
                    <button
                      onClick={() => deleteContribution(r.id)}
                      disabled={deletingContribution === r.id}
                      className="text-red-600 hover:text-red-700 hover:underline text-xs sm:text-sm font-medium disabled:opacity-50"
                    >
                      {deletingContribution === r.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {contribution.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 4 : 3}>
                  No contribution rules yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-2">
        {contribution.length === 0 ? (
          <div className="rounded-lg border border-dashed px-3 py-4 text-center text-zinc-600 text-xs">
            No contribution rules yet.
          </div>
        ) : (
          contribution.map((r) => (
            <div key={r.id} className="rounded-lg border bg-white p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs text-zinc-600">Effective</p>
                  <p className="font-semibold text-sm text-zinc-900">{r.effectiveFromMonth}/{r.effectiveFromYear}</p>
                </div>
                <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                  {fmt(r.amountPaise)}
                </span>
              </div>
              <p className="text-xs text-zinc-500">Created: {new Date(r.createdAt).toLocaleString()}</p>
              {mode === "admin" && (
                <button
                  onClick={() => deleteContribution(r.id)}
                  disabled={deletingContribution === r.id}
                  className="w-full rounded-lg bg-red-50 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  {deletingContribution === r.id ? "Deleting..." : "Delete Rule"}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <h2 className="text-base font-semibold">Penalty rules</h2>
      </div>

      {mode === "admin" ? (
        <form onSubmit={createPenalty} className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <label htmlFor="penaltyAmount" className="text-xs sm:text-sm font-medium text-zinc-800">Penalty (₹)</label>
            <input
              id="penaltyAmount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Penalty"
              required
              className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="penaltyEffectiveFrom" className="text-xs sm:text-sm font-medium text-zinc-800">Effective From</label>
            <input
              id="penaltyEffectiveFrom"
              name="effectiveFrom"
              type="date"
              required
              className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={creatingPenalty}
            className="rounded-lg sm:rounded-xl bg-indigo-600 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition h-fit sm:mt-6"
          >
            {creatingPenalty ? "Saving..." : "Add rule"}
          </button>
          {penaltyError ? (
            <div className="md:col-span-3 rounded-lg sm:rounded-xl border border-red-200 bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700">
              {penaltyError}
            </div>
          ) : null}
        </form>
      ) : null}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Effective from</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Created</th>
              {mode === "admin" && <th className="px-3 py-2">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {penalty.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50">
                <td className="px-3 py-2">{new Date(r.effectiveFrom).toLocaleDateString()}</td>
                <td className="px-3 py-2 font-medium text-indigo-600">{fmt(r.amountPaise)}</td>
                <td className="px-3 py-2 text-zinc-600">{new Date(r.createdAt).toLocaleString()}</td>
                {mode === "admin" && (
                  <td className="px-3 py-2">
                    <button
                      onClick={() => deletePenalty(r.id)}
                      disabled={deletingPenalty === r.id}
                      className="text-red-600 hover:text-red-700 hover:underline text-xs sm:text-sm font-medium disabled:opacity-50"
                    >
                      {deletingPenalty === r.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {penalty.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 4 : 3}>
                  No penalty rules yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-2">
        {penalty.length === 0 ? (
          <div className="rounded-lg border border-dashed px-3 py-4 text-center text-zinc-600 text-xs">
            No penalty rules yet.
          </div>
        ) : (
          penalty.map((r) => (
            <div key={r.id} className="rounded-lg border bg-white p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-xs text-zinc-600">Effective From</p>
                  <p className="font-semibold text-sm text-zinc-900">{new Date(r.effectiveFrom).toLocaleDateString()}</p>
                </div>
                <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">
                  {fmt(r.amountPaise)}
                </span>
              </div>
              <p className="text-xs text-zinc-500">Created: {new Date(r.createdAt).toLocaleString()}</p>
              {mode === "admin" && (
                <button
                  onClick={() => deletePenalty(r.id)}
                  disabled={deletingPenalty === r.id}
                  className="w-full rounded-lg bg-red-50 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  {deletingPenalty === r.id ? "Deleting..." : "Delete Rule"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
