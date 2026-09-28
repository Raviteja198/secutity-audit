"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { isValidEmail, type FieldErrors } from "@/lib/validators/client";

type Member = {
  id: string;
  memberUid: string;
  fullName: string;
  phone?: string | null;
  email?: string | null;
  status: "ACTIVE" | "INACTIVE";
  joinDate: string;
  exitDate?: string | null;
  hasLogin?: boolean;
  loginEmail?: string | null;
  otpGeneratedAt?: string | null;
  lastLoginAt?: string | null;
};

type BulkRow = {
  fullName: string;
  phone?: string;
  email?: string;
  joinDate: string;
  memberUid?: string;
  address?: string;
};

type BulkResult = {
  row: number;
  fullName: string;
  success: boolean;
  memberUid?: string;
  error?: string;
};

/**
 * Parses pasted Excel/CSV/TSV data into BulkRow objects.
 * Auto-detects separator (tab or comma).
 * Accepts headers: Full Name, Phone, Email, Join Date, Member UID, Address (case-insensitive, any order).
 */
function parsePastedData(raw: string): BulkRow[] {
  const lines = raw.trim().split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return [];

  const sep = lines[0].includes("\t") ? "\t" : ",";
  const splitRow = (line: string) =>
    line.split(sep).map((c) => c.trim().replace(/^["']|["']$/g, ""));

  const header = splitRow(lines[0]).map((h) => h.toLowerCase());

  // Check if first row looks like a header (contains recognizable column names)
  const headerKeywords = ["name", "phone", "email", "date", "uid", "id", "address"];
  const isHeader = headerKeywords.some((kw) => header.some((h) => h.includes(kw)));

  const colIndex = (keywords: string[]) => {
    for (const kw of keywords) {
      const i = header.findIndex((h) => h.includes(kw));
      if (i !== -1) return i;
    }
    return -1;
  };

  let nameCol: number, phoneCol: number, emailCol: number, dateCol: number, uidCol: number, addrCol: number;

  if (isHeader) {
    nameCol  = colIndex(["name"]);
    phoneCol = colIndex(["phone", "mobile", "contact"]);
    emailCol = colIndex(["email", "mail"]);
    dateCol  = colIndex(["date", "join", "doj"]);
    uidCol   = colIndex(["uid", "id", "member id", "member no"]);
    addrCol  = colIndex(["address", "addr"]);
  } else {
    // No headers: assume columns are Full Name, Phone, Email, Join Date
    nameCol = 0; phoneCol = 1; emailCol = 2; dateCol = 3; uidCol = 4; addrCol = 5;
  }

  const dataLines = isHeader ? lines.slice(1) : lines;

  return dataLines
    .map((line) => {
      const cols = splitRow(line);
      return {
        fullName: nameCol >= 0 ? cols[nameCol] ?? "" : cols[0] ?? "",
        phone: phoneCol >= 0 ? cols[phoneCol] ?? "" : "",
        email: emailCol >= 0 ? cols[emailCol] ?? "" : "",
        joinDate: dateCol >= 0 ? cols[dateCol] ?? "" : "",
        memberUid: uidCol >= 0 ? cols[uidCol] ?? "" : "",
        address: addrCol >= 0 ? cols[addrCol] ?? "" : "",
      } satisfies BulkRow;
    })
    .filter((r) => r.fullName.trim());
}

function GlassInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <>
      <input
        {...props}
        className={["glass-input", error ? "!border-red-500/50 focus:!ring-red-500/20" : "", props.className ?? ""].join(" ")}
      />
      {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
    </>
  );
}

function validateMemberCreate(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  const fullName = String(fd.get("fullName") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const joinDate = String(fd.get("joinDate") ?? "").trim();

  if (!fullName) errs.fullName = "Full name is required.";
  else if (fullName.length < 2) errs.fullName = "Name must be at least 2 characters.";
  else if (fullName.length > 200) errs.fullName = "Name must be 200 characters or less.";

  if (phone && phone.length < 6) errs.phone = "Phone must be at least 6 characters.";
  else if (phone && phone.length > 32) errs.phone = "Phone is too long.";

  if (email && !isValidEmail(email)) errs.email = "Enter a valid email address.";

  if (!joinDate) errs.joinDate = "Join date is required.";

  return errs;
}

function validateMemberEdit(fd: FormData): FieldErrors {
  const errs: FieldErrors = {};
  const memberUid = String(fd.get("memberUid") ?? "").trim();
  const fullName = String(fd.get("fullName") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const joinDate = String(fd.get("joinDate") ?? "").trim();

  if (memberUid && memberUid.length < 3) errs.memberUid = "Member UID must be at least 3 characters.";

  if (!fullName) errs.fullName = "Full name is required.";
  else if (fullName.length < 2) errs.fullName = "Name must be at least 2 characters.";

  if (phone && phone.length < 6) errs.phone = "Phone must be at least 6 characters.";

  if (email && !isValidEmail(email)) errs.email = "Enter a valid email address.";

  if (!joinDate) errs.joinDate = "Join date is required.";

  return errs;
}

export function MembersTable({ mode }: { mode: "admin" | "user" }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [items, setItems] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creatingMember, setCreatingMember] = useState(false);
  const [createMemberError, setCreateMemberError] = useState<string | null>(null);
  const [createFieldErrors, setCreateFieldErrors] = useState<FieldErrors>({});
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [updateMemberError, setUpdateMemberError] = useState<string | null>(null);
  const [editFieldErrors, setEditFieldErrors] = useState<FieldErrors>({});

  // OTP modal state
  const [otpMember, setOtpMember] = useState<Member | null>(null);
  const [otpEmail, setOtpEmail] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpResult, setOtpResult] = useState<{ otp: string; loginEmail: string; memberName: string } | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Bulk import state
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkRawText, setBulkRawText] = useState("");
  const [bulkParsed, setBulkParsed] = useState<BulkRow[] | null>(null);
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkResults, setBulkResults] = useState<BulkResult[] | null>(null);
  const [bulkSummary, setBulkSummary] = useState<{ created: number; failed: number } | null>(null);

  const apiBase = mode === "admin" ? "/api/admin/members" : "/api/user/members";
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const url = new URL(apiBase, window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      if (q.trim()) url.searchParams.set("q", q.trim());
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to load members");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [apiBase, page, pageSize, q]);

  useEffect(() => { void load(); }, [load]);

  async function createMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreateMemberError(null);
    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    const errs = validateMemberCreate(form);
    setCreateFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setCreatingMember(true);
    try {
      const payload = Object.fromEntries(form.entries());
      const res = await fetch(apiBase, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          joinDate: payload.joinDate ? new Date(String(payload.joinDate)) : new Date(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setCreateMemberError(json?.error ?? "Failed to create member.");
        return;
      }
      formElement.reset();
      setCreateFieldErrors({});
      setShowCreate(false);
      setPage(1);
      await load();
    } finally {
      setCreatingMember(false);
    }
  }

  async function updateMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingMember) return;
    setUpdateMemberError(null);
    const form = new FormData(e.currentTarget);

    const errs = validateMemberEdit(form);
    setEditFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const payload = Object.fromEntries(form.entries());
    const res = await fetch(`/api/admin/members/${editingMember.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        joinDate: payload.joinDate ? new Date(String(payload.joinDate)) : new Date(),
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      setUpdateMemberError(json?.error ?? "Failed to update member.");
      return;
    }
    setEditingMember(null);
    setEditFieldErrors({});
    await load();
  }

  async function deactivateMember(id: string) {
    if (!confirm("Deactivate this member?")) return;
    const res = await fetch(`/api/admin/members/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!res.ok) { alert(json?.error ?? "Failed to deactivate"); return; }
    await load();
  }

  async function reactivateMember(id: string) {
    const res = await fetch(`/api/admin/members/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "ACTIVE", exitDate: null }),
    });
    const json = await res.json();
    if (!res.ok) { alert(json?.error ?? "Failed to reactivate"); return; }
    await load();
  }

  function openOtpModal(m: Member) {
    setOtpMember(m);
    setOtpEmail(m.loginEmail ?? m.email ?? "");
    setOtpResult(null);
    setOtpError(null);
  }

  async function generateOtp() {
    if (!otpMember) return;
    setOtpLoading(true);
    setOtpError(null);
    setOtpResult(null);
    try {
      const res = await fetch(`/api/admin/members/${otpMember.id}/otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: otpEmail.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok) {
        setOtpError(json?.error ?? "Failed to generate OTP.");
        return;
      }
      setOtpResult(json);
      // Refresh list to update hasLogin badge
      await load();
    } finally {
      setOtpLoading(false);
    }
  }

  function openBulkImport() {
    setBulkRawText("");
    setBulkParsed(null);
    setBulkResults(null);
    setBulkSummary(null);
    setShowBulkImport(true);
  }

  function parseBulkPreview() {
    const rows = parsePastedData(bulkRawText);
    setBulkParsed(rows);
    setBulkResults(null);
    setBulkSummary(null);
  }

  async function runBulkImport() {
    if (!bulkParsed || bulkParsed.length === 0) return;
    setBulkImporting(true);
    setBulkResults(null);
    try {
      const res = await fetch("/api/admin/members/bulk", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ members: bulkParsed }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json?.error ?? "Import failed.");
        return;
      }
      setBulkResults(json.results ?? []);
      setBulkSummary({ created: json.created, failed: json.failed });
      if (json.created > 0) await load();
    } finally {
      setBulkImporting(false);
    }
  }

  return (
    <div className="space-y-4">

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <GlassInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { setPage(1); void load(); } }}
            placeholder="Search member by name or ID…"
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setPage(1); void load(); }}
            className="btn-ghost text-xs px-3 py-2"
          >
            Search
          </button>
          {mode === "admin" && (
            <>
              <button
                onClick={openBulkImport}
                className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"
                title="Import multiple members from Excel/CSV"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Bulk Import
              </button>
              <button
                onClick={() => setShowCreate(!showCreate)}
                className="btn-gradient text-xs px-3 py-2 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Member
              </button>
            </>
          )}
        </div>
      </div>

      {/* Create form */}
      {showCreate && mode === "admin" && (
        <div className="rounded-2xl p-4 sm:p-5 space-y-4"
             style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <h3 className="text-sm font-semibold text-white/80">Add New Member</h3>
          <form onSubmit={createMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Full Name *</label>
              <GlassInput name="fullName" placeholder="Full name" error={createFieldErrors.fullName} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Phone</label>
              <GlassInput name="phone" placeholder="Phone number" error={createFieldErrors.phone} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Email</label>
              <GlassInput name="email" type="email" placeholder="Email address" error={createFieldErrors.email} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Join Date *</label>
              <GlassInput name="joinDate" type="date" error={createFieldErrors.joinDate} />
            </div>
            {createMemberError && (
              <div className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs text-red-400">{createMemberError}</p>
              </div>
            )}
            <div className="sm:col-span-2 flex gap-2 pt-1">
              <button type="submit" disabled={creatingMember} className="btn-gradient text-xs px-4 py-2">
                {creatingMember ? "Creating…" : "Create Member"}
              </button>
              <button type="button" onClick={() => { setShowCreate(false); setCreateFieldErrors({}); setCreateMemberError(null); }} className="btn-ghost text-xs px-4 py-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Load error */}
      {loadError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {loadError}
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl"
           style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <table className="glass-table min-w-full">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Phone</th>
              <th>Email</th>
              {mode === "admin" && <th>Last Login</th>}
              {mode === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody className="clarity-mask">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: mode === "admin" ? 8 : 6 }).map((_, j) => (
                    <td key={j}>
                      <div className="h-4 rounded-md bg-white/5 animate-pulse w-20" />
                    </td>
                  ))}
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={mode === "admin" ? 8 : 6} className="text-center py-10">
                  <p className="text-white/30 text-sm">No members found</p>
                </td>
              </tr>
            ) : items.map((m) => (
              <tr key={m.id}>
                <td>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-lg"
                        style={{ background: "rgba(139,92,246,0.12)", color: "#c4b5fd" }}>
                    {m.memberUid}
                  </span>
                </td>
                <td className="font-medium text-white/90">{m.fullName}</td>
                <td>
                  <span className={m.status === "ACTIVE" ? "badge-active" : "badge-inactive"}>
                    {m.status}
                  </span>
                </td>
                <td className="text-white/50">{new Date(m.joinDate).toLocaleDateString()}</td>
                <td className="text-white/50">{m.phone ?? "—"}</td>
                <td className="text-white/50">{m.email ?? "—"}</td>
                {mode === "admin" && (
                  <td className="text-white/50">{m.lastLoginAt ? new Date(m.lastLoginAt).toLocaleString() : "Never"}</td>
                )}
                {mode === "admin" && (
                  <td>
                    <div className="flex flex-wrap gap-1.5">
                      {/* OTP / Login button — always visible */}
                      <button
                        onClick={() => openOtpModal(m)}
                        className="rounded-lg px-2.5 py-1 text-xs font-medium transition flex items-center gap-1"
                        style={m.hasLogin
                          ? { background: "rgba(245,158,11,0.1)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.2)" }
                          : { background: "rgba(139,92,246,0.12)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.25)" }
                        }
                        title={m.hasLogin ? "Reset OTP / change login" : "Create login for this member"}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        {m.hasLogin ? "Reset OTP" : "Set Login"}
                      </button>

                      {m.status === "ACTIVE" ? (
                        <>
                          <button
                            onClick={() => setEditingMember(m)}
                            className="rounded-lg px-2.5 py-1 text-xs font-medium transition"
                            style={{ background: "rgba(59,130,246,0.12)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.2)" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deactivateMember(m.id)}
                            className="rounded-lg px-2.5 py-1 text-xs font-medium transition"
                            style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }}
                          >
                            Deactivate
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => reactivateMember(m.id)}
                          className="rounded-lg px-2.5 py-1 text-xs font-medium transition"
                          style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.2)" }}
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
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
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl p-4 animate-pulse"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="h-4 w-32 bg-white/8 rounded-md mb-2" />
              <div className="h-3 w-20 bg-white/5 rounded-md" />
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="rounded-2xl p-6 text-center"
               style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
            <p className="text-white/30 text-sm">No members found</p>
          </div>
        ) : items.map((m) => (
          <div key={m.id} className="rounded-2xl p-4 space-y-3"
               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="font-semibold text-sm text-white/90">{m.fullName}</div>
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md mt-0.5 inline-block"
                      style={{ background: "rgba(139,92,246,0.12)", color: "#c4b5fd" }}>
                  {m.memberUid}
                </span>
              </div>
              <span className={m.status === "ACTIVE" ? "badge-active" : "badge-inactive"}>
                {m.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/35">Join Date</span>
                <div className="text-white/70 mt-0.5">{new Date(m.joinDate).toLocaleDateString()}</div>
              </div>
              {m.phone && (
                <div>
                  <span className="text-white/35">Phone</span>
                  <div className="text-white/70 mt-0.5">{m.phone}</div>
                </div>
              )}
              {m.email && (
                <div className="col-span-2">
                  <span className="text-white/35">Email</span>
                  <div className="text-white/70 mt-0.5 truncate">{m.email}</div>
                </div>
              )}
              {mode === "admin" && (
                <div className="col-span-2">
                  <span className="text-white/35">Last Login</span>
                  <div className="text-white/70 mt-0.5">{m.lastLoginAt ? new Date(m.lastLoginAt).toLocaleString() : "Never"}</div>
                </div>
              )}
            </div>
            {mode === "admin" && (
              <div className="space-y-2 pt-1 border-t border-white/5">
                {/* Login / OTP row */}
                <button
                  onClick={() => openOtpModal(m)}
                  className="w-full rounded-xl py-1.5 text-xs font-medium transition flex items-center justify-center gap-1.5"
                  style={m.hasLogin
                    ? { background: "rgba(245,158,11,0.08)", color: "#fcd34d", border: "1px solid rgba(245,158,11,0.2)" }
                    : { background: "rgba(139,92,246,0.1)", color: "#c4b5fd", border: "1px solid rgba(139,92,246,0.22)" }
                  }
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  {m.hasLogin ? "Reset Login OTP" : "Create Login"}
                </button>
                {/* Edit / Deactivate row */}
                <div className="flex gap-2">
                  {m.status === "ACTIVE" ? (
                    <>
                      <button
                        onClick={() => setEditingMember(m)}
                        className="flex-1 rounded-xl py-1.5 text-xs font-medium transition"
                        style={{ background: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.18)" }}
                      >Edit</button>
                      <button
                        onClick={() => deactivateMember(m.id)}
                        className="flex-1 rounded-xl py-1.5 text-xs font-medium transition"
                        style={{ background: "rgba(239,68,68,0.08)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.18)" }}
                      >Deactivate</button>
                    </>
                  ) : (
                    <button
                      onClick={() => reactivateMember(m.id)}
                      className="w-full rounded-xl py-1.5 text-xs font-medium transition"
                      style={{ background: "rgba(16,185,129,0.08)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.18)" }}
                    >Reactivate</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1">
        <p className="text-xs text-white/35">
          Page {page} of {totalPages} · {total} members
        </p>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-35"
          >← Prev</button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-35"
          >Next →</button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-white/90">Edit Member</h3>
              <button onClick={() => { setEditingMember(null); setEditFieldErrors({}); setUpdateMemberError(null); }}
                      className="text-white/30 hover:text-white/70 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <form onSubmit={updateMember} className="space-y-3">
              {[
                { label: "Member UID", name: "memberUid", defaultValue: editingMember.memberUid, type: "text" },
                { label: "Full Name *", name: "fullName", defaultValue: editingMember.fullName, type: "text" },
                { label: "Phone", name: "phone", defaultValue: editingMember.phone ?? "", type: "text" },
                { label: "Email", name: "email", defaultValue: editingMember.email ?? "", type: "email" },
                { label: "Join Date *", name: "joinDate", defaultValue: editingMember.joinDate.split("T")[0], type: "date" },
              ].map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">{f.label}</label>
                  <GlassInput name={f.name} defaultValue={f.defaultValue} type={f.type} error={editFieldErrors[f.name]} />
                </div>
              ))}
              {updateMemberError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-xs text-red-400">{updateMemberError}</p>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 btn-gradient py-2 text-sm">Update</button>
                <button type="button" onClick={() => { setEditingMember(null); setEditFieldErrors({}); setUpdateMemberError(null); }} className="flex-1 btn-ghost py-2 text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── OTP / Login Modal ────────────────────────────────────────────── */}
      {otpMember && mode === "admin" && (
        <div className="modal-backdrop">
          <div className="modal-box max-w-sm w-full p-6 space-y-5">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white/90">
                  {otpMember.hasLogin ? "Reset Login OTP" : "Create Member Login"}
                </h3>
                <p className="text-xs text-white/40 mt-0.5">{otpMember.fullName} · {otpMember.memberUid}</p>
              </div>
              <button
                onClick={() => { setOtpMember(null); setOtpResult(null); setOtpError(null); }}
                className="text-white/30 hover:text-white/70 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {!otpResult ? (
              <>
                <div className="rounded-xl px-4 py-3 text-xs text-white/45 space-y-1"
                     style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {otpMember.hasLogin ? (
                    <>
                      <p className="text-amber-300/80 font-medium">Existing login found</p>
                      <p>Login email: <span className="text-white/70">{otpMember.loginEmail}</span></p>
                      <p>Generating a new OTP will invalidate the old password.</p>
                    </>
                  ) : (
                    <>
                      <p>A login account will be created for this member.</p>
                      <p>They will use their email + OTP to sign in, then change their password.</p>
                    </>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-white/45 ml-1">Login Email *</label>
                  <input
                    type="email"
                    value={otpEmail}
                    onChange={(e) => { setOtpEmail(e.target.value); setOtpError(null); }}
                    placeholder="member@example.com"
                    className="glass-input"
                  />
                  <p className="text-xs text-white/30 ml-1">This is the email the member will use to sign in.</p>
                </div>

                {otpError && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
                    <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-xs text-red-400">{otpError}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={generateOtp}
                    disabled={otpLoading || !otpEmail.trim()}
                    className="flex-1 btn-gradient py-2 text-sm flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    {otpLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Generating…
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        Generate OTP
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOtpMember(null); setOtpResult(null); }}
                    className="btn-ghost py-2 px-4 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              /* OTP Result — shown after successful generation */
              <>
                <div className="rounded-2xl px-5 py-4 text-center space-y-2"
                     style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }}>
                  <p className="text-xs text-emerald-400/70 uppercase tracking-wider">One-Time Password</p>
                  <p className="text-3xl font-mono font-bold tracking-[0.3em] text-emerald-300">{otpResult.otp}</p>
                  <p className="text-xs text-white/40">Share this with {otpResult.memberName}</p>
                </div>

                <div className="rounded-xl px-4 py-3 space-y-1.5 text-xs text-white/50"
                     style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p><span className="text-white/35">Login URL:</span> <span className="text-violet-300">/login</span></p>
                  <p><span className="text-white/35">Email:</span> <span className="text-white/80">{otpResult.loginEmail}</span></p>
                  <p><span className="text-white/35">OTP (password):</span> <span className="font-mono text-emerald-300">{otpResult.otp}</span></p>
                  <p className="text-white/30 pt-1">After logging in, they go to <strong className="text-white/50">Change Password</strong> in the sidebar to set a permanent password.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        `Login: ${window.location.origin}/login\nEmail: ${otpResult.loginEmail}\nOTP: ${otpResult.otp}`
                      );
                    }}
                    className="flex-1 btn-ghost py-2 text-sm flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                    Copy Details
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOtpMember(null); setOtpResult(null); }}
                    className="flex-1 btn-gradient py-2 text-sm"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Bulk Import Modal ─────────────────────────────────────────────── */}
      {showBulkImport && mode === "admin" && (
        <div className="modal-backdrop">
          <div className="modal-box w-full max-w-2xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white/90">Bulk Import Members</h3>
                <p className="text-xs text-white/40 mt-0.5">Paste data copied from Excel / Google Sheets</p>
              </div>
              <button
                onClick={() => setShowBulkImport(false)}
                className="text-white/30 hover:text-white/70 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Instructions */}
            <div className="rounded-xl px-4 py-3 text-xs text-white/50 space-y-1"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white/70 font-medium mb-1">Expected columns (in any order):</p>
              <p><span className="text-violet-400">Full Name</span> (required) · <span className="text-violet-400">Join Date</span> (required, e.g. 01/01/2024 or 2024-01-01)</p>
              <p><span className="text-white/40">Phone · Email · Address · Member UID</span> (all optional — UID auto-generated if blank)</p>
              <p className="text-white/35 pt-1">Tip: Include a header row with column names for auto-mapping. Supports CSV and TSV (tab-separated).</p>
            </div>

            {/* Paste area (shown before preview) */}
            {!bulkResults && (
              <>
                <textarea
                  value={bulkRawText}
                  onChange={(e) => { setBulkRawText(e.target.value); setBulkParsed(null); }}
                  placeholder={"Paste Excel rows here…\n\nExample:\nFull Name\tPhone\tJoin Date\nMohammed Ahmed\t9876543210\t01/01/2024\nPriya Sharma\t9123456789\t15/03/2023"}
                  rows={8}
                  className="glass-input text-xs font-mono resize-y"
                  style={{ minHeight: "140px" }}
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={parseBulkPreview}
                    disabled={!bulkRawText.trim()}
                    className="btn-gradient text-xs px-4 py-2 flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Preview ({bulkRawText.trim().split(/\r?\n/).filter(Boolean).length} rows)
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBulkImport(false)}
                    className="btn-ghost text-xs px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* Preview table */}
            {bulkParsed && !bulkResults && (
              <>
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="px-3 py-2 text-xs text-white/50" style={{ background: "rgba(255,255,255,0.04)" }}>
                    {bulkParsed.length} members detected — review before importing
                  </div>
                  <div className="overflow-x-auto max-h-56">
                    <table className="w-full text-xs text-white/70">
                      <thead>
                        <tr className="border-b border-white/8 text-white/40">
                          {["#", "Full Name", "Phone", "Email", "Join Date", "Member UID"].map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="clarity-mask">
                        {bulkParsed.slice(0, 50).map((r, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                            <td className="px-3 py-2 text-white/30">{i + 1}</td>
                            <td className="px-3 py-2 font-medium text-white/90">{r.fullName}</td>
                            <td className="px-3 py-2">{r.phone || <span className="text-white/20">—</span>}</td>
                            <td className="px-3 py-2">{r.email || <span className="text-white/20">—</span>}</td>
                            <td className="px-3 py-2">{r.joinDate || <span className="text-red-400">missing</span>}</td>
                            <td className="px-3 py-2">{r.memberUid || <span className="text-white/25">auto</span>}</td>
                          </tr>
                        ))}
                        {bulkParsed.length > 50 && (
                          <tr>
                            <td colSpan={6} className="px-3 py-2 text-center text-white/30 text-xs">
                              …and {bulkParsed.length - 50} more rows
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={runBulkImport}
                    disabled={bulkImporting || bulkParsed.length === 0}
                    className="btn-gradient text-xs px-4 py-2 flex items-center gap-1.5 disabled:opacity-40"
                  >
                    {bulkImporting ? (
                      <>
                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Importing…
                      </>
                    ) : (
                      <>Import {bulkParsed.length} Members</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setBulkParsed(null); }}
                    className="btn-ghost text-xs px-4 py-2"
                    disabled={bulkImporting}
                  >
                    ← Edit Data
                  </button>
                </div>
              </>
            )}

            {/* Results */}
            {bulkResults && bulkSummary && (
              <>
                <div className={`rounded-xl px-4 py-3 flex items-center gap-3 ${bulkSummary.failed === 0 ? "border-emerald-500/30 bg-emerald-500/10" : "border-amber-500/30 bg-amber-500/10"}`}
                     style={{ border: "1px solid" }}>
                  <svg className={`w-5 h-5 flex-shrink-0 ${bulkSummary.failed === 0 ? "text-emerald-400" : "text-amber-400"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={bulkSummary.failed === 0 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"} />
                  </svg>
                  <div className="text-sm">
                    <span className="text-emerald-400 font-semibold">{bulkSummary.created} imported</span>
                    {bulkSummary.failed > 0 && (
                      <span className="text-amber-400 font-semibold ml-2">{bulkSummary.failed} failed</span>
                    )}
                  </div>
                </div>

                {bulkSummary.failed > 0 && (
                  <div className="rounded-xl overflow-hidden max-h-48 overflow-y-auto"
                       style={{ border: "1px solid rgba(239,68,68,0.2)" }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/8 text-white/40" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <th className="px-3 py-2 text-left">Row</th>
                          <th className="px-3 py-2 text-left">Name</th>
                          <th className="px-3 py-2 text-left">Error</th>
                        </tr>
                      </thead>
                      <tbody className="clarity-mask">
                        {bulkResults.filter((r) => !r.success).map((r) => (
                          <tr key={r.row} className="border-b border-white/5">
                            <td className="px-3 py-2 text-white/40">{r.row}</td>
                            <td className="px-3 py-2 text-white/70">{r.fullName}</td>
                            <td className="px-3 py-2 text-red-400">{r.error}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBulkImport(false)}
                    className="btn-gradient text-xs px-4 py-2"
                  >
                    Done
                  </button>
                  {bulkSummary.failed > 0 && (
                    <button
                      type="button"
                      onClick={() => { setBulkResults(null); setBulkParsed(null); setBulkRawText(""); setBulkSummary(null); }}
                      className="btn-ghost text-xs px-4 py-2"
                    >
                      Import More
                    </button>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
