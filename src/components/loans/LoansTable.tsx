"use client";

import { useEffect, useState } from "react";
import { type FieldErrors } from "@/lib/validators/client";

type Loan = {
  id: string;
  principalPaise: number;
  outstandingPrincipalPaise: number;
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
    overdueInterestPaise: number;
  }[];
};

type LoanRepayment = {
  id: string;
  amountPaise: number;
  paidAt: string;
  recordedBy: { name: string };
};

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

function GlassInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <>
      <input {...props} className={["glass-input", error ? "!border-red-500/50 focus:!ring-red-500/20" : "", props.className ?? ""].join(" ")} />
      {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
    </>
  );
}

function validateLoanCreate(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  if (!fd.get("memberId")) errs.memberId = "Please select a member.";
  const principal = Number(fd.get("principal"));
  if (!fd.get("principal") || isNaN(principal) || principal <= 0) errs.principal = "Principal must be greater than 0.";
  const rate = Number(fd.get("ratePercent"));
  if (!fd.get("ratePercent") || isNaN(rate) || rate <= 0) errs.ratePercent = "Rate must be greater than 0.";
  else if (rate > 100) errs.ratePercent = "Rate cannot exceed 100%.";
  const duration = Number(fd.get("durationMonths"));
  if (!fd.get("durationMonths") || isNaN(duration) || duration < 2) errs.durationMonths = "Duration must be at least 2 months.";
  else if (duration > 240) errs.durationMonths = "Duration cannot exceed 240 months.";
  if (!fd.get("startDate")) errs.startDate = "Start date is required.";
  return errs;
}

function validateRepay(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  const amount = Number(fd.get("amount"));
  if (!fd.get("amount") || isNaN(amount) || amount <= 0) errs.amount = "Repayment amount must be greater than 0.";
  return errs;
}

function LoanStatusBadge({ status }: { status: Loan["status"] }) {
  const styles: Record<Loan["status"], string> = {
    PENDING_APPROVAL: "badge-pending",
    ACTIVE: "badge-active",
    CLOSED: "badge-inactive",
    DEFAULTED: "badge-late",
  };
  const labels: Record<Loan["status"], string> = {
    PENDING_APPROVAL: "Pending",
    ACTIVE: "Active",
    CLOSED: "Closed",
    DEFAULTED: "Defaulted",
  };
  return <span className={styles[status]}>{labels[status]}</span>;
}

