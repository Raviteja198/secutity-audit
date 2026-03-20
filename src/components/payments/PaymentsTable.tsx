"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

type Member = {
  id: string;
  fullName: string;
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
  const [addingPayment, setAddingPayment] = useState(false);
  const [addPaymentError, setAddPaymentError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );

  const load = useCallback(async () => {
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
  }, [base, page, pageSize]);

  useEffect(() => {
    void load();
  }, [load]);

  async function loadMembers() {
    const res = await fetch("/api/admin/members");
    const json = await res.json();

    if (res.ok) {
      setMembers(json.items || []);
    }
  }

  useEffect(() => {
    if (showAddModal) {
      loadMembers();
    }
  }, [showAddModal]);

  async function addPayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddPaymentError(null);
    setAddingPayment(true);

    try {
      const fd = new FormData(e.currentTarget);

      const data = {
        memberId: fd.get("memberId"),
        month: Number(fd.get("month")),
        year: Number(fd.get("year")),
        baseAmount: Number(fd.get("baseAmount")),
        penaltyAmount: Number(fd.get("penaltyAmount")),
      };

      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setAddPaymentError(json?.error ?? "Failed to add payment.");
        return;
      }

      setShowAddModal(false);
      await load();
    } finally {
      setAddingPayment(false);
    }
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

  async function deletePayment(id: string) {
    if (!confirm("Are you sure you want to delete this payment? This action cannot be undone.")) {
      return;
    }

    setDeleting(id);

    try {
      const res = await fetch(`${base}/payments/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json?.error ?? "Failed to delete payment");
        return;
      }

      await load();
    } finally {
      setDeleting(null);
    }
  }

  const monthlyCollected = useMemo(() => {
  const now = new Date();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();

  return items
    .filter(
      (p) =>
        p.month === m &&
        p.year === y &&
        (p.status === "PAID" || p.status === "LATE")
    )
    .reduce((sum, p) => sum + p.totalAmountPaise, 0);
}, [items]);

  const totalCollected = useMemo(() => {
  return items
    .filter((p) => p.status === "PAID" || p.status === "LATE")
    .reduce((sum, p) => sum + p.totalAmountPaise, 0);
}, [items]);

  return (
    <div className="space-y-3 sm:space-y-4">

      {mode === "admin" && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-lg bg-zinc-900 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800"
          >
            + Add Payment
          </button>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border text-zinc-900">
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
              {mode === "admin" && <th className="px-3 py-2">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y bg-white text-sm">

            {loading ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={8}>
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={8}>
                  No payments found
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2">
                    <div className="font-medium">{p.member.fullName}</div>
                    <div className="text-xs text-zinc-500">{p.member.memberUid}</div>
                  </td>

                  <td className="px-3 py-2">
                    {p.month}/{p.year}
                  </td>

                  <td className="px-3 py-2">{fmt(p.baseAmountPaise)}</td>

                  <td className="px-3 py-2">{fmt(p.penaltyAmountPaise)}</td>

                  <td className="px-3 py-2 font-medium">
                    {fmt(p.totalAmountPaise)}
                  </td>

                  <td className="px-3 py-2">{p.status}</td>

                  <td className="px-3 py-2">
                    {p.receipt ? (
                      <a
                        className="underline"
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

                  {mode === "admin" && (
                    <td className="px-3 py-2">
                      {p.status === "PENDING" ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => record(p.id, "CASH")}
                            className="rounded border px-2 py-1 text-xs hover:bg-zinc-50"
                          >
                            CASH
                          </button>

                          <button
                            onClick={() => record(p.id, "UPI")}
                            className="rounded border px-2 py-1 text-xs hover:bg-zinc-50"
                          >
                            UPI
                          </button>

                          <button
                            onClick={() => record(p.id, "BANK")}
                            className="rounded border px-2 py-1 text-xs hover:bg-zinc-50"
                          >
                            BANK
                          </button>

                          <button
                            onClick={() => deletePayment(p.id)}
                            disabled={deleting === p.id}
                            className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deleting === p.id ? "..." : "Delete"}
                          </button>
                        </div>
                      ) : p.status === "LATE" ? (
                        <button
                          onClick={() => deletePayment(p.id)}
                          disabled={deleting === p.id}
                          className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deleting === p.id ? "..." : "Delete"}
                        </button>
                      ) : (
                        <span className="text-xs text-zinc-500">
                          {p.paymentMethod}
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}

          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2">
        {loading ? (
          <div className="text-center text-sm text-zinc-600 py-4">Loading...</div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border bg-white p-4 text-center text-sm text-zinc-600">
            No payments found
          </div>
        ) : (
          items.map((p) => (
            <div key={p.id} className="rounded-lg border bg-white p-3 space-y-2">
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-zinc-900 truncate">{p.member.fullName}</div>
                  <div className="text-xs text-zinc-600">{p.member.memberUid}</div>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${p.status === "PAID" ? "bg-green-100 text-green-700" : p.status === "LATE" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {p.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-600">Period:</span>
                  <div className="font-semibold">{p.month}/{p.year}</div>
                </div>
                <div>
                  <span className="text-zinc-600">Total:</span>
                  <div className="font-semibold">{fmt(p.totalAmountPaise)}</div>
                </div>
                <div>
                  <span className="text-zinc-600">Contribution:</span>
                  <div className="font-semibold">{fmt(p.baseAmountPaise)}</div>
                </div>
                <div>
                  <span className="text-zinc-600">Penalty:</span>
                  <div className="font-semibold">{fmt(p.penaltyAmountPaise)}</div>
                </div>
              </div>

              {p.receipt && (
                <div className="text-xs pt-2 border-t">
                  <a
                    className="text-blue-600 underline"
                    href={`${base}/receipts/${p.id}/pdf`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Receipt: {p.receipt.receiptNumber}
                  </a>
                </div>
              )}

              {mode === "admin" && p.status === "PENDING" && (
                <div className="flex gap-2 pt-2 flex-wrap">
                  <button
                    onClick={() => record(p.id, "CASH")}
                    className="flex-1 min-w-0 rounded-lg border bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                  >
                    CASH
                  </button>

                  <button
                    onClick={() => record(p.id, "UPI")}
                    className="flex-1 min-w-0 rounded-lg border bg-purple-50 px-2 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100"
                  >
                    UPI
                  </button>

                  <button
                    onClick={() => record(p.id, "BANK")}
                    className="flex-1 min-w-0 rounded-lg border bg-green-50 px-2 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                  >
                    BANK
                  </button>

                  <button
                    onClick={() => deletePayment(p.id)}
                    disabled={deleting === p.id}
                    className="flex-1 min-w-0 rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deleting === p.id ? "..." : "Delete"}
                  </button>
                </div>
              )}

              {mode === "admin" && p.status === "LATE" && (
                <div className="pt-2">
                  <button
                    onClick={() => deletePayment(p.id)}
                    disabled={deleting === p.id}
                    className="w-full rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deleting === p.id ? "..." : "Delete"}
                  </button>
                </div>
              )}

              {mode === "admin" && p.status === "PAID" && (
                <div className="pt-2 text-xs text-zinc-500">
                  Recorded: {p.paymentMethod}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-700">
        <div>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </div>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="rounded border px-2 sm:px-3 py-1 text-xs sm:text-sm hover:bg-zinc-50 disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border px-2 sm:px-3 py-1 text-xs sm:text-sm hover:bg-zinc-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 rounded-lg sm:rounded-xl border bg-white p-3 sm:p-4">
        <div>
          <div className="text-xs text-zinc-500">Monthly Collection</div>
          <div className="text-base sm:text-lg font-semibold text-zinc-900 mt-1">{fmt(monthlyCollected)}</div>
        </div>

        <div>
          <div className="text-xs text-zinc-500">Total Collection Till Date</div>
          <div className="text-base sm:text-lg font-semibold text-zinc-900 mt-1">{fmt(totalCollected)}</div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="w-full max-w-md rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 space-y-4 text-zinc-900 shadow-xl max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-semibold">Add Payment</h2>

            <form onSubmit={addPayment} className="space-y-3">

              <div className="space-y-1">
                <label htmlFor="memberId" className="text-sm font-medium text-zinc-800">Select Member</label>
                <select
                  id="memberId"
                  name="memberId"
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="">Select Member</option>

                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor="month" className="text-sm font-medium text-zinc-800">Month</label>
                  <input
                    id="month"
                    name="month"
                    type="number"
                    min={1}
                    max={12}
                    placeholder="Month"
                    required
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="year" className="text-sm font-medium text-zinc-800">Year</label>
                  <input
                    id="year"
                    name="year"
                    type="number"
                    placeholder="Year"
                    required
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="baseAmount" className="text-sm font-medium text-zinc-800">Contribution Amount</label>
                <input
                  id="baseAmount"
                  name="baseAmount"
                  type="number"
                  placeholder="Contribution Amount"
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="penaltyAmount" className="text-sm font-medium text-zinc-800">Penalty Amount</label>
                <input
                  id="penaltyAmount"
                  name="penaltyAmount"
                  type="number"
                  placeholder="Penalty Amount"
                  defaultValue={0}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>

              {addPaymentError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {addPaymentError}
                </div>
              ) : null}

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={addingPayment}
                  className="rounded-lg border px-3 sm:px-4 py-2 text-sm hover:bg-zinc-50 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addingPayment}
                  className="rounded-lg bg-zinc-900 px-3 sm:px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 transition"
                >
                  {addingPayment ? "Saving..." : "Save"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}



