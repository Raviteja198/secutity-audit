"use client";

import { useEffect, useRef, useState } from "react";
import { isValidUrl, type FieldErrors } from "@/lib/validators/client";

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

function validateCharityCreate(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  const title = String(fd.get("title") ?? "").trim();
  const beneficiary = String(fd.get("beneficiary") ?? "").trim();
  const amount = Number(fd.get("amount"));
  const date = String(fd.get("date") ?? "").trim();
  const imageUrl = String(fd.get("imageUrl") ?? "").trim();

  if (!title) errs.title = "Title is required.";
  else if (title.length < 2) errs.title = "Title must be at least 2 characters.";
  else if (title.length > 200) errs.title = "Title must be 200 characters or less.";

  if (!beneficiary) errs.beneficiary = "Beneficiary is required.";
  else if (beneficiary.length < 2) errs.beneficiary = "Beneficiary must be at least 2 characters.";

  if (!fd.get("amount") || isNaN(amount) || amount <= 0) errs.amount = "Amount must be greater than 0.";

  if (!date) errs.date = "Date is required.";

  if (imageUrl && !isValidUrl(imageUrl)) errs.imageUrl = "Enter a valid URL starting with http:// or https://";

  return errs;
}

export function CharityTable({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/charity" : "/api/user/charity";
  const [items, setItems] = useState<Charity[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creatingCharity, setCreatingCharity] = useState(false);
  const [createCharityError, setCreateCharityError] = useState<string | null>(null);
  const [createFieldErrors, setCreateFieldErrors] = useState<FieldErrors>({});
  const [deleting, setDeleting] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function load() {
    const res = await fetch(base, { cache: "no-store" });
    const json = await res.json();
    setItems(json.items ?? []);
  }

  useEffect(() => { void load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateCharityError(null);
    const fd = new FormData(e.currentTarget);

    const errs = validateCharityCreate(fd);
    setCreateFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCreatingCharity(true);
    try {
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
      if (!res.ok) { setCreateCharityError(json?.error ?? "Failed to create charity entry."); return; }
      formRef.current?.reset();
      setCreateFieldErrors({});
      setShowCreate(false);
      await load();
    } finally {
      setCreatingCharity(false);
    }
  }

  async function deleteCharity(id: string) {
    if (!confirm("Delete this charity entry? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${base}/${id}/delete`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) { alert(json?.error ?? "Failed to delete charity entry"); return; }
      await load();
    } finally {
      setDeleting(null);
    }
  }

  const totalDonated = items.reduce((s, c) => s + c.amountPaise, 0);

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Community</p>
          <h2 className="text-lg font-bold text-white/90">Charity</h2>
        </div>
        {mode === "admin" && (
          <button onClick={() => setShowCreate(!showCreate)}
                  className="btn-gradient text-xs px-3 py-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add Entry
          </button>
        )}
      </div>

      {/* Stats card */}
      <div className="rounded-2xl p-4"
           style={{ background: "linear-gradient(135deg,rgba(236,72,153,0.16),rgba(139,92,246,0.1))", border: "1px solid rgba(236,72,153,0.22)" }}>
        <p className="text-xs text-white/40 mb-1">Total Donations</p>
        <p className="text-2xl font-bold" style={{ color: "#f9a8d4" }}>{fmt(totalDonated)}</p>
        <p className="text-xs text-white/30 mt-0.5">{items.length} entries</p>
      </div>

      {/* Create Form */}
      {showCreate && mode === "admin" && (
        <div className="rounded-2xl p-5 space-y-4"
             style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <h3 className="text-sm font-semibold text-white/80">New Charity Entry</h3>
          <form ref={formRef} onSubmit={create} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Title *</label>
              <GlassInput
                name="title"
                placeholder="Charity title"
                disabled={creatingCharity}
                error={createFieldErrors.title}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, title: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Beneficiary *</label>
              <GlassInput
                name="beneficiary"
                placeholder="Beneficiary name"
                disabled={creatingCharity}
                error={createFieldErrors.beneficiary}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, beneficiary: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Amount (₹) *</label>
              <GlassInput
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="500"
                disabled={creatingCharity}
                error={createFieldErrors.amount}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, amount: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Date *</label>
              <GlassInput
                name="date"
                type="date"
                disabled={creatingCharity}
                error={createFieldErrors.date}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, date: "" }))}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Purpose</label>
              <GlassInput name="purpose" placeholder="Optional purpose" disabled={creatingCharity} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Image URL</label>
              <GlassInput
                name="imageUrl"
                placeholder="https://…"
                disabled={creatingCharity}
                error={createFieldErrors.imageUrl}
                onChange={() => setCreateFieldErrors((p) => ({ ...p, imageUrl: "" }))}
              />
            </div>
            {createCharityError && (
              <div className="sm:col-span-2 lg:col-span-3 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <p className="text-xs text-red-400">{createCharityError}</p>
              </div>
            )}
            <div className="sm:col-span-2 lg:col-span-3 flex gap-2 pt-1">
              <button type="submit" disabled={creatingCharity} className="btn-gradient text-xs px-4 py-2">
                {creatingCharity ? "Creating…" : "Create Entry"}
              </button>
              <button type="button" onClick={() => { setShowCreate(false); setCreateFieldErrors({}); setCreateCharityError(null); }} className="btn-ghost text-xs px-4 py-2">Cancel</button>
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
              <th>Date</th>
              <th>Title</th>
              <th>Beneficiary</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Image</th>
              {mode === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={mode === "admin" ? 7 : 6} className="text-center py-10">
                  <p className="text-white/30 text-sm">No charity entries yet</p>
                </td>
              </tr>
            ) : items.map((c) => (
              <tr key={c.id}>
                <td className="text-white/50 text-sm">{new Date(c.date).toLocaleDateString()}</td>
                <td className="font-medium text-white/90 text-sm">{c.title}</td>
                <td className="text-white/60 text-sm">{c.beneficiary}</td>
                <td className="font-semibold text-sm" style={{ color: "#f9a8d4" }}>{fmt(c.amountPaise)}</td>
                <td className="text-white/50 text-sm">{c.purpose ?? "—"}</td>
                <td>
                  {c.imageUrl ? (
                    <a href={c.imageUrl} target="_blank" rel="noreferrer"
                       className="text-xs hover:underline" style={{ color: "#93c5fd" }}>View</a>
                  ) : <span className="text-white/25">—</span>}
                </td>
                {mode === "admin" && (
                  <td>
                    <button onClick={() => deleteCharity(c.id)} disabled={deleting === c.id}
                            className="rounded-lg px-2.5 py-1 text-[11px] font-medium disabled:opacity-50"
                            style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.16)" }}>
                      {deleting === c.id ? "…" : "Delete"}
                    </button>
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
            <p className="text-white/30 text-sm">No charity entries yet</p>
          </div>
        ) : items.map((c) => (
          <div key={c.id} className="rounded-2xl p-4 space-y-3"
               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm text-white/90">{c.title}</div>
                <div className="text-xs text-white/35 mt-0.5">{new Date(c.date).toLocaleDateString()}</div>
              </div>
              <span className="text-sm font-bold" style={{ color: "#f9a8d4" }}>{fmt(c.amountPaise)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/35">Beneficiary</span>
                <div className="text-white/70 mt-0.5">{c.beneficiary}</div>
              </div>
              {c.purpose && (
                <div>
                  <span className="text-white/35">Purpose</span>
                  <div className="text-white/70 mt-0.5">{c.purpose}</div>
                </div>
              )}
            </div>
            {c.imageUrl && (
              <a href={c.imageUrl} target="_blank" rel="noreferrer"
                 className="text-xs" style={{ color: "#93c5fd" }}>
                📷 View Image
              </a>
            )}
            {mode === "admin" && (
              <div className="pt-2 border-t border-white/5">
                <button onClick={() => deleteCharity(c.id)} disabled={deleting === c.id}
                        className="w-full rounded-xl py-1.5 text-xs font-medium disabled:opacity-50"
                        style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.16)" }}>
                  {deleting === c.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