/** Waste-bin icon only (no “Delete” label). OTP flow opens from click when allowed. */
function LoanBinButton({
  onClick,
  disabled,
  busy,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  busy?: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      title={title}
      aria-label={disabled ? title : "Delete loan"}
      className="inline-flex items-center justify-center rounded-xl p-2 transition disabled:opacity-30 disabled:pointer-events-none hover:bg-red-500/15"
      style={{ border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5" }}
    >
      {busy ? (
        <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" aria-hidden />
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
}

export function LoansTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/loans" : "/api/user/loans";
  const [items, setItems] = useState<Loan[]>([]);
  const [members, setMembers] = useState<{ id: string; memberUid: string; fullName: string }[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creatingLoan, setCreatingLoan] = useState(false);
  const [createLoanError, setCreateLoanError] = useState<string | null>(null);
  const [createFieldErrors, setCreateFieldErrors] = useState<FieldErrors>({});
  const [repayingLoan, setRepayingLoan] = useState<Loan | null>(null);
  const [repayError, setRepayError] = useState<string | null>(null);
  const [repayFieldErrors, setRepayFieldErrors] = useState<FieldErrors>({});
  const [loanDetails, setLoanDetails] = useState<LoanWithDetails | null>(null);
  const [historyLoan, setHistoryLoan] = useState<Loan | null>(null);
  const [repayments, setRepayments] = useState<LoanRepayment[]>([]);
  const [waivePenalty, setWaivePenalty] = useState(false);
  const [loanPendingDelete, setLoanPendingDelete] = useState<Loan | null>(null);
  const [deleteOtpStep, setDeleteOtpStep] = useState<"prompt" | "otp">("prompt");
  const [deleteFlowError, setDeleteFlowError] = useState<string | null>(null);
  const [deleteFlowBusy, setDeleteFlowBusy] = useState(false);
  const [deleteExpiresAt, setDeleteExpiresAt] = useState<string | null>(null);
  const [deleteSendInfo, setDeleteSendInfo] = useState<{ sent: number; failed?: { email: string; message: string }[] } | null>(null);

  async function load() {
    const res = await fetch(base, { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
  }

  useEffect(() => {
    void load();
    if (mode === "admin") {
      fetch("/api/admin/members", { cache: "no-store" })
        .then((r) => r.json())
        .then((json) => setMembers(json.items ?? []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateLoanError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const errs = validateLoanCreate(fd);
    setCreateFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCreatingLoan(true);
    try {
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
      if (!res.ok) { setCreateLoanError(json?.error ?? "Failed to create loan."); return; }
      form.reset();
      setCreateFieldErrors({});
      setShowCreate(false);
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

  function openDeleteLoanModal(loan: Loan) {
    setLoanPendingDelete(loan);
    setDeleteOtpStep("prompt");
    setDeleteFlowError(null);
    setDeleteExpiresAt(null);
    setDeleteSendInfo(null);
  }

  function closeDeleteLoanModal() {
    setLoanPendingDelete(null);
    setDeleteOtpStep("prompt");
    setDeleteFlowError(null);
    setDeleteExpiresAt(null);
    setDeleteFlowBusy(false);
    setDeleteSendInfo(null);
  }

  function deleteLoan(id: string) {
    const loan = items.find((x) => x.id === id);
    if (!loan) return;
    openDeleteLoanModal(loan);
  }

  async function sendLoanDeleteOtp() {
    if (!loanPendingDelete) return;
    setDeleteFlowBusy(true);
    setDeleteFlowError(null);
    try {
      const res = await fetch(`/api/admin/loans/${loanPendingDelete.id}/delete/request`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setDeleteFlowError(typeof json?.error === "string" ? json.error : "Failed to send verification email.");
        return;
      }
      setDeleteOtpStep("otp");
      setDeleteExpiresAt(json.expiresAt ?? null);
      setDeleteSendInfo({
        sent: typeof json.sent === "number" ? json.sent : 0,
        failed: Array.isArray(json.failed) ? json.failed : undefined,
      });
    } finally {
      setDeleteFlowBusy(false);
    }
  }

  async function confirmLoanDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!loanPendingDelete) return;
    const fd = new FormData(e.currentTarget);
    const otp = String(fd.get("otp") ?? "").trim().toUpperCase();
    if (!otp) {
      setDeleteFlowError("Enter the verification code from the email.");
      return;
    }
    setDeleteFlowBusy(true);
    setDeleteFlowError(null);
    try {
      const res = await fetch(`/api/admin/loans/${loanPendingDelete.id}/delete/confirm`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const json = await res.json();
      if (!res.ok) {
        setDeleteFlowError(typeof json?.error === "string" ? json.error : "Could not delete loan.");
        return;
      }
      closeDeleteLoanModal();
      await load();
    } finally {
      setDeleteFlowBusy(false);
    }
  }

  async function startRepay(loan: Loan) {
    setRepayingLoan(loan);
    setWaivePenalty(false);
    const apiBase = mode === "admin" ? "/api/admin" : "/api/user";
    const res = await fetch(`${apiBase}/loans/${loan.id}/details`, { cache: "no-store" });
    const json = await res.json();
    setLoanDetails(json.loan ?? null);
  }

  async function showHistory(loan: Loan) {
    setHistoryLoan(loan);
    const apiBase = mode === "admin" ? "/api/admin" : "/api/user";
    const res = await fetch(`${apiBase}/loans/${loan.id}/repayments`, { cache: "no-store" });
    const json = await res.json();
    setRepayments(json.repayments ?? []);
  }

  async function repay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!repayingLoan) return;
    setRepayError(null);
    const fd = new FormData(e.currentTarget);

    const errs = validateRepay(fd);
    setRepayFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch(`/api/admin/loans/${repayingLoan.id}/repay`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ 
        amountPaise: Math.round(Number(fd.get("amount") ?? 0) * 100),
        waivePenalty,
      }),
    });
    const json = await res.json();
    if (!res.ok) { setRepayError(json?.error ?? "Failed to record repayment."); return; }
    setRepayingLoan(null);
    setLoanDetails(null);
    setRepayFieldErrors({});
    setWaivePenalty(false);
    await load();
  }

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Finance</p>
          <h2 className="text-lg font-bold text-white/90">Loans</h2>
        </div>
        {mode === "admin" && (
          <button onClick={() => setShowCreate(!showCreate)} className="btn-gradient text-xs px-3 py-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Create Loan
          </button>
        )}
      </div>

      {/* Create Form */}
      {showCreate && mode === "admin" && (
        <div className="rounded-2xl p-5 space-y-4"
             style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <h3 className="text-sm font-semibold text-white/80">New Loan Application</h3>
          <form onSubmit={create} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Member *</label>
              <select
                name="memberId"
                className={["glass-input", createFieldErrors.memberId ? "!border-red-500/50" : ""].join(" ")}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, memberId: "" }))}
              >
                <option value="">Select member…</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.fullName} ({m.memberUid})</option>
                ))}
              </select>
              {createFieldErrors.memberId && <p className="text-xs text-red-400 mt-1 ml-1">{createFieldErrors.memberId}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Principal (₹) *</label>
              <GlassInput
                name="principal"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="10000"
                error={createFieldErrors.principal}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, principal: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Monthly Rate (%) *</label>
              <GlassInput
                name="ratePercent"
                type="number"
                step="0.01"
                min="0.01"
                max="100"
                placeholder="2.00"
                error={createFieldErrors.ratePercent}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, ratePercent: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Duration (months) *</label>
              <GlassInput
                name="durationMonths"
                type="number"
                min={2}
                max={240}
                placeholder="12"
                error={createFieldErrors.durationMonths}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, durationMonths: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Start Date *</label>
              <GlassInput
                name="startDate"
                type="date"
                error={createFieldErrors.startDate}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, startDate: "" }))}
              />
            </div>
            {createLoanError && (
              <div className="sm:col-span-2 lg:col-span-3 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <p className="text-xs text-red-400">{createLoanError}</p>
              </div>
            )}
            <div className="sm:col-span-2 lg:col-span-3 flex gap-2 pt-1">
              <button type="submit" disabled={creatingLoan} className="btn-gradient text-xs px-4 py-2">
                {creatingLoan ? "Creating…" : "Submit Loan"}
              </button>
              <button type="button" onClick={() => { setShowCreate(false); setCreateFieldErrors({}); setCreateLoanError(null); }} className="btn-ghost text-xs px-4 py-2">
                Cancel
              </button>
              <p className="text-xs text-white/30 self-center ml-2">Loans require admin approval before activation.</p>
            </div>
          </form>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl"
           style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <table className="glass-table min-w-full">
          <thead>
            <tr>
              <th>Member</th>
              <th>Amount</th>
              <th>Rate</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
              {mode === "admin" && <th>Actions</th>}
              <th>History</th>
              {mode === "admin" && (
                <th className="w-14 text-right pr-3">
                  <span className="sr-only">Delete</span>
                  <svg className="w-4 h-4 inline-block text-white/35" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="clarity-mask">
            {items.length === 0 ? (
              <tr>
                <td colSpan={mode === "admin" ? 9 : 7} className="text-center py-10">
                  <p className="text-white/30 text-sm">No loans yet</p>
                </td>
              </tr>
            ) : items.map((l) => (
              <tr key={l.id}>
                <td>
                  <div className="font-medium text-white/90 text-sm">{l.member.fullName}</div>
                  <div className="text-xs text-white/35">{l.member.memberUid}</div>
                </td>
                <td className="font-semibold text-white/80">{fmt(l.status === "ACTIVE" ? l.outstandingPrincipalPaise : l.principalPaise)}</td>
                <td className="text-white/60">{(l.monthlyRateBps / 100).toFixed(2)}%</td>
                <td className="text-white/60">{l.durationMonths}m</td>
                <td className="text-white/60">{new Date(l.startDate).toLocaleDateString()}</td>
                <td><LoanStatusBadge status={l.status} /></td>
                {mode === "admin" && (
                  <td className="align-middle">
                    <div className="flex flex-wrap gap-1.5">
                      {l.status === "PENDING_APPROVAL" && (
                        <button onClick={() => void approve(l.id)}
                                className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                                style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.2)" }}>
                          Approve
                        </button>
                      )}
                      {l.status === "ACTIVE" && (
                        <button onClick={() => void startRepay(l)}
                                className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                                style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.2)" }}>
                          Repay
                        </button>
                      )}
                      {(l.status === "CLOSED" || l.status === "DEFAULTED") && (
                        <span className="text-xs text-white/25">—</span>
                      )}
                    </div>
                  </td>
                )}
                <td className="align-middle">
                  <button onClick={() => void showHistory(l)}
                          className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    History
                  </button>
                </td>
                {mode === "admin" && (
                  <td className="text-right align-middle pr-1">
                    <LoanBinButton
                      onClick={() => deleteLoan(l.id)}
                      busy={deleteFlowBusy && loanPendingDelete?.id === l.id}
                      title="Delete loan — fund ledger and repayment history are reversed (email code required)"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {items.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
            <p className="text-white/30 text-sm">No loans yet</p>
          </div>
        ) : items.map((l) => (
          <div key={l.id} className="rounded-2xl p-4 space-y-3"
               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-white/90">{l.member.fullName}</div>
                <div className="text-xs text-white/35 mt-0.5">{l.member.memberUid}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {mode === "admin" && (
                  <LoanBinButton
                    onClick={() => deleteLoan(l.id)}
                    busy={deleteFlowBusy && loanPendingDelete?.id === l.id}
                    title="Delete loan — fund ledger and repayment history are reversed (email code required)"
                  />
                )}
                <LoanStatusBadge status={l.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/35">Amount</span>
                <div className="font-semibold text-white/80 mt-0.5">{fmt(l.status === "ACTIVE" ? l.outstandingPrincipalPaise : l.principalPaise)}</div>
              </div>
              <div>
                <span className="text-white/35">Rate</span>
                <div className="text-white/70 mt-0.5">{(l.monthlyRateBps / 100).toFixed(2)}%/m</div>
              </div>
              <div>
                <span className="text-white/35">Duration</span>
                <div className="text-white/70 mt-0.5">{l.durationMonths} months</div>
              </div>
              <div>
                <span className="text-white/35">Start</span>
                <div className="text-white/70 mt-0.5">{new Date(l.startDate).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap pt-1 border-t border-white/5">
              {mode === "admin" && l.status === "PENDING_APPROVAL" && (
                <button onClick={() => void approve(l.id)}
                        className="flex-1 rounded-xl py-1.5 text-xs font-medium"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.18)" }}>
                  Approve
                </button>
              )}
              {mode === "admin" && l.status === "ACTIVE" && (
                <button onClick={() => void startRepay(l)}
                        className="flex-1 rounded-xl py-1.5 text-xs font-medium"
                        style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.18)" }}>
                  Repay
                </button>
              )}
              <button onClick={() => void showHistory(l)}
                      className="flex-1 rounded-xl py-1.5 text-xs font-medium"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                History
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Repayment History Modal */}
      {historyLoan && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-xl w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white/90">Repayment History</h2>
                <p className="text-xs text-white/40 mt-0.5">{historyLoan.member.fullName} · {historyLoan.member.memberUid}</p>
              </div>
              <button onClick={() => setHistoryLoan(null)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            {repayments.length === 0 ? (
              <p className="text-sm text-white/30 text-center py-8">No repayments recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {repayments.map((r) => (
                  <div key={r.id} className="flex justify-between items-center rounded-xl px-4 py-3"
                       style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div>
                      <div className="font-semibold text-sm text-white/90">{fmt(r.amountPaise)}</div>
                      <div className="text-xs text-white/35 mt-0.5">
                        {new Date(r.paidAt).toLocaleDateString()} at {new Date(r.paidAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-xs text-white/35">By {r.recordedBy.name}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end pt-4">
              <button onClick={() => setHistoryLoan(null)} className="btn-ghost text-sm px-4 py-2">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete loan — OTP emailed to all admins (10 min) */}
      {loanPendingDelete && mode === "admin" && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white/90">Delete loan</h2>
              <button type="button" onClick={closeDeleteLoanModal} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="rounded-xl p-4 mb-4 space-y-1.5"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs text-white/40 font-medium uppercase tracking-wide mb-2">Loan</p>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Member</span>
                <span className="text-white/80">{loanPendingDelete.member.fullName} ({loanPendingDelete.member.memberUid})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Principal</span>
                <span className="text-white/80">{fmt(loanPendingDelete.principalPaise)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Status</span>
                <span><LoanStatusBadge status={loanPendingDelete.status} /></span>
              </div>
            </div>

            {deleteOtpStep === "prompt" ? (
              <div className="space-y-4">
                <div className="rounded-xl p-4"
                     style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <p className="text-sm text-white/75 leading-relaxed">
                    To confirm deletion, we will email a <strong className="text-red-200">one-time verification code</strong> to{" "}
                    <strong className="text-white/90">every active admin</strong>. The code{" "}
                    <strong className="text-white/90">expires in 10 minutes</strong>. Enter that code on the next step to permanently delete this loan.
                    {" "}
                    All repayment records and fund ledger entries for this loan (including interest) are removed and the cash balance is adjusted accordingly.
                  </p>
                </div>
                {deleteFlowError && (
                  <p className="text-xs text-red-400">{deleteFlowError}</p>
                )}
                <div className="flex gap-2">
                  <button type="button" onClick={() => void sendLoanDeleteOtp()} disabled={deleteFlowBusy}
                          className="flex-1 btn-gradient py-2.5 text-sm disabled:opacity-50">
                    {deleteFlowBusy ? "Sending…" : "Send code to admins"}
                  </button>
                  <button type="button" onClick={closeDeleteLoanModal} className="flex-1 btn-ghost py-2.5 text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <form onSubmit={confirmLoanDelete} className="space-y-4">
                <p className="text-xs text-white/45">
                  Check the inbox of any admin account. Enter the code below.
                  {deleteExpiresAt && (
                    <span className="block mt-1 text-amber-200/80">
                      Expires: {new Date(deleteExpiresAt).toLocaleString()}
                    </span>
                  )}
                </p>
                {deleteSendInfo && deleteSendInfo.sent > 0 && (
                  <p className="text-xs text-emerald-300/90">
                    Code sent to {deleteSendInfo.sent} admin email(s).
                    {deleteSendInfo.failed && deleteSendInfo.failed.length > 0 && (
                      <span className="block text-amber-200/80 mt-1">
                        Could not reach: {deleteSendInfo.failed.map((f) => f.email).join(", ")}
                      </span>
                    )}
                  </p>
                )}
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Verification code *</label>
                  <GlassInput name="otp" autoComplete="one-time-code" placeholder="e.g. A1B2C3D4" className="font-mono tracking-widest uppercase" />
                </div>
                {deleteFlowError && (
                  <p className="text-xs text-red-400">{deleteFlowError}</p>
                )}
                <div className="flex flex-col gap-2">
                  <button type="submit" disabled={deleteFlowBusy} className="w-full btn-gradient py-2.5 text-sm disabled:opacity-50">
                    {deleteFlowBusy ? "Deleting…" : "Confirm delete"}
                  </button>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => void sendLoanDeleteOtp()} disabled={deleteFlowBusy}
                            className="flex-1 btn-ghost py-2 text-xs">Resend code</button>
                    <button type="button" onClick={() => { setDeleteOtpStep("prompt"); setDeleteFlowError(null); }}
                            className="flex-1 btn-ghost py-2 text-xs">Back</button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Repay Modal */}
      {repayingLoan && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white/90">Record Repayment</h2>
              <button onClick={() => { setRepayingLoan(null); setLoanDetails(null); setRepayError(null); setRepayFieldErrors({}); }}
                      className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Loan info card */}
            <div className="rounded-xl p-4 mb-4 space-y-1.5"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs text-white/40 font-medium uppercase tracking-wide mb-2">Loan Details</p>
              {[
                ["Member", `${repayingLoan.member.fullName} (${repayingLoan.member.memberUid})`],
                ["Principal", fmt(repayingLoan.principalPaise)],
                ["Rate", `${(repayingLoan.monthlyRateBps / 100).toFixed(2)}% /month`],
                ["Duration", `${repayingLoan.durationMonths} months`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/80">{value}</span>
                </div>
              ))}
            </div>

            {/* Outstanding balance */}
            <div className="rounded-xl p-4 mb-4"
                 style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.14),rgba(139,92,246,0.1))", border: "1px solid rgba(59,130,246,0.22)" }}>
              <p className="text-xs text-white/40 mb-1">Outstanding Balance</p>
              <p className="text-2xl font-bold" style={{ color: "#93c5fd" }}>{fmt(repayingLoan.outstandingPrincipalPaise)}</p>
              <p className="text-xs text-white/35 mt-1">Amount needed to fully repay today, including accrued interest.</p>
            </div>

            {/* Next/Overdue installment with penalty */}
            {loanDetails?.installments && (() => {
              const today = new Date();
              const unpaidInstallments = loanDetails.installments.filter(
                (inst) => inst.amountPaidPaise < (inst.interestDuePaise + inst.principalDuePaise)
              );
              
              if (unpaidInstallments.length === 0) return null;
              
              // Find first overdue or next upcoming
              const overdue = unpaidInstallments.find((inst) => new Date(inst.dueDate) < today);
              const next = overdue || unpaidInstallments[0];
              
              const isOverdue = new Date(next.dueDate) < today;
              const installmentDue = next.interestDuePaise + next.principalDuePaise - next.amountPaidPaise;
              const penalty = waivePenalty ? 0 : next.overdueInterestPaise;
              const totalDue = installmentDue + penalty;
              
              return (
                <div className="rounded-xl p-4 mb-4"
                     style={{ 
                       background: isOverdue 
                         ? "linear-gradient(135deg,rgba(251,146,60,0.14),rgba(239,68,68,0.1))" 
                         : "rgba(16,185,129,0.1)", 
                       border: isOverdue 
                         ? "1px solid rgba(251,146,60,0.25)" 
                         : "1px solid rgba(16,185,129,0.2)" 
                     }}>
                  <p className="text-xs text-white/40 mb-1">
                    {isOverdue ? "⚠️ Overdue Installment" : "Next Installment Due"}
                  </p>
                  <p className="text-xl font-bold" style={{ color: isOverdue ? "#fdba74" : "#6ee7b7" }}>
                    {fmt(totalDue)}
                  </p>
                  <div className="text-xs mt-2 space-y-1" style={{ color: isOverdue ? "rgba(253,186,116,0.7)" : "rgba(110,231,183,0.6)" }}>
                    <p>Due {new Date(next.dueDate).toLocaleDateString()}</p>
                    <div className="flex justify-between">
                      <span>Interest:</span>
                      <span className="font-semibold">{fmt(next.interestDuePaise)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Principal:</span>
                      <span className="font-semibold">{fmt(next.principalDuePaise)}</span>
                    </div>
                    {isOverdue && next.overdueInterestPaise > 0 && (
                      <div className="flex justify-between pt-1 border-t border-white/10">
                        <span className={waivePenalty ? "line-through opacity-50" : ""}>Penalty:</span>
                        <span className={`font-semibold ${waivePenalty ? "line-through opacity-50" : ""}`}>
                          {fmt(next.overdueInterestPaise)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            <form onSubmit={repay} className="space-y-3">
              {/* Waive Penalty Toggle (only show if there's a penalty) */}
              {loanDetails?.installments && (() => {
                const today = new Date();
                const hasOverduePenalty = loanDetails.installments.some(
                  (inst) => new Date(inst.dueDate) < today && 
                           inst.amountPaidPaise < (inst.interestDuePaise + inst.principalDuePaise) &&
                           inst.overdueInterestPaise > 0
                );
                
                if (!hasOverduePenalty) return null;
                
                return (
                  <div className="rounded-xl p-3 mb-3"
                       style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.18)" }}>
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={waivePenalty}
                        onChange={(e) => setWaivePenalty(e.target.checked)}
                        className="w-4 h-4 rounded border-2 border-orange-400/30 bg-white/5 checked:bg-orange-500 checked:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-orange-300">Ignore Penalty</span>
                        <p className="text-xs text-orange-200/50 mt-0.5">
                          Waive overdue penalties and accept only loan + interest amount
                        </p>
                      </div>
                    </label>
                  </div>
                );
              })()}

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Repayment Amount (₹) *</label>
                <GlassInput
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Amount"
                  error={repayFieldErrors.amount}
                  onChange={() => setRepayFieldErrors((p) => ({ ...p, amount: "" }))}
                />
              </div>
              {repayError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <p className="text-xs text-red-400">{repayError}</p>
                </div>
              )}
              <div className="flex gap-2 pt-1">
                <button type="submit" className="flex-1 btn-gradient py-2.5 text-sm">Record Repayment</button>
                <button type="button" onClick={() => { setRepayingLoan(null); setLoanDetails(null); setRepayError(null); setRepayFieldErrors({}); setWaivePenalty(false); }}
                        className="flex-1 btn-ghost py-2.5 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
