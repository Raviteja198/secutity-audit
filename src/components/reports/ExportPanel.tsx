"use client";

export function ExportPanel({ mode }: { mode: "admin" | "user" }) {
  const base = mode === "admin" ? "/api/admin/reports/export" : null;

  function onDownload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!base) return;
    const fd = new FormData(e.currentTarget);
    const month = String(fd.get("month") ?? "").trim();
    const year = String(fd.get("year") ?? "").trim();
    const url = new URL(base, window.location.origin);
    if (month) url.searchParams.set("month", month);
    if (year) url.searchParams.set("year", year);
    window.open(url.toString(), "_blank");
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Data</p>
        <h2 className="text-lg font-bold text-white/90">Reports</h2>
      </div>

      <div className="rounded-2xl p-5 space-y-4"
           style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <h3 className="text-sm font-semibold text-white/80">Export Excel Report</h3>
          <p className="text-xs text-white/40 mt-0.5">Download a full data export as .xlsx file.</p>
        </div>

        {mode === "admin" ? (
          <form onSubmit={onDownload} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Month (optional)</label>
              <input
                name="month"
                type="number"
                min={1}
                max={12}
                placeholder="1–12"
                className="glass-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1">Year (optional)</label>
              <input
                name="year"
                type="number"
                min={2000}
                max={3000}
                placeholder="2025"
                className="glass-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/45 ml-1 invisible">Download</label>
              <button
                type="submit"
                className="btn-gradient w-full py-2 text-xs flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download .xlsx
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start gap-3 rounded-xl p-4"
               style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-sm text-amber-300/80">Export is restricted to admins. Contact an admin to download reports.</p>
          </div>
        )}
      </div>
    </div>
  );
}
