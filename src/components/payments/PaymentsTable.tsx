"use client";

import { useEffect, useMemo, useState } from "react";

type Payment = {
  id: string;
  month: number;
  year: number;
  baseAmountPaise: number;
  penaltyAmountPaise: number;
  totalAmountPaise: number;
  status: "PAID" | "PENDING" | "LATE";
  paymentMethod?: "CASH" | "UPI" | "BANK" | null;
  paidAt?: string | null;
  member: { id: string; memberUid: string; fullName: string };
  receipt?: { receiptNumber: string } | null;
};

function fmt(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function PaymentsTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin" : "/api/user";
  const [items, setItems] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  async function load() {
    setLoading(true);
    try {
      const url = new URL(`${base}/payments`, window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed");
      setItems(json.items);
      setTotal(json.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function generateForMonth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const month = Number(fd.get("month"));
    const year = Number(fd.get("year"));
    const res = await fetch(`${base}/payments/generate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ month, year }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    alert(`Generated/ensured ${json.createdOrExisting} payments.`);
    (e.currentTarget as HTMLFormElement).reset();
    setPage(1);
    await load();
  }

  async function record(id: string, method: "CASH" | "UPI" | "BANK") {
    const res = await fetch(`${base}/payments/${id}/record`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ method }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    await load();
  }

  return (
    <div className="space-y-3">
      {mode === "admin" ? (
        <details className="rounded-xl border bg-white p-3 text-zinc-900">
          <summary className="cursor-pointer text-sm font-medium text-zinc-900">
            Generate monthly payments
          </summary>
          <form onSubmit={generateForMonth} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3 text-zinc-900">
            <input
              name="month"
              type="number"
              min={1}
              max={12}
              placeholder="Month"
              required
              className="rounded-xl border px-3 py-2 text-sm text-zinc-900"
            />
            <input
              name="year"
              type="number"
              min={2000}
              max={3000}
              placeholder="Year"
              required
              className="rounded-xl border px-3 py-2 text-sm text-zinc-900"
            />
            <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              Generate
            </button>
          </form>
        </details>
      ) : null}

      <div className="overflow-x-auto rounded-xl border text-zinc-900">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Member</th>
              <th className="px-3 py-2">Period</th>
              <th className="px-3 py-2">Contribution</th>
              <th className="px-3 py-2">Penalty</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Receipt</th>
              {mode === "admin" ? <th className="px-3 py-2">Actions</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {loading ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 8 : 7}>
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 8 : 7}>
                  No payments found.
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2">
                    <div className="font-medium text-zinc-900">{p.member.fullName}</div>
                    <div className="text-xs text-zinc-600">{p.member.memberUid}</div>
                  </td>
                  <td className="px-3 py-2">
                    {p.month}/{p.year}
                  </td>
                  <td className="px-3 py-2">{fmt(p.baseAmountPaise)}</td>
                  <td className="px-3 py-2">{fmt(p.penaltyAmountPaise)}</td>
                  <td className="px-3 py-2 font-medium">{fmt(p.totalAmountPaise)}</td>
                  <td className="px-3 py-2">{p.status}</td>
                  <td className="px-3 py-2">
                    {p.receipt ? (
                      <a
                        className="text-sm font-medium text-zinc-900 underline"
                        href={`${base}/receipts/${p.id}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {p.receipt.receiptNumber}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  {mode === "admin" ? (
                    <td className="px-3 py-2">
                      {p.status === "PENDING" ? (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => void record(p.id, "CASH")}
                            className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
                          >
                            Mark CASH
                          </button>
                          <button
                            onClick={() => void record(p.id, "UPI")}
                            className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
                          >
                            Mark UPI
                          </button>
                          <button
                            onClick={() => void record(p.id, "BANK")}
                            className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
                          >
                            Mark BANK
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-600">
                          {p.paymentMethod ?? "-"} {p.paidAt ? `(${new Date(p.paidAt).toLocaleDateString()})` : ""}
                        </span>
                      )}
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-700">
        <div>
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span> ({total} total)
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

