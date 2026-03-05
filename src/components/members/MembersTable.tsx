"use client";

import { useEffect, useMemo, useState } from "react";

type Member = {
  id: string;
  memberUid: string;
  fullName: string;
  phone?: string | null;
  email?: string | null;
  status: "ACTIVE" | "INACTIVE";
  joinDate: string;
  exitDate?: string | null;
};

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function MembersTable({ mode }: { mode: "admin" | "user" }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [items, setItems] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = mode === "admin" ? "/api/admin/members" : "/api/user/members";

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(apiBase, window.location.origin);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(pageSize));
      if (q.trim()) url.searchParams.set("q", q.trim());
      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to load");
      setItems(json.items);
      setTotal(json.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function createMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
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
      alert(json?.error ?? "Failed to create");
      return;
    }
    (e.currentTarget as HTMLFormElement).reset();
    setPage(1);
    await load();
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name / member ID…"
          />
          <button
            onClick={() => {
              setPage(1);
              void load();
            }}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50"
          >
            Search
          </button>
        </div>

        {mode === "admin" ? (
          <details className="rounded-xl border bg-white p-3">
            <summary className="cursor-pointer text-sm font-medium text-zinc-900">
              Add member
            </summary>
            <form onSubmit={createMember} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <Input name="memberUid" placeholder="Member ID (e.g., M-0002)" required />
              <Input name="fullName" placeholder="Full name" required />
              <Input name="phone" placeholder="Phone (optional)" />
              <Input name="email" placeholder="Email (optional)" type="email" />
              <Input
                name="joinDate"
                placeholder="Join date"
                type="date"
                required
                className="md:col-span-1"
              />
              <div className="md:col-span-2">
                <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                  Create
                </button>
              </div>
            </form>
          </details>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
              <th className="px-3 py-2">Member ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Join</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Email</th>
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
                  No members found.
                </td>
              </tr>
            ) : (
              items.map((m) => (
                <tr key={m.id}>
                  <td className="px-3 py-2 font-medium text-zinc-900">{m.memberUid}</td>
                  <td className="px-3 py-2">{m.fullName}</td>
                  <td className="px-3 py-2">
                    <span
                      className={[
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                        m.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-zinc-100 text-zinc-700",
                      ].join(" ")}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">{new Date(m.joinDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{m.phone ?? "-"}</td>
                  <td className="px-3 py-2">{m.email ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-700">
        <div>
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span> ({total} total)
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

