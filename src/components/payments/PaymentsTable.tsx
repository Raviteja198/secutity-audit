"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type FieldErrors } from "@/lib/validators/client";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  member: { id: string; memberUid: string; fullName: string; email?: string | null };
  receipt?: { receiptNumber: string } | null;
};

type Member = { id: string; fullName: string; memberUid: string; status: string };

type ScheduledReminderType = "PENDING_PAYMENT_REMINDER" | "PAYMENT_GENERATION";

type ScheduledReminder = {
  id: string;
  name: string;
  type: ScheduledReminderType;
  enabled: boolean;
  dayOfMonth: number;
  hour: number;
  minute: number;
  timezone: string;
  lastRunPeriod: string | null;
  templateId: string | null;
  template?: { id: string; name: string } | null;
  sendEmail: boolean;
  sendWhatsapp: boolean;
};

type ScheduledReminderDraft = {
  name: string;
  type: ScheduledReminderType;
  enabled: boolean;
  dayOfMonth: number;
  hour: number;
  minute: number;
  timezone: string;
  templateId: string | null;
  sendEmail: boolean;
  sendWhatsapp: boolean;
};

const SCHEDULE_TYPE_LABELS: Record<ScheduledReminderType, string> = {
  PENDING_PAYMENT_REMINDER: "Pending Payment Reminder",
  PAYMENT_GENERATION: "Monthly Payment Generation",
};

const DEFAULT_SCHEDULE_DRAFT: ScheduledReminderDraft = {
  name: "",
  type: "PENDING_PAYMENT_REMINDER",
  enabled: false,
  dayOfMonth: 10,
  hour: 9,
  minute: 0,
  timezone: "Asia/Kolkata",
  templateId: null,
  sendEmail: true,
  sendWhatsapp: false,
};

type ReminderRun = {
  id: string;
  type: ScheduledReminderType;
  trigger: "MANUAL" | "SCHEDULED";
  sentCount: number;
  skippedCount: number;
  period: string | null;
  startedAt: string;
  template?: { id: string; name: string } | null;
  scheduledReminder?: { id: string; name: string } | null;
  triggeredBy?: { id: string; name: string | null; email: string } | null;
};

type ReminderRunRecipient = {
  id: string;
  memberId: string;
  email: string | null;
  status: "SENT" | "FAILED" | "SKIPPED";
  error: string | null;
  member: { id: string; fullName: string; memberUid: string };
};

type ReminderRunDetail = ReminderRun & { recipients: ReminderRunRecipient[] };

type ReminderTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  isDefault: boolean;
};

type ReminderTemplateDraft = {
  name: string;
  subject: string;
  body: string;
};

const REMINDER_TEMPLATE_PLACEHOLDERS: { token: string; label: string }[] = [
  { token: "{{fullName}}", label: "Member name" },
  { token: "{{totalDue}}", label: "Total due" },
  { token: "{{itemsList}}", label: "Pending periods" },
];

const PREVIEW_SAMPLE_VARS = {
  fullName: "Jane Doe",
  totalDue: "Rs. 1,500.00",
  itemsList: "• July 2026 — Rs. 500.00\n• August 2026 — Rs. 1,000.00",
};

function renderTemplatePreview(template: string): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(PREVIEW_SAMPLE_VARS, key)
      ? (PREVIEW_SAMPLE_VARS as Record<string, string>)[key]
      : match
  );
}

type BulkRowResult = {
  memberId: string;
  fullName: string;
  memberUid: string;
  success: boolean;
  error?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fmtPeriod(month: number, year: number) {
  return `${MONTH_SHORT[(month - 1) % 12]} ${year}`;
}

function fmtPaidAt(paidAt?: string | null) {
  if (!paidAt) return null;
  return new Date(paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GlassInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <>
      <input {...props} className={["glass-input", error ? "!border-red-500/50 focus:!ring-red-500/20" : "", props.className ?? ""].join(" ")} />
      {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
    </>
  );
}

function StatusBadge({ status }: { status: "PAID" | "PENDING" | "LATE" }) {
  return <span className={status === "PAID" ? "badge-paid" : status === "LATE" ? "badge-late" : "badge-pending"}>{status}</span>;
}

function TrashDeleteButton({
  onClick,
  disabled,
  title,
  busy,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  busy?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      title={title}
      aria-label="Delete payment"
      className="inline-flex items-center justify-center rounded-xl p-2 transition disabled:opacity-40 disabled:pointer-events-none hover:bg-red-500/15"
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

function YearStepper({ value, onChange }: { value: number; onChange: (y: number) => void }) {
  return (
    <div
      className="flex items-center rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)" }}
      onWheel={(e) => { e.preventDefault(); onChange(e.deltaY < 0 ? value + 1 : Math.max(2000, value - 1)); }}
    >
      <button type="button" onClick={() => onChange(Math.max(2000, value - 1))}
              className="px-2.5 py-2 text-white/40 hover:text-white/80 hover:bg-white/5 transition text-base leading-none select-none">−</button>
      <input
        type="number" value={value} min={2000}
        onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 2000) onChange(v); }}
        className="flex-1 min-w-0 bg-transparent text-center text-sm text-white/90 outline-none py-2 px-1"
        style={{ MozAppearance: "textfield" } as React.CSSProperties}
      />
      <button type="button" onClick={() => onChange(value + 1)}
              className="px-2.5 py-2 text-white/40 hover:text-white/80 hover:bg-white/5 transition text-base leading-none select-none">+</button>
    </div>
  );
}

function validateAddPayment(memberId: string, baseAmount: string, penaltyAmount: string): FieldErrors {
  const errs: FieldErrors = {};
  if (!memberId) errs.memberId = "Please select a member.";
  const base = Number(baseAmount);
  if (!baseAmount || isNaN(base) || base <= 0) errs.baseAmount = "Contribution amount must be greater than 0.";
  const penalty = Number(penaltyAmount);
  if (penaltyAmount !== "" && (isNaN(penalty) || penalty < 0)) errs.penaltyAmount = "Penalty amount cannot be negative.";
  return errs;
}

// ─── BulkPaymentModal ─────────────────────────────────────────────────────────

