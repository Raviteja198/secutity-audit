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
      setItems(json.items);
      setTotal(json.total);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="space-y-3">
      {/* Desktop TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-lg sm:rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">Admin</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Entity</th>
              <th className="px-3 py-2">Entity ID</th>
              <th className="px-3 py-2">IP</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white text-sm">
            {loading ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={6}>
                  Loading…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-3 py-3 text-zinc-600" colSpan={6}>
                  No audit logs yet.
                </td>
              </tr>
            ) : (
              items.map((a) => (
                <tr key={a.id}>
                  <td className="px-3 py-2">{new Date(a.timestamp).toLocaleString()}</td>
                  <td className="px-3 py-2">{a.admin.email}</td>
                  <td className="px-3 py-2 font-medium">{a.action}</td>
                  <td className="px-3 py-2">{a.entity}</td>
                  <td className="px-3 py-2">{a.entityId ?? "-"}</td>
                  <td className="px-3 py-2">{a.ipAddress ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile CARD VIEW */}
      <div className="md:hidden space-y-2">
        {loading ? (
          <div className="text-center text-sm text-zinc-600 py-4">Loading...</div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border bg-white p-4 text-center text-sm text-zinc-600">
            No audit logs yet.
          </div>
        ) : (
          items.map((a) => (
            <div key={a.id} className="rounded-lg border bg-white p-3 space-y-2">
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-zinc-900">{a.action}</div>
                  <div className="text-xs text-zinc-600 truncate">{new Date(a.timestamp).toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Admin:</span>
                  <span className="font-medium truncate">{a.admin.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">Entity:</span>
                  <span className="font-medium">{a.entity}</span>
                </div>
                {a.entityId && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Entity ID:</span>
                    <span className="font-medium">{a.entityId}</span>
                  </div>
                )}
                {a.ipAddress && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600">IP:</span>
                    <span className="font-medium">{a.ipAddress}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm text-zinc-700">
        <div>
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span> ({total} total)
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border px-2 sm:px-3 py-1.5 text-xs sm:text-sm disabled:opacity-50 hover:bg-zinc-50"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border px-2 sm:px-3 py-1.5 text-xs sm:text-sm disabled:opacity-50 hover:bg-zinc-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

