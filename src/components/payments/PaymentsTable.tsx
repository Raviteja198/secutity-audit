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

  const [showAddModal, setShowAddModal] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );

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
  }, [page]);

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

              <select
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

              <input
                name="month"
                type="number"
                min={1}
                max={12}
                placeholder="Month"
                required
                className="w-full rounded border px-3 py-2"
              />

              <input
                name="year"
                type="number"
                placeholder="Year"
                required
                className="w-full rounded border px-3 py-2"
              />

              <input
                name="baseAmount"
                type="number"
                placeholder="Contribution Amount"
                required
                className="w-full rounded border px-3 py-2"
              />

              <input
                name="penaltyAmount"
                type="number"
                placeholder="Penalty Amount"
                defaultValue={0}
                className="w-full rounded border px-3 py-2"
              />

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

    </div>
  );
}







// "use client";

// import { useEffect, useMemo, useState } from "react";

// type Payment = {
//   id: string;
//   month: number;
//   year: number;
//   baseAmountPaise: number;
//   penaltyAmountPaise: number;
//   totalAmountPaise: number;
//   status: "PAID" | "PENDING" | "LATE";
//   paymentMethod?: "CASH" | "UPI" | "BANK" | null;
//   paidAt?: string | null;
//   member: { id: string; memberUid: string; fullName: string };
//   receipt?: { receiptNumber: string } | null;
// };

// function fmt(paise: number) {
//   return `₹${(paise / 100).toFixed(2)}`;
// }

// export function PaymentsTable({ mode }: { mode: "admin" | "user" }) {
//   const base = mode === "admin" ? "/api/admin" : "/api/user";
//   const [items, setItems] = useState<Payment[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(20);
//   const [loading, setLoading] = useState(false);

//   const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

//   async function load() {
//     setLoading(true);
//     try {
//       const url = new URL(`${base}/payments`, window.location.origin);
//       url.searchParams.set("page", String(page));
//       url.searchParams.set("pageSize", String(pageSize));
//       const res = await fetch(url.toString(), { cache: "no-store" });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.error ?? "Failed");
//       setItems(json.items);
//       setTotal(json.total);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     void load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   async function generateForMonth(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     const month = Number(fd.get("month"));
//     const year = Number(fd.get("year"));
//     const res = await fetch(`${base}/payments/generate`, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ month, year }),
//     });
//     const json = await res.json();
//     if (!res.ok) return alert(json?.error ?? "Failed");
//     alert(`Generated/ensured ${json.createdOrExisting} payments.`);
//     (e.currentTarget as HTMLFormElement).reset();
//     setPage(1);
//     await load();
//   }

//   async function record(id: string, method: "CASH" | "UPI" | "BANK") {
//     const res = await fetch(`${base}/payments/${id}/record`, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ method }),
//     });
//     const json = await res.json();
//     if (!res.ok) return alert(json?.error ?? "Failed");
//     await load();
//   }

//    async function addPayment(data: any) {
//     const res = await fetch(`${base}/payments`, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const json = await res.json();

//     if (!res.ok) {
//       alert(json?.error ?? "Failed");
//       return;
//     }

//     await load();
//   }

//   return (
//     <div className="space-y-3">
//       {mode === "admin" && (
//   <div className="flex justify-end">
//     <button
//       onClick={() => openAddModal()}
//       className="rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
//     >
//       + Add Payment
//     </button>
//   </div>
// )}  
//       {mode === "admin" ? (
//         <details className="rounded-xl border bg-white p-3 text-zinc-900">
//           <summary className="cursor-pointer text-sm font-medium text-zinc-900">
//             Generate monthly payments
//           </summary>
//           <form onSubmit={generateForMonth} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3 text-zinc-900">
//             <input
//               name="month"
//               type="number"
//               min={1}
//               max={12}
//               placeholder="Month"
//               required
//               className="rounded-xl border px-3 py-2 text-sm text-zinc-900"
//             />
//             <input
//               name="year"
//               type="number"
//               min={2000}
//               max={3000}
//               placeholder="Year"
//               required
//               className="rounded-xl border px-3 py-2 text-sm text-zinc-900"
//             />
//             <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
//               Generate
//             </button>
//           </form>
//         </details>
//       ) : null}

//       <div className="overflow-x-auto rounded-xl border text-zinc-900">
//         <table className="min-w-full divide-y">
//           <thead className="bg-zinc-50">
//             <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
//               <th className="px-3 py-2">Member</th>
//               <th className="px-3 py-2">Period</th>
//               <th className="px-3 py-2">Contribution</th>
//               <th className="px-3 py-2">Penalty</th>
//               <th className="px-3 py-2">Total</th>
//               <th className="px-3 py-2">Status</th>
//               <th className="px-3 py-2">Receipt</th>
//               {mode === "admin" ? <th className="px-3 py-2">Actions</th> : null}
//             </tr>
//           </thead>
//           <tbody className="divide-y bg-white text-sm">
//             {loading ? (
//               <tr>
//                 <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 8 : 7}>
//                   Loading…
//                 </td>
//               </tr>
//             ) : items.length === 0 ? (
//               <tr>
//                 <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 8 : 7}>
//                   No payments found.
//                 </td>
//               </tr>
//             ) : (
//               items.map((p) => (
//                 <tr key={p.id}>
//                   <td className="px-3 py-2">
//                     <div className="font-medium text-zinc-900">{p.member.fullName}</div>
//                     <div className="text-xs text-zinc-600">{p.member.memberUid}</div>
//                   </td>
//                   <td className="px-3 py-2">
//                     {p.month}/{p.year}
//                   </td>
//                   <td className="px-3 py-2">{fmt(p.baseAmountPaise)}</td>
//                   <td className="px-3 py-2">{fmt(p.penaltyAmountPaise)}</td>
//                   <td className="px-3 py-2 font-medium">{fmt(p.totalAmountPaise)}</td>
//                   <td className="px-3 py-2">{p.status}</td>
//                   <td className="px-3 py-2">
//                     {p.receipt ? (
//                       <a
//                         className="text-sm font-medium text-zinc-900 underline"
//                         href={`${base}/receipts/${p.id}/pdf`}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         {p.receipt.receiptNumber}
//                       </a>
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                   {mode === "admin" ? (
//                     <td className="px-3 py-2">
//                       {p.status === "PENDING" ? (
//                         <div className="flex flex-wrap gap-2">
//                           <button
//                             onClick={() => void record(p.id, "CASH")}
//                             className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
//                           >
//                             Mark CASH
//                           </button>
//                           <button
//                             onClick={() => void record(p.id, "UPI")}
//                             className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
//                           >
//                             Mark UPI
//                           </button>
//                           <button
//                             onClick={() => void record(p.id, "BANK")}
//                             className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
//                           >
//                             Mark BANK
//                           </button>
//                         </div>
//                       ) : (
//                         <span className="text-xs text-zinc-600">
//                           {p.paymentMethod ?? "-"} {p.paidAt ? `(${new Date(p.paidAt).toLocaleDateString()})` : ""}
//                         </span>
//                       )}
//                     </td>
//                   ) : null}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between text-sm text-zinc-700">
//         <div>
//           Page <span className="font-medium">{page}</span> of{" "}
//           <span className="font-medium">{totalPages}</span> ({total} total)
//         </div>
//         <div className="flex gap-2">
//           <button
//             disabled={page <= 1}
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
//           >
//             Prev
//           </button>
//           <button
//             disabled={page >= totalPages}
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