function BulkPaymentModal({
  members,
  onClose,
  onDone,
}: {
  members: Member[];
  onClose: () => void;
  onDone: () => void;
}) {
  const now = new Date();
  const [month, setMonth]           = useState(now.getMonth() + 1);
  const [year, setYear]             = useState(now.getFullYear());
  const [baseAmount, setBaseAmount] = useState("");
  const [penalty, setPenalty]       = useState("0");
  const [search, setSearch]         = useState("");
  const [selected, setSelected]     = useState<Set<string>>(new Set());
  const [creating, setCreating]     = useState(false);
  const [results, setResults]       = useState<BulkRowResult[] | null>(null);
  const [summary, setSummary]       = useState<{ created: number; skipped: number; failed: number } | null>(null);
  const [error, setError]           = useState<string | null>(null);
  const [baseErr, setBaseErr]       = useState("");
  const searchRef                   = useRef<HTMLInputElement>(null);

  // Only show ACTIVE members
  const activeMembers = useMemo(() => members.filter((m) => m.status === "ACTIVE" || !m.status), [members]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return activeMembers.filter((m) => m.fullName.toLowerCase().includes(q) || m.memberUid.toLowerCase().includes(q));
  }, [activeMembers, search]);

  const allFilteredSelected = filtered.length > 0 && filtered.every((m) => selected.has(m.id));

  function toggleMember(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allFilteredSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((m) => next.delete(m.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((m) => next.add(m.id));
        return next;
      });
    }
  }

  function selectAll() {
    setSelected(new Set(activeMembers.map((m) => m.id)));
  }

  function clearAll() {
    setSelected(new Set());
  }

  const baseNum    = parseFloat(baseAmount) || 0;
  const penNum     = parseFloat(penalty) || 0;
  const totalPerMember = baseNum + penNum;
  const grandTotal     = totalPerMember * selected.size;

  async function handleCreate() {
    setError(null);
    if (!baseAmount || baseNum <= 0) { setBaseErr("Enter a valid amount."); return; }
    if (selected.size === 0) { setError("Please select at least one member."); return; }
    setCreating(true);
    try {
      const res = await fetch("/api/admin/payments/bulk", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          memberIds: Array.from(selected),
          month,
          year,
          baseAmount: baseNum,
          penaltyAmount: penNum,
        }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json?.error ?? "Bulk create failed."); return; }
      setResults(json.results ?? []);
      setSummary({ created: json.created, skipped: json.skipped, failed: json.failed });
    } finally {
      setCreating(false);
    }
  }

  // ── Results view ──────────────────────────────────────────────────────────
  if (results) {
    return (
      <div className="modal-backdrop">
        <div className="modal-box max-w-lg w-full flex flex-col" style={{ maxHeight: "85vh" }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div>
              <h2 className="text-base font-semibold text-white/90">Bulk Create — Results</h2>
              <p className="text-xs text-white/40 mt-0.5">{fmtPeriod(month, year)}</p>
            </div>
            <button onClick={() => { onDone(); onClose(); }} className="text-white/30 hover:text-white/70 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Summary pills */}
          {summary && (
            <div className="flex gap-2 mb-4 flex-shrink-0 flex-wrap">
              {[
                { label: `${summary.created} Created`, color: "#6ee7b7", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
                { label: `${summary.skipped} Skipped`, color: "#fcd34d", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
                { label: `${summary.failed} Failed`,   color: "#fca5a5", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.25)"  },
              ].map((s) => (
                <span key={s.label} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
                  {s.label}
                </span>
              ))}
            </div>
          )}

          {/* Result rows */}
          <div className="overflow-y-auto flex-1 space-y-1.5 pr-1">
            {results.map((r) => (
              <div key={r.memberId}
                   className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                   style={{
                     background: r.success ? "rgba(16,185,129,0.07)" : "rgba(239,68,68,0.07)",
                     border: `1px solid ${r.success ? "rgba(16,185,129,0.18)" : "rgba(239,68,68,0.18)"}`,
                   }}>
                {r.success ? (
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#6ee7b7" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#fca5a5" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: r.success ? "#6ee7b7" : "#fca5a5" }}>
                    {r.fullName}
                  </div>
                  <div className="text-xs text-white/35">{r.memberUid}</div>
                </div>
                {!r.success && r.error && (
                  <div className="text-xs text-right text-white/40 max-w-[180px] leading-tight">{r.error}</div>
                )}
                {r.success && (
                  <div className="text-xs text-white/30">Created</div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 flex-shrink-0">
            <button onClick={() => { onDone(); onClose(); }} className="w-full btn-gradient py-2.5 text-sm">
              Close &amp; Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Creation form ─────────────────────────────────────────────────────────
  return (
    <div className="modal-backdrop">
      <div
        className="modal-box w-full flex flex-col"
        style={{ maxWidth: "min(760px, 95vw)", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-white/90">Bulk Create Payments</h2>
            <p className="text-xs text-white/40 mt-0.5">Select members and set payment details</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">

          {/* ── Left: Payment Settings ──────────────────────────────────────── */}
          <div className="flex flex-col gap-3 md:w-56 flex-shrink-0">

            {/* Period */}
            <div className="rounded-xl p-3.5 space-y-3"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Period</p>
              <div className="space-y-1.5">
                <label className="text-xs text-white/45">Month</label>
                <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="glass-input cursor-pointer">
                  {MONTH_NAMES.map((m, i) => (
                    <option key={i + 1} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/45">Year</label>
                <YearStepper value={year} onChange={setYear} />
              </div>
            </div>

            {/* Amounts */}
            <div className="rounded-xl p-3.5 space-y-3"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-[10px] uppercase tracking-widest text-white/30">Amounts</p>
              <div className="space-y-1.5">
                <label className="text-xs text-white/45">Contribution (₹) *</label>
                <GlassInput
                  type="number" step="0.01" min="0.01"
                  placeholder="e.g. 500"
                  value={baseAmount}
                  onChange={(e) => { setBaseAmount(e.target.value); setBaseErr(""); }}
                  error={baseErr}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/45">Penalty (₹)</label>
                <GlassInput
                  type="number" step="0.01" min="0"
                  placeholder="0"
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl p-3.5 space-y-2"
                 style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <p className="text-[10px] uppercase tracking-widest text-violet-400/70">Summary</p>
              <div className="text-xs text-white/50 space-y-1">
                <div className="flex justify-between">
                  <span>Period</span>
                  <span className="text-white/75 font-medium">{fmtPeriod(month, year)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Members</span>
                  <span className="text-white/75 font-medium">{selected.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Per member</span>
                  <span className="text-white/75 font-medium">₹{totalPerMember.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-violet-500/20 pt-2 flex justify-between">
                <span className="text-xs text-violet-300/70 font-medium">Grand Total</span>
                <span className="text-sm font-bold" style={{ color: "#c4b5fd" }}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
          </div>

          {/* ── Right: Member Selector ──────────────────────────────────────── */}
          <div className="flex flex-col flex-1 min-h-0 min-w-0">

            {/* Search + bulk controls */}
            <div className="space-y-2 mb-3 flex-shrink-0">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none"
                     fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 1010 17a7 7 0 006.65-4.35z"/>
                </svg>
                <input
                  ref={searchRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members…"
                  className="glass-input pl-8 text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <button
                    type="button" onClick={selectAll}
                    className="text-xs px-2.5 py-1 rounded-lg transition font-medium"
                    style={{ background: "rgba(139,92,246,0.12)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.25)" }}
                  >
                    Select All ({activeMembers.length})
                  </button>
                  {selected.size > 0 && (
                    <button
                      type="button" onClick={clearAll}
                      className="text-xs px-2.5 py-1 rounded-lg transition"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <span className="text-xs text-white/35">
                  {selected.size > 0
                    ? <span style={{ color: "#c4b5fd" }}>{selected.size} selected</span>
                    : "None selected"
                  }
                </span>
              </div>

              {/* Toggle visible filtered members */}
              {filtered.length > 0 && filtered.length < activeMembers.length && (
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-[11px] text-white/40 hover:text-white/65 transition underline underline-offset-2"
                >
                  {allFilteredSelected ? "Deselect" : "Select"} all {filtered.length} matching
                </button>
              )}
            </div>

            {/* Member list */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 min-h-0"
                 style={{ maxHeight: "clamp(240px, 40vh, 420px)" }}>
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-white/25 text-sm">No members found</div>
              ) : filtered.map((m) => {
                const isChecked = selected.has(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleMember(m.id)}
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-100"
                    style={{
                      background: isChecked ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)",
                      border: isChecked ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Checkbox */}
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: isChecked ? "#8b5cf6" : "rgba(255,255,255,0.08)",
                        border: isChecked ? "none" : "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {isChecked && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                         style={{
                           background: isChecked ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.07)",
                           color: isChecked ? "#c4b5fd" : "rgba(255,255,255,0.5)",
                         }}>
                      {m.fullName.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: isChecked ? "#e9d5ff" : "rgba(255,255,255,0.8)" }}>
                        {m.fullName}
                      </div>
                      <div className="text-xs text-white/35">{m.memberUid}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-4 mt-2 border-t border-white/[0.06] flex-shrink-0">
          <button type="button" onClick={onClose} disabled={creating} className="flex-1 btn-ghost py-2.5 text-sm">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={creating || selected.size === 0}
            className="flex-[2] btn-gradient py-2.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Creating…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                Create {selected.size > 0 ? `${selected.size} Payment${selected.size > 1 ? "s" : ""}` : "Payments"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PaymentsTable ────────────────────────────────────────────────────────────

export function PaymentsTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin" : "/api/user";

  const [items, setItems]                 = useState<Payment[]>([]);
  const [total, setTotal]                 = useState(0);
  const [page, setPage]                   = useState(1);
  const [pageSize]                        = useState(20);
  const [loading, setLoading]             = useState(false);
  const [members, setMembers]             = useState<Member[]>([]);
  const [serverAllTimeCollected, setServerAllTimeCollected] = useState(0);
  const [serverThisMonthCollected, setServerThisMonthCollected] = useState(0);

  // Single add modal
  const [showAddModal, setShowAddModal]   = useState(false);
  const [addingPayment, setAddingPayment] = useState(false);
  const [addPaymentError, setAddPaymentError] = useState<string | null>(null);
  const [addFieldErrors, setAddFieldErrors]   = useState<FieldErrors>({});
  const now = new Date();
  const [addMonth, setAddMonth]           = useState(now.getMonth() + 1);
  const [addYear, setAddYear]             = useState(now.getFullYear());

  // Bulk modal
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Delete
  const [deleting, setDeleting]           = useState<string | null>(null);
  const [sendingReminders, setSendingReminders] = useState(false);

  // Scheduled reminders (list + create/edit + delete)
  const [schedules, setSchedules] = useState<ScheduledReminder[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [showScheduleManager, setShowScheduleManager] = useState(false);
  const [showScheduleEditor, setShowScheduleEditor] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
  const [scheduleDraft, setScheduleDraft] = useState<ScheduledReminderDraft>(DEFAULT_SCHEDULE_DRAFT);
  const [scheduleSaving, setScheduleSaving] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [deletingScheduleId, setDeletingScheduleId] = useState<string | null>(null);

  // Generate Payments Now modal
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generateTemplateId, setGenerateTemplateId] = useState<string>("");
  const [generateSendEmail, setGenerateSendEmail] = useState(true);
  const [generateSendWhatsapp, setGenerateSendWhatsapp] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateResult, setGenerateResult] = useState<{ createdCount: number; sent: number; skipped: number } | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);

  // History modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyRuns, setHistoryRuns] = useState<ReminderRun[]>([]);
  const [historyRunDetail, setHistoryRunDetail] = useState<ReminderRunDetail | null>(null);
  const [historyDetailLoading, setHistoryDetailLoading] = useState(false);

  // Reminder templates (list + create/edit + delete)
  const [templates, setTemplates] = useState<ReminderTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [templateDraft, setTemplateDraft] = useState<ReminderTemplateDraft>({ name: "", subject: "", body: "" });
  const [templateSaving, setTemplateSaving] = useState(false);
  const [templateError, setTemplateError] = useState<string | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [activeTemplateField, setActiveTemplateField] = useState<"subject" | "body">("body");
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Send Reminders modal
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendTemplateId, setSendTemplateId] = useState<string>("");
  const [sendChannelEmail, setSendChannelEmail] = useState(true);
  const [sendChannelWhatsapp, setSendChannelWhatsapp] = useState(false);
  const [sendResult, setSendResult] = useState<{ sent: number; skipped: number; failed: number } | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL(`${base}/payments`, window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
      setServerAllTimeCollected(json.allTimeCollected ?? 0);
      setServerThisMonthCollected(json.thisMonthCollected ?? 0);
    } finally {
      setLoading(false);
    }
  }, [base, page, pageSize]);

  useEffect(() => { void load(); }, [load]);

  // Fetch members whenever either modal is open
  useEffect(() => {
    if ((showAddModal || showBulkModal) && mode === "admin") {
      fetch("/api/admin/members?pageSize=500")
        .then((r) => r.json())
        .then((json) => setMembers(json.items ?? []));
    }
  }, [showAddModal, showBulkModal, mode]);

  async function addPayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddPaymentError(null);
    const fd = new FormData(e.currentTarget);
    const memberId     = String(fd.get("memberId") ?? "");
    const baseAmount   = String(fd.get("baseAmount") ?? "");
    const penaltyAmount = String(fd.get("penaltyAmount") ?? "0");

    const errs = validateAddPayment(memberId, baseAmount, penaltyAmount);
    setAddFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setAddingPayment(true);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          memberId,
          month: addMonth,
          year: addYear,
          baseAmount: Number(baseAmount),
          penaltyAmount: Number(penaltyAmount) || 0,
        }),
      });
      const json = await res.json();
      if (!res.ok) { setAddPaymentError(json?.error ?? "Failed to add payment."); return; }
      setShowAddModal(false);
      setAddPaymentError(null);
      setAddFieldErrors({});
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


  async function loadTemplates() {
    setTemplatesLoading(true);
    try {
      const res = await fetch("/api/admin/payments/reminders/templates");
      const json = await res.json();
      if (res.ok) setTemplates(json.items ?? []);
      return json.items as ReminderTemplate[] | undefined;
    } finally {
      setTemplatesLoading(false);
    }
  }

  async function openSendModal() {
    setSendResult(null);
    setSendError(null);
    setShowSendModal(true);
    const items = await loadTemplates();
    const defaultTemplate = items?.find((t) => t.isDefault);
    setSendTemplateId(defaultTemplate?.id ?? "");
  }

  async function sendReminders() {
    setSendingReminders(true);
    setSendResult(null);
    setSendError(null);
    try {
      const res = await fetch("/api/admin/payments/reminders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ templateId: sendTemplateId || null, sendEmail: sendChannelEmail, sendWhatsapp: sendChannelWhatsapp }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSendError(json?.error ?? "Failed to send reminders");
        return;
      }
      const failedCount = Array.isArray(json.failed) ? json.failed.length : 0;
      setSendResult({ sent: json.sent ?? 0, skipped: json.skipped ?? 0, failed: failedCount });
    } finally {
      setSendingReminders(false);
    }
  }

  async function loadSchedules() {
    setSchedulesLoading(true);
    try {
      const res = await fetch("/api/admin/payment-reminders/schedules");
      const json = await res.json();
      if (res.ok) setSchedules(json.items ?? []);
    } finally {
      setSchedulesLoading(false);
    }
  }

  async function openScheduleManager() {
    setShowScheduleManager(true);
    setScheduleError(null);
    void loadTemplates();
    await loadSchedules();
  }

  function openNewScheduleEditor() {
    setEditingScheduleId(null);
    setScheduleDraft(DEFAULT_SCHEDULE_DRAFT);
    setScheduleError(null);
    setShowScheduleEditor(true);
  }

  function openEditScheduleEditor(s: ScheduledReminder) {
    setEditingScheduleId(s.id);
    setScheduleDraft({
      name: s.name,
      type: s.type,
      enabled: s.enabled,
      dayOfMonth: s.dayOfMonth,
      hour: s.hour,
      minute: s.minute,
      timezone: s.timezone,
      templateId: s.templateId,
      sendEmail: s.sendEmail,
      sendWhatsapp: s.sendWhatsapp,
    });
    setScheduleError(null);
    setShowScheduleEditor(true);
  }

  async function saveSchedule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setScheduleError(null);
    setScheduleSaving(true);
    try {
      const url = editingScheduleId
        ? `/api/admin/payment-reminders/schedules/${editingScheduleId}`
        : "/api/admin/payment-reminders/schedules";
      const res = await fetch(url, {
        method: editingScheduleId ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(scheduleDraft),
      });
      const json = await res.json();
      if (!res.ok) { setScheduleError(json?.error ?? "Failed to save schedule."); return; }
      await loadSchedules();
      setShowScheduleEditor(false);
    } finally {
      setScheduleSaving(false);
    }
  }

  async function confirmDeleteSchedule() {
    if (!deletingScheduleId) return;
    setScheduleSaving(true);
    try {
      const res = await fetch(`/api/admin/payment-reminders/schedules/${deletingScheduleId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) { setScheduleError(json?.error ?? "Failed to delete schedule."); return; }
      await loadSchedules();
    } finally {
      setDeletingScheduleId(null);
      setScheduleSaving(false);
    }
  }

  async function openGenerateModal() {
    setGenerateResult(null);
    setGenerateError(null);
    setShowGenerateModal(true);
    const items = await loadTemplates();
    const defaultTemplate = items?.find((t) => t.isDefault);
    setGenerateTemplateId(defaultTemplate?.id ?? "");
  }

  async function generatePaymentsNow() {
    setGenerating(true);
    setGenerateResult(null);
    setGenerateError(null);
    try {
      const res = await fetch("/api/admin/payments/generate-now", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ templateId: generateTemplateId || null, sendEmail: generateSendEmail, sendWhatsapp: generateSendWhatsapp }),
      });
      const json = await res.json();
      if (!res.ok) { setGenerateError(json?.error ?? "Failed to generate payments."); return; }
      setGenerateResult({ createdCount: json.createdCount ?? 0, sent: json.sent ?? 0, skipped: json.skipped ?? 0 });
      await load();
    } finally {
      setGenerating(false);
    }
  }

  async function openHistoryModal() {
    setShowHistoryModal(true);
    setHistoryRunDetail(null);
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/admin/payment-reminders/runs");
      const json = await res.json();
      if (res.ok) setHistoryRuns(json.items ?? []);
    } finally {
      setHistoryLoading(false);
    }
  }

  async function openRunDetail(id: string) {
    setHistoryDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/payment-reminders/runs/${id}`);
      const json = await res.json();
      if (res.ok) setHistoryRunDetail(json);
    } finally {
      setHistoryDetailLoading(false);
    }
  }

  async function openTemplateManager() {
    setShowTemplateManager(true);
    setTemplateError(null);
    await loadTemplates();
  }

  function openNewTemplateEditor() {
    setEditingTemplateId(null);
    setTemplateDraft({ name: "", subject: "Payment reminder", body: "" });
    setTemplateError(null);
    setShowTemplateEditor(true);
  }

  function openEditTemplateEditor(t: ReminderTemplate) {
    setEditingTemplateId(t.id);
    setTemplateDraft({ name: t.name, subject: t.subject, body: t.body });
    setTemplateError(null);
    setShowTemplateEditor(true);
  }

  async function saveTemplate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTemplateError(null);
    setTemplateSaving(true);
    try {
      const url = editingTemplateId
        ? `/api/admin/payments/reminders/templates/${editingTemplateId}`
        : "/api/admin/payments/reminders/templates";
      const res = await fetch(url, {
        method: editingTemplateId ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(templateDraft),
      });
      const json = await res.json();
      if (!res.ok) { setTemplateError(json?.error ?? "Failed to save template."); return; }
      await loadTemplates();
      setShowTemplateEditor(false);
    } finally {
      setTemplateSaving(false);
    }
  }

  async function confirmDeleteTemplate() {
    if (!deletingTemplateId) return;
    setTemplateSaving(true);
    try {
      const res = await fetch(`/api/admin/payments/reminders/templates/${deletingTemplateId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) { setTemplateError(json?.error ?? "Failed to delete template."); return; }
      await loadTemplates();
    } finally {
      setDeletingTemplateId(null);
      setTemplateSaving(false);
    }
  }

  async function makeDefaultTemplate(id: string) {
    setTemplateSaving(true);
    try {
      await fetch(`/api/admin/payments/reminders/templates/${id}/default`, { method: "PUT" });
      await loadTemplates();
    } finally {
      setTemplateSaving(false);
    }
  }

  /** Inserts a {{token}} at the cursor position of whichever template field was last focused. */
  function insertPlaceholder(token: string) {
    const refMap = { subject: subjectRef, body: bodyRef } as const;
    const el = refMap[activeTemplateField].current;
    const current = templateDraft[activeTemplateField];

    if (!el) {
      setTemplateDraft({ ...templateDraft, [activeTemplateField]: current + token });
      return;
    }

    const start = el.selectionStart ?? current.length;
    const end = el.selectionEnd ?? current.length;
    const next = current.slice(0, start) + token + current.slice(end);
    setTemplateDraft({ ...templateDraft, [activeTemplateField]: next });

    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + token.length;
      el.setSelectionRange(cursor, cursor);
    });
  }

  async function deletePayment(p: Payment) {
    const detail =
      p.status === "PENDING"
        ? "This removes the pending contribution row for this member and period."
        : "Receipt (if any) will be removed. Any amount already counted toward collections will be reversed from the group fund ledger.";
    if (
      !confirm(
        `Delete payment for ${p.member.fullName} — ${fmtPeriod(p.month, p.year)}?\n\n${detail}\n\nThis cannot be undone.`
      )
    ) {
      return;
    }
    setDeleting(p.id);
    try {
      const res = await fetch(`${base}/payments/${p.id}`, { method: "DELETE" });
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

  const monthlyCollected = serverThisMonthCollected;
  const totalCollected = serverAllTimeCollected;

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Finance</p>
          <h2 className="text-lg font-bold text-white/90">Payments</h2>
        </div>
        {mode === "admin" && (
          <div className="flex items-center gap-2">
            {/* Bulk Payment */}
            <button
              onClick={() => setShowBulkModal(true)}
              className="text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium transition-all"
              style={{ background: "rgba(139,92,246,0.14)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Bulk Payment
            </button>
            <button
              onClick={() => void openSendModal()}
              className="text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium transition-all disabled:opacity-60"
              style={{ background: "rgba(16,185,129,0.12)", color: "#86efac", border: "1px solid rgba(16,185,129,0.28)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"/>
              </svg>
              Send Reminders
            </button>
            <button
              onClick={() => void openGenerateModal()}
              className="text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium transition-all"
              style={{ background: "rgba(245,158,11,0.12)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.28)" }}
              title="Generate this month's contribution payments now"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Generate Payments
            </button>
            <button
              onClick={() => void openScheduleManager()}
              className="text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium transition-all"
              style={{ background: "rgba(59,130,246,0.12)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.28)" }}
              title="Manage automatic reminder/generation schedules"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Schedules
            </button>
            <button
              onClick={() => void openTemplateManager()}
              className="text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium transition-all"
              style={{ background: "rgba(236,72,153,0.12)", color: "#f9a8d4", border: "1px solid rgba(236,72,153,0.28)" }}
              title="Manage reminder email templates"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-9.5a2.121 2.121 0 013 3L12 16l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Templates
            </button>
            <button
              onClick={() => void openHistoryModal()}
              className="text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.14)" }}
              title="View reminder/generation send history"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zM3 3v5h5"/>
              </svg>
              History
            </button>
            {/* Single Payment */}
            <button
              onClick={() => {
                setAddMonth(new Date().getMonth() + 1);
                setAddYear(new Date().getFullYear());
                setAddPaymentError(null);
                setShowAddModal(true);
              }}
              className="btn-gradient text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Add Payment
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl p-4"
             style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.16),rgba(59,130,246,0.1))", border: "1px solid rgba(16,185,129,0.22)" }}>
          <p className="text-xs text-white/40 mb-1">This Month</p>
          <p className="text-lg font-bold" style={{ color: "#6ee7b7" }}>{fmt(monthlyCollected)}</p>
        </div>
        <div className="rounded-2xl p-4"
             style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.16),rgba(139,92,246,0.1))", border: "1px solid rgba(59,130,246,0.22)" }}>
          <p className="text-xs text-white/40 mb-1">All Time Collections</p>
          <p className="text-lg font-bold" style={{ color: "#93c5fd" }}>{fmt(totalCollected)}</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl"
           style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <table className="glass-table min-w-full">
          <thead>
            <tr>
              <th>Member</th>
              <th>Period</th>
              <th>Contribution</th>
              <th>Penalty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Receipt</th>
              {mode === "admin" && <th>Actions</th>}
              {mode === "admin" && (
                <th className="w-14 text-right pr-3">
                  <span className="sr-only">Delete</span>
                  <svg className="w-4 h-4 inline-block text-white/35 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="clarity-mask">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: mode === "admin" ? 9 : 7 }).map((_, j) => (
                    <td key={j}><div className="h-4 w-16 bg-white/5 rounded-md animate-pulse"/></td>
                  ))}
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={mode === "admin" ? 9 : 7} className="text-center py-10">
                  <p className="text-white/30 text-sm">No payments found</p>
                </td>
              </tr>
            ) : items.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="font-medium text-white/90 text-sm">{p.member.fullName}</div>
                  <div className="text-xs text-white/35">{p.member.memberUid}</div>
                </td>
                <td>
                  <div className="text-white/80 text-sm font-medium">{fmtPeriod(p.month, p.year)}</div>
                  {p.paidAt && <div className="text-xs text-white/35 mt-0.5">Paid {fmtPaidAt(p.paidAt)}</div>}
                </td>
                <td className="text-white/70 text-sm">{fmt(p.baseAmountPaise)}</td>
                <td className="text-sm" style={{ color: p.penaltyAmountPaise > 0 ? "#fca5a5" : "rgba(255,255,255,0.4)" }}>
                  {fmt(p.penaltyAmountPaise)}
                </td>
                <td className="font-semibold text-white/90 text-sm">{fmt(p.totalAmountPaise)}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>
                  {p.receipt ? (
                    <a href={`${base}/receipts/${p.id}/pdf`} target="_blank" rel="noreferrer"
                       className="text-xs hover:underline" style={{ color: "#93c5fd" }}>
                      {p.receipt.receiptNumber}
                    </a>
                  ) : <span className="text-white/25">—</span>}
                </td>
                {mode === "admin" && (
                  <td className="align-middle">
                    {p.status === "PENDING" ? (
                      <div className="flex flex-wrap gap-1 min-w-[6.5rem]">
                        {(["CASH", "UPI", "BANK"] as const).map((m) => (
                          <button key={m} onClick={() => record(p.id, m)}
                                  className="rounded-lg px-2 py-1 text-[11px] font-medium transition"
                                  style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.18)" }}>
                            {m}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-white/40">{p.paymentMethod ?? "—"}</span>
                    )}
                  </td>
                )}
                {mode === "admin" && (
                  <td className="text-right align-middle pr-1">
                    <TrashDeleteButton
                      onClick={() => void deletePayment(p)}
                      busy={deleting === p.id}
                      title={
                        p.status === "PENDING"
                          ? "Delete this pending payment"
                          : "Delete payment (removes receipt and reverses fund)"
                      }
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
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-4 animate-pulse"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="h-4 w-32 bg-white/8 rounded mb-2"/><div className="h-3 w-20 bg-white/5 rounded"/>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
            <p className="text-white/30 text-sm">No payments found</p>
          </div>
        ) : items.map((p) => (
          <div key={p.id} className="rounded-2xl p-4 space-y-3"
               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-white/90">{p.member.fullName}</div>
                <div className="text-xs text-white/35 mt-0.5">
                  {p.member.memberUid} · {fmtPeriod(p.month, p.year)}
                  {p.paidAt && ` · Paid ${fmtPaidAt(p.paidAt)}`}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {mode === "admin" && (
                  <TrashDeleteButton
                    onClick={() => void deletePayment(p)}
                    busy={deleting === p.id}
                    title={
                      p.status === "PENDING"
                        ? "Delete this pending payment"
                        : "Delete payment (removes receipt and reverses fund)"
                    }
                  />
                )}
                <StatusBadge status={p.status} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><span className="text-white/35">Base</span><div className="text-white/70 mt-0.5">{fmt(p.baseAmountPaise)}</div></div>
              <div>
                <span className="text-white/35">Penalty</span>
                <div className="mt-0.5" style={{ color: p.penaltyAmountPaise > 0 ? "#fca5a5" : "rgba(255,255,255,0.5)" }}>
                  {fmt(p.penaltyAmountPaise)}
                </div>
              </div>
              <div><span className="text-white/35">Total</span><div className="font-semibold text-white/90 mt-0.5">{fmt(p.totalAmountPaise)}</div></div>
            </div>
            {p.receipt && (
              <a href={`${base}/receipts/${p.id}/pdf`} target="_blank" rel="noreferrer"
                 className="text-xs" style={{ color: "#93c5fd" }}>
                Receipt: {p.receipt.receiptNumber}
              </a>
            )}
            {mode === "admin" && p.status === "PENDING" && (
              <div className="flex gap-2 pt-1 flex-wrap border-t border-white/5">
                {(["CASH", "UPI", "BANK"] as const).map((m) => (
                  <button key={m} onClick={() => record(p.id, m)}
                          className="flex-1 rounded-xl py-1.5 text-xs font-medium"
                          style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.16)" }}>
                    {m}
                  </button>
                ))}
              </div>
            )}
            {mode === "admin" && (p.status === "PAID" || p.status === "LATE") && p.paymentMethod && (
              <div className="pt-2 border-t border-white/5">
                <span className="text-xs text-white/30">{p.paymentMethod}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-xs text-white/35">Page {page} of {totalPages} ({total} total)</p>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}
                  className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-35">← Prev</button>
          <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}
                  className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-35">Next →</button>
        </div>
      </div>

      {/* ── Scheduled Reminders Manager Modal ─────────────────────────────── */}
      {showScheduleManager && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white/90">Scheduled Reminders</h2>
                <p className="text-xs text-white/35 mt-0.5">
                  Create as many recurring reminders/generations as you need — each with its own day, time, and template.
                </p>
              </div>
              <button onClick={() => setShowScheduleManager(false)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {schedulesLoading ? (
              <p className="text-sm text-white/40">Loading…</p>
            ) : (
              <div className="space-y-2">
                {schedules.length === 0 && (
                  <p className="text-sm text-white/35 py-2">No schedules yet.</p>
                )}
                {schedules.map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5"
                       style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="min-w-0">
                      <p className="text-sm text-white/85 truncate">
                        {s.name}
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full align-middle"
                              style={{ background: s.enabled ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.08)", color: s.enabled ? "#6ee7b7" : "rgba(255,255,255,0.4)" }}>
                          {s.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </p>
                      <p className="text-xs text-white/35 truncate">
                        {SCHEDULE_TYPE_LABELS[s.type]} · Day {s.dayOfMonth}, {String(s.hour).padStart(2, "0")}:{String(s.minute).padStart(2, "0")} {s.timezone}
                        {s.template && <> · {s.template.name}</>}
                        {" · "}{[s.sendEmail && "Email", s.sendWhatsapp && "WhatsApp"].filter(Boolean).join(" + ")}
                      </p>
                      {s.lastRunPeriod && <p className="text-[10px] text-white/25">Last ran: {s.lastRunPeriod}</p>}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button onClick={() => openEditScheduleEditor(s)}
                              className="text-[11px] px-2 py-1 rounded-lg btn-ghost">Edit</button>
                      <button onClick={() => setDeletingScheduleId(s.id)} disabled={scheduleSaving}
                              className="text-[11px] px-2 py-1 rounded-lg btn-ghost">Delete</button>
                    </div>
                  </div>
                ))}

                {scheduleError && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                    <p className="text-xs text-red-400">{scheduleError}</p>
                  </div>
                )}

                <button onClick={openNewScheduleEditor} className="w-full btn-gradient py-2.5 text-sm mt-2">
                  + New Schedule
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Scheduled Reminder Editor Modal ───────────────────────────────── */}
      {showScheduleEditor && (
        <div className="modal-backdrop" style={{ zIndex: 60 }}>
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white/90">{editingScheduleId ? "Edit Schedule" : "New Schedule"}</h2>
              <button onClick={() => setShowScheduleEditor(false)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form onSubmit={saveSchedule} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Name</label>
                <input
                  type="text" className="glass-input"
                  placeholder="e.g. Gentle reminder (day 12)"
                  value={scheduleDraft.name}
                  onChange={(e) => setScheduleDraft({ ...scheduleDraft, name: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Type</label>
                <select
                  className="glass-input"
                  value={scheduleDraft.type}
                  onChange={(e) => setScheduleDraft({ ...scheduleDraft, type: e.target.value as ScheduledReminderType })}
                >
                  <option value="PENDING_PAYMENT_REMINDER">Pending Payment Reminder</option>
                  <option value="PAYMENT_GENERATION">Monthly Payment Generation</option>
                </select>
                {scheduleDraft.type === "PAYMENT_GENERATION" && (
                  <p className="text-[11px] text-white/25 leading-relaxed">
                    Creates this month&apos;s contribution payment for every active member (amount from the current
                    Contribution Rule), then emails just the newly-added members using the template below.
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 cursor-pointer"
                     style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <input
                  type="checkbox"
                  checked={scheduleDraft.enabled}
                  onChange={(e) => setScheduleDraft({ ...scheduleDraft, enabled: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-white/80">Enabled</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Day of month</label>
                  <input
                    type="number" min={1} max={28} className="glass-input"
                    value={scheduleDraft.dayOfMonth}
                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, dayOfMonth: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Timezone</label>
                  <input
                    type="text" className="glass-input"
                    value={scheduleDraft.timezone}
                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, timezone: e.target.value })}
                    placeholder="Asia/Kolkata"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Hour (0-23)</label>
                  <input
                    type="number" min={0} max={23} className="glass-input"
                    value={scheduleDraft.hour}
                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, hour: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Minute (0-59)</label>
                  <input
                    type="number" min={0} max={59} className="glass-input"
                    value={scheduleDraft.minute}
                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, minute: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Email template</label>
                <select
                  className="glass-input"
                  value={scheduleDraft.templateId ?? ""}
                  onChange={(e) => setScheduleDraft({ ...scheduleDraft, templateId: e.target.value || null })}
                >
                  <option value="">Default template</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}{t.isDefault ? " (default)" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Send via</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scheduleDraft.sendEmail}
                      onChange={(e) => setScheduleDraft({ ...scheduleDraft, sendEmail: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-white/80">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scheduleDraft.sendWhatsapp}
                      onChange={(e) => setScheduleDraft({ ...scheduleDraft, sendWhatsapp: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-white/80">WhatsApp</span>
                  </label>
                </div>
              </div>

              <p className="text-[11px] text-white/25 leading-relaxed">
                Checked hourly, so it runs within the chosen hour (minutes are for reference only, not precise to the minute).
              </p>

              {scheduleError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                  <p className="text-xs text-red-400">{scheduleError}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={scheduleSaving} className="flex-1 btn-gradient py-2.5 text-sm">
                  {scheduleSaving ? "Saving…" : "Save Schedule"}
                </button>
                <button type="button" onClick={() => setShowScheduleEditor(false)}
                        disabled={scheduleSaving} className="flex-1 btn-ghost py-2.5 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Schedule Confirm Modal ─────────────────────────────────── */}
      {deletingScheduleId && (
        <div className="modal-backdrop" style={{ zIndex: 70 }}>
          <div className="modal-box max-w-sm w-full p-6">
            <h2 className="text-base font-semibold text-white/90 mb-2">Delete schedule?</h2>
            <p className="text-sm text-white/45 mb-5">This can&apos;t be undone.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => void confirmDeleteSchedule()}
                      disabled={scheduleSaving} className="flex-1 btn-gradient py-2.5 text-sm">
                {scheduleSaving ? "Deleting…" : "Delete"}
              </button>
              <button type="button" onClick={() => setDeletingScheduleId(null)}
                      disabled={scheduleSaving} className="flex-1 btn-ghost py-2.5 text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Generate Payments Now Modal ───────────────────────────────────── */}
      {showGenerateModal && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white/90">Generate Payments Now</h2>
              <button onClick={() => setShowGenerateModal(false)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <p className="text-sm text-white/45 mb-4">
              Creates this month&apos;s contribution payment for every active member who doesn&apos;t already have one
              (amount from the current Contribution Rule), then emails just the newly-added members.
            </p>

            <div className="space-y-1.5 mb-4">
              <label className="text-xs text-white/45 ml-1">Email template</label>
              <select
                className="glass-input"
                value={generateTemplateId}
                onChange={(e) => setGenerateTemplateId(e.target.value)}
                disabled={templatesLoading}
              >
                <option value="">Default template</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}{t.isDefault ? " (default)" : ""}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 mb-4">
              <label className="text-xs text-white/45 ml-1">Send via</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={generateSendEmail} onChange={(e) => setGenerateSendEmail(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm text-white/80">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={generateSendWhatsapp} onChange={(e) => setGenerateSendWhatsapp(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm text-white/80">WhatsApp</span>
                </label>
              </div>
            </div>

            {generateResult && (
              <div className="rounded-xl px-3 py-2.5 mb-4 text-sm"
                   style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }}>
                Payments created: {generateResult.createdCount} · Notified: {generateResult.sent} · Skipped: {generateResult.skipped}
              </div>
            )}

            {generateError && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5 mb-4">
                <p className="text-xs text-red-400">{generateError}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button type="button" onClick={() => void generatePaymentsNow()} disabled={generating}
                      className="flex-1 btn-gradient py-2.5 text-sm">
                {generating ? "Generating…" : "Generate Payments"}
              </button>
              <button type="button" onClick={() => setShowGenerateModal(false)}
                      disabled={generating} className="flex-1 btn-ghost py-2.5 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── History Modal ──────────────────────────────────────────────────── */}
      {showHistoryModal && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white/90">Reminder & Generation History</h2>
              <button onClick={() => { setShowHistoryModal(false); setHistoryRunDetail(null); }} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {historyRunDetail ? (
              <div className="space-y-3">
                <button onClick={() => setHistoryRunDetail(null)} className="text-xs text-white/40 hover:text-white/70 transition inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to list
                </button>
                <div className="rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-sm text-white/80">
                    {SCHEDULE_TYPE_LABELS[historyRunDetail.type]} · {historyRunDetail.trigger === "MANUAL" ? "Manual" : "Scheduled"}
                  </p>
                  <p className="text-xs text-white/35 mt-0.5">
                    {new Date(historyRunDetail.startedAt).toLocaleString()} · Template: {historyRunDetail.template?.name ?? "—"}
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto space-y-1.5">
                  {historyRunDetail.recipients.map((r) => (
                    <div key={r.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2"
                         style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="min-w-0">
                        <p className="text-sm text-white/75 truncate">{r.member.fullName} <span className="text-white/30">({r.member.memberUid})</span></p>
                        {r.error && <p className="text-[11px] text-red-400 truncate">{r.error}</p>}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{
                              background: r.status === "SENT" ? "rgba(16,185,129,0.15)" : r.status === "FAILED" ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.08)",
                              color: r.status === "SENT" ? "#6ee7b7" : r.status === "FAILED" ? "#fca5a5" : "rgba(255,255,255,0.5)",
                            }}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : historyLoading ? (
              <p className="text-sm text-white/40">Loading…</p>
            ) : historyRuns.length === 0 ? (
              <p className="text-sm text-white/35 py-2">No sends yet.</p>
            ) : (
              <div className="space-y-1.5 max-h-96 overflow-y-auto">
                {historyRuns.map((run) => (
                  <button key={run.id} onClick={() => void openRunDetail(run.id)}
                          disabled={historyDetailLoading}
                          className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition-all"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="min-w-0">
                      <p className="text-sm text-white/85 truncate">
                        {SCHEDULE_TYPE_LABELS[run.type]}
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full align-middle"
                              style={{ background: "rgba(139,92,246,0.15)", color: "#c4b5fd" }}>
                          {run.trigger === "MANUAL" ? "Manual" : "Scheduled"}
                        </span>
                      </p>
                      <p className="text-xs text-white/35 truncate">
                        {new Date(run.startedAt).toLocaleString()} · {run.template?.name ?? "—"}
                      </p>
                    </div>
                    <p className="text-xs text-white/50 flex-shrink-0">Sent {run.sentCount} · Skipped {run.skippedCount}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Reminder Template Manager Modal ──────────────────────────────── */}
      {showTemplateManager && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white/90">Reminder Email Templates</h2>
                <p className="text-xs text-white/35 mt-0.5">Manage reusable templates for pending-payment reminders.</p>
              </div>
              <button onClick={() => setShowTemplateManager(false)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {templatesLoading ? (
              <p className="text-sm text-white/40">Loading…</p>
            ) : (
              <div className="space-y-2">
                {templates.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5"
                       style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="min-w-0">
                      <p className="text-sm text-white/85 truncate">
                        {t.name}
                        {t.isDefault && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full align-middle"
                                style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7" }}>Default</span>
                        )}
                      </p>
                      <p className="text-xs text-white/35 truncate">{t.subject}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!t.isDefault && (
                        <button onClick={() => void makeDefaultTemplate(t.id)} disabled={templateSaving}
                                className="text-[11px] px-2 py-1 rounded-lg btn-ghost">Make Default</button>
                      )}
                      <button onClick={() => openEditTemplateEditor(t)}
                              className="text-[11px] px-2 py-1 rounded-lg btn-ghost">Edit</button>
                      <button onClick={() => setDeletingTemplateId(t.id)} disabled={templateSaving || templates.length <= 1}
                              className="text-[11px] px-2 py-1 rounded-lg btn-ghost disabled:opacity-30">Delete</button>
                    </div>
                  </div>
                ))}

                {templateError && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                    <p className="text-xs text-red-400">{templateError}</p>
                  </div>
                )}

                <button onClick={openNewTemplateEditor} className="w-full btn-gradient py-2.5 text-sm mt-2">
                  + New Template
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Reminder Template Editor Modal ───────────────────────────────── */}
      {showTemplateEditor && (
        <div className="modal-backdrop" style={{ zIndex: 60 }}>
          <div className="modal-box max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white/90">{editingTemplateId ? "Edit Template" : "New Template"}</h2>
                <p className="text-xs text-white/35 mt-0.5">
                  Click a value below to insert it into the field you last clicked in.
                </p>
              </div>
              <button onClick={() => setShowTemplateEditor(false)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form onSubmit={saveTemplate} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Template name</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Friendly reminder"
                  value={templateDraft.name}
                  onChange={(e) => setTemplateDraft({ ...templateDraft, name: e.target.value })}
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {REMINDER_TEMPLATE_PLACEHOLDERS.map((p) => (
                  <button
                    key={p.token}
                    type="button"
                    onClick={() => insertPlaceholder(p.token)}
                    title={p.label}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-mono transition-all"
                    style={{ background: "rgba(139,92,246,0.14)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.3)" }}
                  >
                    {p.token}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Subject</label>
                <input
                  ref={subjectRef}
                  type="text"
                  className="glass-input"
                  value={templateDraft.subject}
                  onFocus={() => setActiveTemplateField("subject")}
                  onChange={(e) => setTemplateDraft({ ...templateDraft, subject: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Body</label>
                <textarea
                  ref={bodyRef}
                  rows={7}
                  className="glass-input font-mono text-xs"
                  value={templateDraft.body}
                  onFocus={() => setActiveTemplateField("body")}
                  onChange={(e) => setTemplateDraft({ ...templateDraft, body: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Preview</label>
                <div className="rounded-xl px-4 py-3 text-sm text-white/70 whitespace-pre-wrap"
                     style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-xs text-white/35 mb-2">Subject: <span className="text-white/60">{renderTemplatePreview(templateDraft.subject)}</span></p>
                  <div>{renderTemplatePreview(templateDraft.body)}</div>
                </div>
              </div>

              {templateError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                  <p className="text-xs text-red-400">{templateError}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={templateSaving} className="flex-1 btn-gradient py-2.5 text-sm">
                  {templateSaving ? "Saving…" : "Save Template"}
                </button>
                <button type="button" onClick={() => setShowTemplateEditor(false)}
                        disabled={templateSaving} className="flex-1 btn-ghost py-2.5 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Template Confirm Modal ────────────────────────────────── */}
      {deletingTemplateId && (
        <div className="modal-backdrop" style={{ zIndex: 70 }}>
          <div className="modal-box max-w-sm w-full p-6">
            <h2 className="text-base font-semibold text-white/90 mb-2">Delete template?</h2>
            <p className="text-sm text-white/45 mb-5">This can&apos;t be undone.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => void confirmDeleteTemplate()}
                      disabled={templateSaving} className="flex-1 btn-gradient py-2.5 text-sm">
                {templateSaving ? "Deleting…" : "Delete"}
              </button>
              <button type="button" onClick={() => setDeletingTemplateId(null)}
                      disabled={templateSaving} className="flex-1 btn-ghost py-2.5 text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Send Reminders Modal ─────────────────────────────────────────── */}
      {showSendModal && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white/90">Send Reminders</h2>
              <button onClick={() => setShowSendModal(false)} className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <p className="text-sm text-white/45 mb-4">
              Send a payment reminder email to every member with pending dues and an email address.
            </p>

            <div className="space-y-1.5 mb-4">
              <label className="text-xs text-white/45 ml-1">Email template</label>
              <select
                className="glass-input"
                value={sendTemplateId}
                onChange={(e) => setSendTemplateId(e.target.value)}
                disabled={templatesLoading}
              >
                <option value="">Default template</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}{t.isDefault ? " (default)" : ""}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 mb-4">
              <label className="text-xs text-white/45 ml-1">Send via</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={sendChannelEmail} onChange={(e) => setSendChannelEmail(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm text-white/80">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={sendChannelWhatsapp} onChange={(e) => setSendChannelWhatsapp(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm text-white/80">WhatsApp</span>
                </label>
              </div>
            </div>

            {sendResult && (
              <div className="rounded-xl px-3 py-2.5 mb-4 text-sm"
                   style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }}>
                Sent: {sendResult.sent} · Skipped (no email): {sendResult.skipped} · Failed: {sendResult.failed}
              </div>
            )}

            {sendError && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5 mb-4">
                <p className="text-xs text-red-400">{sendError}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button type="button" onClick={() => void sendReminders()} disabled={sendingReminders}
                      className="flex-1 btn-gradient py-2.5 text-sm">
                {sendingReminders ? "Sending…" : "Send Reminders"}
              </button>
              <button type="button" onClick={() => setShowSendModal(false)}
                      disabled={sendingReminders} className="flex-1 btn-ghost py-2.5 text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bulk Payment Modal ────────────────────────────────────────────── */}
      {showBulkModal && (
        <BulkPaymentModal
          members={members}
          onClose={() => setShowBulkModal(false)}
          onDone={() => { void load(); }}
        />
      )}

      {/* ── Single Add Payment Modal ──────────────────────────────────────── */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white/90">Add Payment</h2>
                <p className="text-xs text-white/35 mt-0.5">
                  Period: <span className="text-white/60 font-medium">{fmtPeriod(addMonth, addYear)}</span>
                </p>
              </div>
              <button onClick={() => { setShowAddModal(false); setAddPaymentError(null); setAddFieldErrors({}); }}
                      className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <form onSubmit={addPayment} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Member *</label>
                <select name="memberId"
                        className={["glass-input", addFieldErrors.memberId ? "!border-red-500/50" : ""].join(" ")}
                        onChange={() => setAddFieldErrors((p) => ({ ...p, memberId: "" }))}>
                  <option value="">Select member…</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.memberUid})</option>
                  ))}
                </select>
                {addFieldErrors.memberId && <p className="text-xs text-red-400 mt-1 ml-1">{addFieldErrors.memberId}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Month *</label>
                  <select value={addMonth} onChange={(e) => setAddMonth(Number(e.target.value))} className="glass-input cursor-pointer">
                    {MONTH_NAMES.map((m, i) => (
                      <option key={i + 1} value={i + 1}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Year *</label>
                  <YearStepper value={addYear} onChange={setAddYear} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Contribution (₹) *</label>
                <GlassInput name="baseAmount" type="number" step="0.01" placeholder="1000" min="0.01"
                            error={addFieldErrors.baseAmount}
                            onChange={() => setAddFieldErrors((p) => ({ ...p, baseAmount: "" }))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-white/45 ml-1">Penalty (₹)</label>
                <GlassInput name="penaltyAmount" type="number" step="0.01" placeholder="0" defaultValue="0" min="0"
                            error={addFieldErrors.penaltyAmount}
                            onChange={() => setAddFieldErrors((p) => ({ ...p, penaltyAmount: "" }))} />
              </div>
              {addPaymentError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <p className="text-xs text-red-400">{addPaymentError}</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={addingPayment} className="flex-1 btn-gradient py-2.5 text-sm">
                  {addingPayment ? "Saving…" : "Save Payment"}
                </button>
                <button type="button" onClick={() => { setShowAddModal(false); setAddFieldErrors({}); setAddPaymentError(null); }}
                        disabled={addingPayment} className="flex-1 btn-ghost py-2.5 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
