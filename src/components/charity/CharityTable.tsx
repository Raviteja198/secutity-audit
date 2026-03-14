"use client";

import { useEffect, useState } from "react";

type Charity = {
  id: string;
  title: string;
  beneficiary: string;
  purpose?: string | null;
  amountPaise: number;
  date: string;
  imageUrl?: string | null;
};

function fmt(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function CharityTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/charity" : "/api/user/charity";
  const [items, setItems] = useState<Charity[]>([]);
  const [creatingCharity, setCreatingCharity] = useState(false);
  const [createCharityError, setCreateCharityError] = useState<string | null>(null);

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
    setCreateCharityError(null);
    setCreatingCharity(true);
    try {
      const fd = new FormData(e.currentTarget);
      const payload = {
        title: String(fd.get("title") ?? ""),
        beneficiary: String(fd.get("beneficiary") ?? ""),
        purpose: String(fd.get("purpose") ?? "") || undefined,
        amountPaise: Math.round(Number(fd.get("amount") ?? 0) * 100),
        date: new Date(String(fd.get("date") ?? "")),
        imageUrl: String(fd.get("imageUrl") ?? "") || undefined,
      };
      const res = await fetch(base, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setCreateCharityError(json?.error ?? "Failed to create charity entry.");
        return;
      }
      (e.currentTarget as HTMLFormElement).reset();
      (e.currentTarget.closest("details") as HTMLDetailsElement).open = false;
      await load();
    } finally {
      setCreatingCharity(false);
    }
  }

  return (
    <div className="space-y-3">
      {mode === "admin" ? (
        <details className="rounded-xl border bg-white p-3">
          <summary className="cursor-pointer text-sm font-medium text-zinc-900">
            Add charity entry
          </summary>
          <form onSubmit={create} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="charityTitle" className="text-sm font-medium text-zinc-800">Title</label>
              <input id="charityTitle" name="title" placeholder="Title" required className="rounded-xl border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="charityBeneficiary" className="text-sm font-medium text-zinc-800">Beneficiary</label>
              <input
                id="charityBeneficiary"
                name="beneficiary"
                placeholder="Beneficiary"
                required
                className="rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="charityAmount" className="text-sm font-medium text-zinc-800">Amount (₹)</label>
              <input id="charityAmount" name="amount" type="number" step="0.01" placeholder="Amount (₹)" required className="rounded-xl border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label htmlFor="charityDate" className="text-sm font-medium text-zinc-800">Date</label>
              <input id="charityDate" name="date" type="date" required className="rounded-xl border px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="charityPurpose" className="text-sm font-medium text-zinc-800">Purpose (optional)</label>
              <input id="charityPurpose" name="purpose" placeholder="Purpose (optional)" className="rounded-xl border px-3 py-2 text-sm md:col-span-2" />
            </div>
            <div className="space-y-1 md:col-span-3">
              <label htmlFor="charityImageUrl" className="text-sm font-medium text-zinc-800">Image Link (optional)</label>
              <input id="charityImageUrl" name="imageUrl" placeholder="Image link (optional)" className="rounded-xl border px-3 py-2 text-sm md:col-span-3" />
            </div>
            <button
              type="submit"
              disabled={creatingCharity}
              className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 md:col-span-3"
            >
              {creatingCharity ? "Creating entry..." : "Create"}
            </button>
            {createCharityError ? (
              <div className="md:col-span-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {createCharityError}
              </div>
            ) : null}
          </form>
        </details>
      ) : null}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Beneficiary</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Image</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {items.map((c) => (
              <tr key={c.id}>
                <td className="px-3 py-2">{new Date(c.date).toLocaleDateString()}</td>
                <td className="px-3 py-2 font-medium text-zinc-900">{c.title}</td>
                <td className="px-3 py-2">{c.beneficiary}</td>
                <td className="px-3 py-2">{fmt(c.amountPaise)}</td>
                <td className="px-3 py-2">
                  {c.imageUrl ? (
                    <a className="underline" href={c.imageUrl} target="_blank" rel="noreferrer">
                      link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={5}>
                  No charity entries yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
