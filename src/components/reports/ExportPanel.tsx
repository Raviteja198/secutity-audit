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
    <div className="space-y-3">
      <div className="rounded-xl border bg-white p-4">
        <h2 className="text-base font-semibold">Export</h2>
        <p className="mt-1 text-sm text-zinc-600">Download an Excel report (.xlsx).</p>
        {mode === "admin" ? (
          <form onSubmit={onDownload} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="exportMonth" className="text-sm font-medium text-zinc-800">Month (optional)</label>
              <input
                id="exportMonth"
                name="month"
                type="number"
                min={1}
                max={12}
                placeholder="Month (optional)"
                className="rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="exportYear" className="text-sm font-medium text-zinc-800">Year (optional)</label>
              <input
                id="exportYear"
                name="year"
                type="number"
                min={2000}
                max={3000}
                placeholder="Year (optional)"
                className="rounded-xl border px-3 py-2 text-sm"
              />
            </div>
            <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              Download
            </button>
          </form>
        ) : (
          <div className="mt-3 text-sm text-zinc-600">
            Export is admin-only. Ask an admin to download and share reports.
          </div>
        )}
      </div>
    </div>
  );
}

