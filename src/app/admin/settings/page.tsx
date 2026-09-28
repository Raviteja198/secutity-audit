"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameSuccess, setNameSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/settings/logo");
        const json = await res.json();
        if (res.ok) {
          setLogoUrl(json?.tenant?.logoUrl ?? null);
          setName(json?.tenant?.name ?? "");
          setSavedName(json?.tenant?.name ?? "");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed === savedName) return;
    setNameError(null);
    setNameSuccess(false);
    setSavingName(true);
    try {
      const res = await fetch("/api/admin/settings/logo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const json = await res.json();
      if (!res.ok) {
        setNameError(json?.error ?? "Failed to update organization name.");
        return;
      }
      setName(json?.tenant?.name ?? trimmed);
      setSavedName(json?.tenant?.name ?? trimmed);
      setNameSuccess(true);
    } finally {
      setSavingName(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
    setSuccess(false);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setError(null);
    setSuccess(false);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch("/api/admin/settings/logo", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Failed to upload logo.");
        return;
      }
      setLogoUrl(json?.tenant?.logoUrl ?? null);
      setFile(null);
      setPreview(null);
      setSuccess(true);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white/90">Settings</h2>
        <p className="text-sm text-white/40 mt-1">Manage your organization&apos;s branding.</p>
      </div>

      {success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
          <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-emerald-300">Logo updated successfully!</p>
        </div>
      )}

      {nameSuccess && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
          <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-emerald-300">Organization name updated successfully!</p>
        </div>
      )}

      <form
        onSubmit={handleSaveName}
        className="rounded-2xl p-5 space-y-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div className="space-y-1.5">
          <label className="text-xs text-white/45 ml-1">Organization Name</label>
          <input
            type="text"
            value={name}
            disabled={loading}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(null);
              setNameSuccess(false);
            }}
            maxLength={100}
            placeholder="Organization name"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white/90 placeholder:text-white/25 focus:outline-none focus:border-white/25"
          />
          <p className="text-[11px] text-white/30 mt-1">Shown across the admin and member dashboard.</p>
        </div>

        {nameError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
            <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs text-red-400">{nameError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || savingName || !name.trim() || name.trim() === savedName}
          className="w-full btn-gradient py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {savingName ? "Saving…" : "Save Name"}
        </button>
      </form>

      <form
        onSubmit={handleUpload}
        className="rounded-2xl p-5 space-y-4"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div className="space-y-1.5">
          <label className="text-xs text-white/45 ml-1">Organization Logo</label>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              {loading ? (
                <span className="text-xs text-white/30">…</span>
              ) : preview || logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview ?? logoUrl ?? ""} alt="Tenant logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-white/30">None</span>
              )}
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleFileChange}
              className="text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white/70 hover:file:bg-white/20"
            />
          </div>
          <p className="text-[11px] text-white/30 mt-1">PNG, JPEG, WEBP, or SVG. Max 5MB.</p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5">
            <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || uploading}
          className="w-full btn-gradient py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Save Logo"}
        </button>
      </form>
    </div>
  );
}
