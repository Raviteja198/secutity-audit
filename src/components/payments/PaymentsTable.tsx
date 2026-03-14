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

  const [showAddModal, setShowAddModal] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

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
      alert(json?.error ?? "Failed");
      return;
    }

    setShowAddModal(false);
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
    <div className="space-y-4">

      {mode === "admin" && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            + Add Payment
          </button>
        </div>
      )}

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
                      <button
                        onClick={() => {
                          setSelectedPayment(p);
                          setShowReceiptModal(true);
                        }}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {p.receipt.receiptNumber}
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>

                  {mode === "admin" && (
                    <td className="px-3 py-2">
                      {p.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => record(p.id, "CASH")}
                            className="rounded border px-2 py-1 text-xs"
                          >
                            CASH
                          </button>

                          <button
                            onClick={() => record(p.id, "UPI")}
                            className="rounded border px-2 py-1 text-xs"
                          >
                            UPI
                          </button>

                          <button
                            onClick={() => record(p.id, "BANK")}
                            className="rounded border px-2 py-1 text-xs"
                          >
                            BANK
                          </button>
                        </div>
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

      <div className="flex items-center justify-between text-sm text-zinc-700">
        <div>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </div>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="rounded border px-3 py-1"
          >
            Prev
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border px-3 py-1"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl border bg-white p-4">
        <div>
          <div className="text-xs text-zinc-500">Monthly Collection</div>
          <div className="text-lg font-semibold text-zinc-500">{fmt(monthlyCollected)}</div>
        </div>

        <div>
          <div className="text-xs text-zinc-500">Total Collection Till Date</div>
          <div className="text-lg font-semibold text-zinc-500">{fmt(totalCollected)}</div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-4 text-zinc-900 shadow-xl">

            <h2 className="text-lg font-semibold">Add Payment</h2>

            <form onSubmit={addPayment} className="space-y-3">

              <div className="space-y-1">
                <label htmlFor="memberId" className="text-sm font-medium text-zinc-800">Select Member</label>
                <select
                  id="memberId"
                  name="memberId"
                  required
                  className="w-full rounded border px-3 py-2"
                >
                  <option value="">Select Member</option>

                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName}
                    </option>
                  ))}
                </select>
              </div>

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
                  className="w-full rounded border px-3 py-2"
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
                  className="w-full rounded border px-3 py-2"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="baseAmount" className="text-sm font-medium text-zinc-800">Contribution Amount</label>
                <input
                  id="baseAmount"
                  name="baseAmount"
                  type="number"
                  placeholder="Contribution Amount"
                  required
                  className="w-full rounded border px-3 py-2"
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
                  className="w-full rounded border px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-zinc-900 px-4 py-2 text-white"
                >
                  Save
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {showReceiptModal && selectedPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 space-y-4 text-zinc-900 shadow-xl">
            <h2 className="text-lg font-semibold">Receipt Details</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y border">
                <tbody className="divide-y bg-white text-sm">
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Receipt Number</td>
                    <td className="px-3 py-2">{selectedPayment.receipt?.receiptNumber}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Member</td>
                    <td className="px-3 py-2">{selectedPayment.member.fullName} ({selectedPayment.member.memberUid})</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Period</td>
                    <td className="px-3 py-2">{selectedPayment.month}/{selectedPayment.year}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Contribution</td>
                    <td className="px-3 py-2">{fmt(selectedPayment.baseAmountPaise)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Penalty</td>
                    <td className="px-3 py-2">{fmt(selectedPayment.penaltyAmountPaise)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Total Amount</td>
                    <td className="px-3 py-2 font-semibold">{fmt(selectedPayment.totalAmountPaise)}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Status</td>
                    <td className="px-3 py-2">{selectedPayment.status}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Payment Method</td>
                    <td className="px-3 py-2">{selectedPayment.paymentMethod || "-"}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium bg-zinc-50">Paid At</td>
                    <td className="px-3 py-2">{selectedPayment.paidAt ? new Date(selectedPayment.paidAt).toLocaleString() : "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReceiptModal(false)}
                className="rounded border px-4 py-2"
              >
                Close
              </button>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(`${base}/receipts/${selectedPayment.id}/pdf`);
                    if (!res.ok) {
                      const errorData = await res.json();
                      throw new Error(errorData?.error ?? 'Failed to download PDF');
                    }
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedPayment.receipt?.receiptNumber}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    alert('Failed to download PDF: ' + (error as Error).message);
                  }
                }}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}



