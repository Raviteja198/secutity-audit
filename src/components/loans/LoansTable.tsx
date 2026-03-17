"use client";

import { useEffect, useState } from "react";

type Loan = {
  id: string;
  principalPaise: number;
  remainingPaise: number;
  monthlyRateBps: number;
  durationMonths: number;
  startDate: string;
  status: "PENDING_APPROVAL" | "ACTIVE" | "CLOSED" | "DEFAULTED";
  member: { id: string; memberUid: string; fullName: string };
};

type LoanWithDetails = Loan & {
  installments?: {
    id: string;
    dueDate: string;
    interestDuePaise: number;
    principalDuePaise: number;
    amountPaidPaise: number;
  }[];
};

type LoanRepayment = {
  id: string;
  amountPaise: number;
  paidAt: string;
  recordedBy: { name: string };
};

function fmt(paise: number) {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function LoansTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/loans" : "/api/user/loans";
  const [items, setItems] = useState<Loan[]>([]);
  const [members, setMembers] = useState<{ id: string; memberUid: string; fullName: string }[]>([]);
  const [repayingLoan, setRepayingLoan] = useState<Loan | null>(null);
  const [loanDetails, setLoanDetails] = useState<LoanWithDetails | null>(null);
  const [historyLoan, setHistoryLoan] = useState<Loan | null>(null);
  const [repayments, setRepayments] = useState<LoanRepayment[]>([]);
  const [creatingLoan, setCreatingLoan] = useState(false);
  const [createLoanError, setCreateLoanError] = useState<string | null>(null);

  async function load() {
    const res = await fetch(base, { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
  }

  async function loadMembers() {
    const res = await fetch("/api/admin/members", { cache: "no-store" });
    const json = await res.json();
    setMembers(json.items ?? []);
  }

  async function loadRepayments(loanId: string) {
    const apiBase = mode === "admin" ? "/api/admin" : "/api/user";
    const res = await fetch(`${apiBase}/loans/${loanId}/repayments`, { cache: "no-store" });
    const json = await res.json();
    setRepayments(json.repayments ?? []);
  }

  useEffect(() => {
    void load();
    if (mode === "admin") {
      void loadMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateLoanError(null);
    setCreatingLoan(true);
    try {
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
      if (!res.ok) {
        setCreateLoanError(json?.error ?? "Failed to create loan.");
        return;
      }
      (e.currentTarget as HTMLFormElement).reset();
      (e.currentTarget.closest("details") as HTMLDetailsElement).open = false;
      await load();
    } finally {
      setCreatingLoan(false);
    }
  }

  async function approve(id: string) {
    const res = await fetch(`/api/admin/loans/${id}/approve`, { method: "POST" });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    await load();
  }

  async function startRepay(loan: Loan) {
    setRepayingLoan(loan);
    // Fetch loan details with installments
    const apiBase = mode === "admin" ? "/api/admin" : "/api/user";
    const res = await fetch(`${apiBase}/loans/${loan.id}/details`, { cache: "no-store" });
    const json = await res.json();
    setLoanDetails(json.loan ?? null);
  }

  async function showHistory(loan: Loan) {
    setHistoryLoan(loan);
    await loadRepayments(loan.id);
  }

  async function repay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!repayingLoan) return;
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get("amount") ?? 0);
    const res = await fetch(`/api/admin/loans/${repayingLoan.id}/repay`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amountPaise: Math.round(amount * 100) }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json?.error ?? "Failed");
    setRepayingLoan(null);
    setLoanDetails(null);
    await load();
  }

  return (
    <div className="space-y-3 w-full h-full min-h-screen flex flex-col overflow-hidden">
      {mode === "admin" ? (
        <details className="rounded-lg sm:rounded-xl border bg-white p-2 sm:p-3">
          <summary className="cursor-pointer text-sm font-medium text-zinc-900">Create loan</summary>
          <form onSubmit={create} className="mt-3 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="loanMember" className="text-xs sm:text-sm font-medium text-zinc-800">Select Member</label>
              <select id="loanMember" name="memberId" required className="rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full">
                <option value="">Select Member</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} ({m.memberUid})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="loanPrincipal" className="text-xs sm:text-sm font-medium text-zinc-800">Principal (₹)</label>
              <input id="loanPrincipal" name="principal" type="number" step="0.01" placeholder="Principal (₹)" required className="rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full" />
            </div>
            <div className="space-y-1">
              <label htmlFor="loanRate" className="text-xs sm:text-sm font-medium text-zinc-800">Monthly Rate (%)</label>
              <input id="loanRate" name="ratePercent" type="number" step="0.01" placeholder="Monthly rate (%)" required className="rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full" />
            </div>
            <div className="space-y-1">
              <label htmlFor="loanDuration" className="text-xs sm:text-sm font-medium text-zinc-800">Duration (Months)</label>
              <input id="loanDuration" name="durationMonths" type="number" min={2} max={240} placeholder="Duration (months)" required className="rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full" />
            </div>
            <div className="space-y-1">
              <label htmlFor="loanStartDate" className="text-xs sm:text-sm font-medium text-zinc-800">Start Date</label>
              <input id="loanStartDate" name="startDate" type="date" required className="rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-full" />
            </div>
            <button
              type="submit"
              disabled={creatingLoan}
              className="rounded-lg bg-zinc-900 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 md:col-span-3 transition"
            >
              {creatingLoan ? "Creating..." : "Create"}
            </button>
            {createLoanError ? (
              <div className="md:col-span-3 rounded-lg border border-red-200 bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-red-700">
                {createLoanError}
              </div>
            ) : null}
            <div className="md:col-span-3 text-xs text-zinc-600">
              Note: Loans require admin approval before becoming active.
            </div>
          </form>
        </details>
      ) : null}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border flex-1 overflow-y-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Member</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Rate</th>
              <th className="px-3 py-2">Duration</th>
              <th className="px-3 py-2">Start</th>
              <th className="px-3 py-2">Status</th>
              {mode === "admin" ? <th className="px-3 py-2">Actions</th> : null}
              <th className="px-3 py-2">History</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {items.map((l) => (
              <tr key={l.id}>
                <td className="px-3 py-2">
                  <div className="font-medium text-zinc-900">{l.member.fullName}</div>
                  <div className="text-xs text-zinc-600">{l.member.memberUid}</div>
                </td>
                <td className="px-3 py-2">{fmt(l.status === "ACTIVE" ? l.remainingPaise : l.principalPaise)}</td>
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
                    ) : l.status === "ACTIVE" ? (
                      <button
                        onClick={() => void startRepay(l)}
                        className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
                      >
                        Repay
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                ) : null}
                <td className="px-3 py-2">
                  <button
                    onClick={() => void showHistory(l)}
                    className="rounded-lg border px-2 py-1 text-xs hover:bg-zinc-50"
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={mode === "admin" ? 8 : 7}>
                  No loans yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex-1 overflow-y-auto space-y-2">
        {items.length === 0 ? (
          <div className="rounded-lg border bg-white p-4 text-center text-sm text-zinc-600">
            No loans yet.
          </div>
        ) : (
          items.map((l) => (
            <div key={l.id} className="rounded-lg border bg-white p-3 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-zinc-900 truncate">{l.member.fullName}</div>
                  <div className="text-xs text-zinc-600">{l.member.memberUid}</div>
                </div>
                <div className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 whitespace-nowrap">
                  {l.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-zinc-600">Amount:</span>
                  <div className="font-semibold text-zinc-900">{fmt(l.status === "ACTIVE" ? l.remainingPaise : l.principalPaise)}</div>
                </div>
                <div>
                  <span className="text-zinc-600">Rate:</span>
                  <div className="font-semibold text-zinc-900">{(l.monthlyRateBps / 100).toFixed(2)}%</div>
                </div>
                <div>
                  <span className="text-zinc-600">Duration:</span>
                  <div className="font-semibold text-zinc-900">{l.durationMonths}M</div>
                </div>
                <div>
                  <span className="text-zinc-600">Start:</span>
                  <div className="font-semibold text-zinc-900">{new Date(l.startDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 flex-wrap">
                {mode === "admin" && l.status === "PENDING_APPROVAL" && (
                  <button
                    onClick={() => void approve(l.id)}
                    className="flex-1 min-w-0 rounded-lg border border-green-300 bg-green-50 px-2 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                  >
                    Approve
                  </button>
                )}
                {mode === "admin" && l.status === "ACTIVE" && (
                  <button
                    onClick={() => void startRepay(l)}
                    className="flex-1 min-w-0 rounded-lg border border-blue-300 bg-blue-50 px-2 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                  >
                    Repay
                  </button>
                )}
                <button
                  onClick={() => void showHistory(l)}
                  className="flex-1 min-w-0 rounded-lg border bg-zinc-50 px-2 py-1.5 text-xs font-medium hover:bg-zinc-100"
                >
                  History
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {historyLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="w-full max-w-2xl rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 space-y-4 text-zinc-900 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">Repayment History</h2>
            <p className="text-sm text-zinc-600">
              Loan for {historyLoan.member.fullName} ({historyLoan.member.memberUid})
            </p>
            {repayments.length === 0 ? (
              <p className="text-sm text-zinc-600">No repayments recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {repayments.map((r) => (
                  <div key={r.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-zinc-50 rounded-lg gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base">{fmt(r.amountPaise)}</div>
                      <div className="text-xs text-zinc-600">
                        Paid on {new Date(r.paidAt).toLocaleDateString()} at {new Date(r.paidAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-600 whitespace-nowrap">By {r.recordedBy.name}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setHistoryLoan(null)}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-zinc-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {repayingLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="w-full max-w-lg rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 space-y-4 text-zinc-900 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold">Record Loan Repayment</h2>
            <div className="space-y-3">
              <div className="p-3 bg-zinc-50 rounded-lg">
                <div className="text-sm font-medium">Loan Details</div>
                <div className="text-xs sm:text-sm text-zinc-600 space-y-1 mt-2">
                  <div>Member: {repayingLoan.member.fullName} ({repayingLoan.member.memberUid})</div>
                  <div>Principal: {fmt(repayingLoan.principalPaise)}</div>
                  <div>Rate: {(repayingLoan.monthlyRateBps / 100).toFixed(2)}%</div>
                  <div>Duration: {repayingLoan.durationMonths} months</div>
                  <div>Start Date: {new Date(repayingLoan.startDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900">Current Status (as of {new Date().toLocaleDateString()})</div>
                <div className="text-lg font-semibold text-blue-900 mt-1">
                  Outstanding Balance: {fmt(repayingLoan.remainingPaise)}
                </div>
                <div className="text-xs text-blue-700 mt-1">
                  This is the total amount needed to fully repay the loan today, including all accrued interest.
                </div>
              </div>

              {loanDetails?.installments && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-900">Next Payment Due</div>
                  {(() => {
                    const today = new Date();
                    const nextInstallment = loanDetails.installments.find(inst =>
                      new Date(inst.dueDate) > today && inst.amountPaidPaise < (inst.interestDuePaise + inst.principalDuePaise)
                    );
                    if (nextInstallment) {
                      const dueAmount = nextInstallment.interestDuePaise + nextInstallment.principalDuePaise - nextInstallment.amountPaidPaise;
                      return (
                        <div className="mt-2 space-y-1 text-xs sm:text-sm">
                          <div className="text-lg font-semibold text-green-900">
                            {fmt(dueAmount)}
                          </div>
                          <div className="text-xs text-green-700">
                            Due on {new Date(nextInstallment.dueDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-green-700">
                            Interest: {fmt(nextInstallment.interestDuePaise)}, Principal: {fmt(nextInstallment.principalDuePaise)}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-xs sm:text-sm text-green-700 mt-2">
                          No upcoming payments - loan may be fully paid or overdue.
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
            </div>

            <form onSubmit={repay} className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="repayAmount" className="text-sm font-medium text-zinc-800">Repayment Amount (₹)</label>
                <input
                  id="repayAmount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  required
                  className="w-full rounded border px-3 py-2 text-sm"
                />
                <div className="text-xs text-zinc-600">
                  Enter the amount the member is paying today.
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRepayingLoan(null);
                    setLoanDetails(null);
                  }}
                  className="flex-1 rounded-lg border px-3 py-2 text-sm hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                  Record Repayment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

