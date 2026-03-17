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
    <div className="space-y-3 sm:space-y-4">
      {mode === "admin" ? (
        <details className="rounded-lg sm:rounded-xl border bg-white p-2 sm:p-3">
          <summary className="cursor-pointer text-xs sm:text-sm font-medium text-zinc-900">
            ➕ Add charity entry
          </summary>
          <form onSubmit={create} className="mt-3 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="charityTitle" className="text-xs sm:text-sm font-medium text-zinc-800">Title</label>
              <input id="charityTitle" name="title" placeholder="Title" required className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
              <label htmlFor="charityBeneficiary" className="text-xs sm:text-sm font-medium text-zinc-800">Beneficiary</label>
              <input
                id="charityBeneficiary"
                name="beneficiary"
                placeholder="Beneficiary"
                required
                className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="charityAmount" className="text-xs sm:text-sm font-medium text-zinc-800">Amount (₹)</label>
              <input id="charityAmount" name="amount" type="number" step="0.01" placeholder="Amount" required className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
              <label htmlFor="charityDate" className="text-xs sm:text-sm font-medium text-zinc-800">Date</label>
              <input id="charityDate" name="date" type="date" required className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="charityPurpose" className="text-xs sm:text-sm font-medium text-zinc-800">Purpose (optional)</label>
              <input id="charityPurpose" name="purpose" placeholder="Purpose" className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1 md:col-span-3">
              <label htmlFor="charityImageUrl" className="text-xs sm:text-sm font-medium text-zinc-800">Image Link (optional)</label>
              <input id="charityImageUrl" name="imageUrl" placeholder="Image link" className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button
              type="submit"
              disabled={creatingCharity}
              className="rounded-lg sm:rounded-xl bg-indigo-600 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 md:col-span-3 transition"
            >
              {creatingCharity ? "Creating..." : "Create"}
            </button>
            {createCharityError ? (
              <div className="md:col-span-3 rounded-lg sm:rounded-xl border border-red-200 bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700">
                {createCharityError}
              </div>
            ) : null}
          </form>
        </details>
      ) : null}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2 sm:px-4">Date</th>
              <th className="px-3 py-2 sm:px-4">Title</th>
              <th className="px-3 py-2 sm:px-4">Beneficiary</th>
              <th className="px-3 py-2 sm:px-4">Amount</th>
              <th className="px-3 py-2 sm:px-4">Purpose</th>
              <th className="px-3 py-2 sm:px-4">Image</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {items.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-50">
                <td className="px-3 py-2 sm:px-4 text-zinc-700">{new Date(c.date).toLocaleDateString()}</td>
                <td className="px-3 py-2 sm:px-4 font-medium text-zinc-900">{c.title}</td>
                <td className="px-3 py-2 sm:px-4 text-zinc-700">{c.beneficiary}</td>
                <td className="px-3 py-2 sm:px-4 font-semibold text-indigo-600">{fmt(c.amountPaise)}</td>
                <td className="px-3 py-2 sm:px-4 text-zinc-600">{c.purpose || "-"}</td>
                <td className="px-3 py-2 sm:px-4">
                  {c.imageUrl ? (
                    <a className="text-indigo-600 hover:underline text-xs sm:text-sm" href={c.imageUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : (
                    <span className="text-zinc-500 text-xs sm:text-sm">-</span>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 sm:px-4 text-center text-zinc-600" colSpan={6}>
                  No charity entries yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-2 sm:gap-3">
        {items.length === 0 ? (
          <div className="rounded-lg sm:rounded-xl border border-dashed px-3 sm:px-4 py-4 sm:py-6 text-center text-zinc-600 text-xs sm:text-sm">
            No charity entries yet.
          </div>
        ) : (
          items.map((c) => (
            <div key={c.id} className="rounded-lg sm:rounded-xl border bg-white p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-xs sm:text-sm text-zinc-900">{c.title}</h3>
                  <p className="text-xs text-zinc-500">{new Date(c.date).toLocaleDateString()}</p>
                </div>
                <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 whitespace-nowrap">
                  {fmt(c.amountPaise)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-zinc-600">Beneficiary</p>
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">{c.beneficiary}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-600">Purpose</p>
                  <p className="text-xs sm:text-sm font-medium text-zinc-900">{c.purpose || "-"}</p>
                </div>
              </div>

              {c.imageUrl && (
                <a href={c.imageUrl} target="_blank" rel="noreferrer" className="inline-block text-xs text-indigo-600 hover:underline">
                  📷 View Image
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
