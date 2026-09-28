"use client";

import { useEffect, useState } from "react";
import { type FieldErrors } from "@/lib/validators/client";

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

function validateContribution(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  const amount = Number(fd.get("amount"));
  const month = Number(fd.get("month"));
  const year = Number(fd.get("year"));

  if (!fd.get("amount") || isNaN(amount) || amount <= 0) errs.amount = "Amount must be greater than 0.";
  if (!fd.get("month") || isNaN(month) || month < 1 || month > 12) errs.month = "Month must be between 1 and 12.";
  if (!fd.get("year") || isNaN(year) || year < 2000 || year > 3000) errs.year = "Enter a valid year (2000–3000).";

  return errs;
}

function validatePenalty(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  const amount = Number(fd.get("amount"));
  const effectiveFrom = String(fd.get("effectiveFrom") ?? "").trim();

  if (!fd.get("amount") || isNaN(amount) || amount < 0) errs.amount = "Penalty amount cannot be negative.";
  if (!effectiveFrom) errs.effectiveFrom = "Effective from date is required.";

  return errs;
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
  const [contributionFieldErrors, setContributionFieldErrors] = useState<FieldErrors>({});
  const [penaltyError, setPenaltyError] = useState<string | null>(null);
  const [penaltyFieldErrors, setPenaltyFieldErrors] = useState<FieldErrors>({});

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

  useEffect(() => { void load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function createContribution(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContributionError(null);
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const errs = validateContribution(form);
    setContributionFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCreatingContribution(true);
    try {
      const res = await fetch(`${base}/contribution`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          amountPaise: Math.round(Number(form.get("amount") ?? 0) * 100),
          effectiveFromMonth: Number(form.get("month") ?? 0),
          effectiveFromYear: Number(form.get("year") ?? 0),
        }),
      });
      const json = await res.json();
      if (!res.ok) { setContributionError(json?.error ?? "Failed to create contribution rule."); return; }
      formEl.reset();
      setContributionFieldErrors({});
      await load();
    } finally {
      setCreatingContribution(false);
    }
  }

  async function createPenalty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPenaltyError(null);
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    const errs = validatePenalty(form);
    setPenaltyFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCreatingPenalty(true);
    try {
      const res = await fetch(`${base}/penalty`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          amountPaise: Math.round(Number(form.get("amount") ?? 0) * 100),
          effectiveFrom: new Date(String(form.get("effectiveFrom") ?? "")),
        }),
      });
      const json = await res.json();
      if (!res.ok) { setPenaltyError(json?.error ?? "Failed to create penalty rule."); return; }
      formEl.reset();
      setPenaltyFieldErrors({});
      await load();
    } finally {
      setCreatingPenalty(false);
    }
  }

  async function deleteContribution(id: string) {
    if (!confirm("Delete this contribution rule?")) return;
    setDeletingContribution(id);
    try {
      const res = await fetch(`${base}/contribution/${id}`, { method: "DELETE" });
      if (!res.ok) { const json = await res.json(); alert(json?.error ?? "Failed to delete"); return; }
      await load();
    } finally {
      setDeletingContribution(null);
    }
  }

  async function deletePenalty(id: string) {
    if (!confirm("Delete this penalty rule?")) return;
    setDeletingPenalty(id);
    try {
      const res = await fetch(`${base}/penalty/${id}`, { method: "DELETE" });
      if (!res.ok) { const json = await res.json(); alert(json?.error ?? "Failed to delete"); return; }
      await load();
    } finally {
      setDeletingPenalty(null);
    }
  }

  return (
    <div className="space-y-8">

      {/* ── Contribution Rules ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Configuration</p>
            <h2 className="text-lg font-bold text-white/90">Contribution Rules</h2>
          </div>
          {loading && (
            <div className="w-4 h-4 rounded-full border-2 border-violet-400/40 border-t-violet-400 animate-spin" />
          )}
        </div>

        {mode === "admin" && (
          <form onSubmit={createContribution}
                className="rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Amount (₹) *</label>
              <GlassInput
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="1000"
                error={contributionFieldErrors.amount}
                onChange={() => setContributionFieldErrors((p) => ({ ...p, amount: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Month *</label>
              <GlassInput
                name="month"
                type="number"
                min={1}
                max={12}
                placeholder="1–12"
                error={contributionFieldErrors.month}
                onChange={() => setContributionFieldErrors((p) => ({ ...p, month: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Year *</label>
              <GlassInput
                name="year"
                type="number"
                min={2000}
                max={3000}
                placeholder="2025"
                error={contributionFieldErrors.year}
                onChange={() => setContributionFieldErrors((p) => ({ ...p, year: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1 invisible">Add</label>
              <button type="submit" disabled={creatingContribution} className="btn-gradient w-full py-2 text-xs">
                {creatingContribution ? "Saving…" : "Add Rule"}
              </button>
            </div>
            {contributionError && (
              <div className="sm:col-span-2 lg:col-span-4 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <p className="text-xs text-red-400">{contributionError}</p>
              </div>
            )}
          </form>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl"
             style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <table className="glass-table min-w-full">
            <thead>
              <tr>
                <th>Effective</th>
                <th>Amount</th>
                <th>Created</th>
                {mode === "admin" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {contribution.length === 0 ? (
                <tr>
                  <td colSpan={mode === "admin" ? 4 : 3} className="text-center py-8">
                    <p className="text-white/30 text-sm">No contribution rules yet</p>
                  </td>
                </tr>
              ) : contribution.map((r) => (
                <tr key={r.id}>
                  <td className="text-white/70">{r.effectiveFromMonth}/{r.effectiveFromYear}</td>
                  <td className="font-semibold" style={{ color: "#c4b5fd" }}>{fmt(r.amountPaise)}</td>
                  <td className="text-white/40 text-xs">{new Date(r.createdAt).toLocaleString()}</td>
                  {mode === "admin" && (
                    <td>
                      <button onClick={() => deleteContribution(r.id)} disabled={deletingContribution === r.id}
                              className="rounded-lg px-2.5 py-1 text-[11px] font-medium disabled:opacity-50"
                              style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.16)" }}>
                        {deletingContribution === r.id ? "Deleting…" : "Delete"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2">
          {contribution.length === 0 ? (
            <div className="rounded-2xl p-5 text-center" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p className="text-white/30 text-sm">No contribution rules yet</p>
            </div>
          ) : contribution.map((r) => (
            <div key={r.id} className="rounded-2xl p-4 flex items-center justify-between gap-3"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div>
                <div className="text-sm font-semibold text-white/80">{r.effectiveFromMonth}/{r.effectiveFromYear}</div>
                <div className="text-xs text-white/35 mt-0.5">{new Date(r.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color: "#c4b5fd" }}>{fmt(r.amountPaise)}</span>
                {mode === "admin" && (
                  <button onClick={() => deleteContribution(r.id)} disabled={deletingContribution === r.id}
                          className="rounded-lg px-2.5 py-1 text-[11px] font-medium disabled:opacity-50"
                          style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.16)" }}>
                    {deletingContribution === r.id ? "…" : "Delete"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

      {/* ── Penalty Rules ── */}
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Configuration</p>
          <h2 className="text-lg font-bold text-white/90">Penalty Rules</h2>
        </div>

        {mode === "admin" && (
          <form onSubmit={createPenalty}
                className="rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Penalty (₹) *</label>
              <GlassInput
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="50"
                error={penaltyFieldErrors.amount}
                onChange={() => setPenaltyFieldErrors((p) => ({ ...p, amount: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Effective From *</label>
              <GlassInput
                name="effectiveFrom"
                type="date"
                error={penaltyFieldErrors.effectiveFrom}
                onChange={() => setPenaltyFieldErrors((p) => ({ ...p, effectiveFrom: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1 invisible">Add</label>
              <button type="submit" disabled={creatingPenalty} className="btn-gradient w-full py-2 text-xs">
                {creatingPenalty ? "Saving…" : "Add Rule"}
              </button>
            </div>
            {penaltyError && (
              <div className="sm:col-span-3 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <p className="text-xs text-red-400">{penaltyError}</p>
              </div>
            )}
          </form>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl"
             style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <table className="glass-table min-w-full">
            <thead>
              <tr>
                <th>Effective From</th>
                <th>Amount</th>
                <th>Created</th>
                {mode === "admin" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {penalty.length === 0 ? (
                <tr>
                  <td colSpan={mode === "admin" ? 4 : 3} className="text-center py-8">
                    <p className="text-white/30 text-sm">No penalty rules yet</p>
                  </td>
                </tr>
              ) : penalty.map((r) => (
                <tr key={r.id}>
                  <td className="text-white/70">{new Date(r.effectiveFrom).toLocaleDateString()}</td>
                  <td className="font-semibold" style={{ color: "#fca5a5" }}>{fmt(r.amountPaise)}</td>
                  <td className="text-white/40 text-xs">{new Date(r.createdAt).toLocaleString()}</td>
                  {mode === "admin" && (
                    <td>
                      <button onClick={() => deletePenalty(r.id)} disabled={deletingPenalty === r.id}
                              className="rounded-lg px-2.5 py-1 text-[11px] font-medium disabled:opacity-50"
                              style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.16)" }}>
                        {deletingPenalty === r.id ? "Deleting…" : "Delete"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2">
          {penalty.length === 0 ? (
            <div className="rounded-2xl p-5 text-center" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
              <p className="text-white/30 text-sm">No penalty rules yet</p>
            </div>
          ) : penalty.map((r) => (
            <div key={r.id} className="rounded-2xl p-4 flex items-center justify-between gap-3"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div>
                <div className="text-sm font-semibold text-white/80">{new Date(r.effectiveFrom).toLocaleDateString()}</div>
                <div className="text-xs text-white/35 mt-0.5">{new Date(r.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold" style={{ color: "#fca5a5" }}>{fmt(r.amountPaise)}</span>
                {mode === "admin" && (
                  <button onClick={() => deletePenalty(r.id)} disabled={deletingPenalty === r.id}
                          className="rounded-lg px-2.5 py-1 text-[11px] font-medium disabled:opacity-50"
                          style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.16)" }}>
                    {deletingPenalty === r.id ? "…" : "Delete"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
