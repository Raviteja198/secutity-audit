"use client";

import { useEffect, useMemo, useState } from "react";

type AuditLog = {
  id: string;
  timestamp: string;
  admin: { email: string; name?: string | null };
  action: string;
  entity: string;
  entityId?: string | null;
  ipAddress?: string | null;
};

export function AuditTable() {
  const [items, setItems] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [loading, setLoading] = useState(false);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  async function load() {
    setLoading(true);
    try {
      const url = new URL("/api/admin/audit", window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-0.5">Security</p>
        <h2 className="text-lg font-bold text-white/90">Audit Logs</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl"
           style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        <table className="glass-table min-w-full">
          <thead>
            <tr>
              <th>Time</th>
              <th>Admin</th>
              <th>Action</th>
              <th>Entity</th>
              <th>Entity ID</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody className="clarity-mask">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j}><div className="h-4 w-20 bg-white/5 rounded-md animate-pulse"/></td>
                  ))}
                </tr>
              ))
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <p className="text-white/30 text-sm">No audit logs yet</p>
                </td>
              </tr>
            ) : items.map((a) => (
              <tr key={a.id}>
                <td className="text-white/40 text-xs whitespace-nowrap">{new Date(a.timestamp).toLocaleString()}</td>
                <td className="text-white/60 text-xs">{a.admin.email}</td>
                <td>
                  <span className="badge-info">{a.action}</span>
                </td>
                <td className="text-white/60 text-sm">{a.entity}</td>
                <td className="text-white/40 text-xs font-mono">{a.entityId ?? "—"}</td>
                <td className="text-white/40 text-xs font-mono">{a.ipAddress ?? "—"}</td>
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
              <div className="h-4 w-32 bg-white/8 rounded mb-2"/>
              <div className="h-3 w-48 bg-white/5 rounded"/>
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="rounded-2xl p-6 text-center" style={{ border: "1px dashed rgba(255,255,255,0.1)" }}>
            <p className="text-white/30 text-sm">No audit logs yet</p>
          </div>
        ) : items.map((a) => (
          <div key={a.id} className="rounded-2xl p-4 space-y-2.5"
               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="badge-info">{a.action}</span>
                <div className="text-xs text-white/35 mt-1.5">{new Date(a.timestamp).toLocaleString()}</div>
              </div>
              <span className="text-xs text-white/60 truncate max-w-[140px]">{a.admin.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/35">Entity</span>
                <div className="text-white/70 mt-0.5">{a.entity}</div>
              </div>
              {a.entityId && (
                <div>
                  <span className="text-white/35">Entity ID</span>
                  <div className="text-white/50 font-mono mt-0.5 truncate">{a.entityId}</div>
                </div>
              )}
              {a.ipAddress && (
                <div>
                  <span className="text-white/35">IP</span>
                  <div className="text-white/50 font-mono mt-0.5">{a.ipAddress}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-xs text-white/35">Page {page} of {totalPages} · {total} total</p>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-35">← Prev</button>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-35">Next →</button>
        </div>
      </div>
    </div>
  );
}
