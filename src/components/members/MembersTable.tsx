"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
        "w-full rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10",
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
  const [creatingMember, setCreatingMember] = useState(false);
  const [createMemberError, setCreateMemberError] = useState<string | null>(null);

  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const apiBase = mode === "admin" ? "/api/admin/members" : "/api/user/members";

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );

  const load = useCallback(async () => {
    setLoading(true);

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
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [apiBase, page, pageSize, q]);

  useEffect(() => {
    void load();
  }, [load]);

async function createMember(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setCreateMemberError(null);
  setCreatingMember(true);

  const formElement = e.currentTarget;

  try {
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch(apiBase, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        joinDate: payload.joinDate
          ? new Date(String(payload.joinDate))
          : new Date(),
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setCreateMemberError(json?.error ?? "Failed to create member.");
      return;
    }

    formElement.reset();
    setPage(1);
    await load();
  } finally {
    setCreatingMember(false);
  }
}

  async function updateMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editingMember) return;

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch(`/api/admin/members/${editingMember.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        joinDate: payload.joinDate
          ? new Date(String(payload.joinDate))
          : new Date(),
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json?.error ?? "Failed to update");
      return;
    }

    setEditingMember(null);
    await load();
  }

  async function deactivateMember(id: string) {
    const confirmDelete = confirm("Deactivate this member?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/members/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json?.error ?? "Failed to deactivate");
      return;
    }

    await load();
  }

  async function reactivateMember(id: string) {
    const res = await fetch(`/api/admin/members/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        status: "ACTIVE",
        exitDate: null,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json?.error ?? "Failed to reactivate");
      return;
    }

    await load();
  }

  return (
    <div className="space-y-4">

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="space-y-1 flex-1">
          <label htmlFor="searchMember" className="text-xs sm:text-sm font-medium text-zinc-500">Search Member</label>
          <Input
            id="searchMember"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search member..."
          />
        </div>

        <button
          onClick={() => {
            setPage(1);
            void load();
          }}
          className="rounded-lg sm:rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-zinc-50 h-fit"
        >
          Search
        </button>
      </div>

      {/* CREATE MEMBER */}
      {mode === "admin" && (
        <details className="rounded-lg sm:rounded-xl border bg-white p-2 sm:p-3 text-zinc-900">
          <summary className="cursor-pointer font-medium text-sm">
            Add Member
          </summary>

          <form
            onSubmit={createMember}
            className="mt-3 grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2"
          >
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-xs sm:text-sm font-medium text-zinc-800">Full Name</label>
              <Input id="fullName" name="fullName" placeholder="Full name" required />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-zinc-800">Phone</label>
              <Input id="phone" name="phone" placeholder="Phone" />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs sm:text-sm font-medium text-zinc-800">Email</label>
              <Input id="email" name="email" type="email" placeholder="Email" />
            </div>
            <div className="space-y-1">
              <label htmlFor="joinDate" className="text-xs sm:text-sm font-medium text-zinc-800">Join Date</label>
              <Input id="joinDate" name="joinDate" type="date" required />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={creatingMember}
                className="rounded-lg bg-zinc-900 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 w-full"
              >
                {creatingMember ? "Creating member..." : "Create Member"}
              </button>
            </div>
            {createMemberError ? (
              <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-700">
                {createMemberError}
              </div>
            ) : null}
          </form>
        </details>
      )}

      {/* EDIT MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-zinc-900 p-4">
          <div className="w-full max-w-md rounded-lg sm:rounded-xl bg-white p-4 sm:p-6 shadow-lg text-zinc-900 max-h-[90vh] overflow-y-auto">
            <h3 className="mb-3 text-lg font-semibold text-zinc-900">Edit Member</h3>

            <form onSubmit={updateMember} className="space-y-2 sm:space-y-3">
              <div className="space-y-1">
                <label htmlFor="editMemberUid" className="text-xs sm:text-sm font-medium text-zinc-800">Member UID</label>
                <Input
                  id="editMemberUid"
                  name="memberUid"
                  defaultValue={editingMember.memberUid}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="editFullName" className="text-xs sm:text-sm font-medium text-zinc-800">Full Name</label>
                <Input
                  id="editFullName"
                  name="fullName"
                  defaultValue={editingMember.fullName}
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="editPhone" className="text-xs sm:text-sm font-medium text-zinc-800">Phone</label>
                <Input
                  id="editPhone"
                  name="phone"
                  defaultValue={editingMember.phone ?? ""}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="editEmail" className="text-xs sm:text-sm font-medium text-zinc-800">Email</label>
                <Input
                  id="editEmail"
                  name="email"
                  defaultValue={editingMember.email ?? ""}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="editJoinDate" className="text-xs sm:text-sm font-medium text-zinc-800">Join Date</label>
                <Input
                  id="editJoinDate"
                  name="joinDate"
                  type="date"
                  defaultValue={editingMember.joinDate.split("T")[0]}
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-zinc-800">
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="flex-1 rounded-lg border px-3 py-2 text-xs sm:text-sm hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-lg sm:rounded-xl border">
        <table className="min-w-full divide-y">
          <thead className="bg-zinc-50 text-xs uppercase text-zinc-600">
            <tr>
              <th className="px-3 py-2">Member ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Join</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Email</th>
              {mode === "admin" && <th className="px-3 py-2">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y bg-white text-sm text-zinc-900">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-3 py-3">
                  Loading...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-3">
                  No members found
                </td>
              </tr>
            ) : (
              items.map((m) => (
                <tr key={m.id}>
                  <td className="px-3 py-2 font-medium">{m.memberUid}</td>

                  <td className="px-3 py-2">{m.fullName}</td>

                  <td className="px-3 py-2">
                    {m.status === "ACTIVE" ? (
                      <span className="text-emerald-600">ACTIVE</span>
                    ) : (
                      <span className="text-zinc-500">INACTIVE</span>
                    )}
                  </td>

                  <td className="px-3 py-2">
                    {new Date(m.joinDate).toLocaleDateString()}
                  </td>

                  <td className="px-3 py-2">{m.phone ?? "-"}</td>

                  <td className="px-3 py-2">{m.email ?? "-"}</td>

                  {mode === "admin" && (
                    <td className="px-3 py-2 flex gap-2">
                      {m.status === "ACTIVE" ? (
                        <>
                          <button
                            onClick={() => setEditingMember(m)}
                            className="rounded bg-blue-600 px-2 py-1 text-xs text-white"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deactivateMember(m.id)}
                            className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                          >
                            Deactivate
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => reactivateMember(m.id)}
                          className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                        >
                          Reactivate
                        </button>
                      )}
                    </td>
                  )}
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
            No members found
          </div>
        ) : (
          items.map((m) => (
            <div key={m.id} className="rounded-lg border bg-white p-3 space-y-2">
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-zinc-900 truncate">{m.fullName}</div>
                  <div className="text-xs text-zinc-600">{m.memberUid}</div>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${m.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700"}`}>
                  {m.status}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Join Date:</span>
                  <span className="font-medium">{new Date(m.joinDate).toLocaleDateString()}</span>
                </div>
                {m.phone && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Phone:</span>
                    <span className="font-medium">{m.phone}</span>
                  </div>
                )}
                {m.email && (
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Email:</span>
                    <span className="font-medium truncate">{m.email}</span>
                  </div>
                )}
              </div>

              {mode === "admin" && (
                <div className="flex gap-2 pt-2 flex-wrap">
                  {m.status === "ACTIVE" ? (
                    <>
                      <button
                        onClick={() => setEditingMember(m)}
                        className="flex-1 min-w-0 rounded-lg bg-blue-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deactivateMember(m.id)}
                        className="flex-1 min-w-0 rounded-lg bg-red-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Deactivate
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => reactivateMember(m.id)}
                      className="w-full rounded-lg bg-green-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                    >
                      Reactivate
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm text-zinc-700">
        <div>
          Page {page} of {totalPages} ({total} members)
        </div>

        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border px-2 sm:px-3 py-1 text-xs sm:text-sm hover:bg-zinc-50 disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border px-2 sm:px-3 py-1 text-xs sm:text-sm hover:bg-zinc-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}





// "use client";

// import { useEffect, useMemo, useState } from "react";

// type Member = {
//   id: string;
//   memberUid: string;
//   fullName: string;
//   phone?: string | null;
//   email?: string | null;
//   status: "ACTIVE" | "INACTIVE";
//   joinDate: string;
//   exitDate?: string | null;
// };

// function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
//   return (
//     <input
//       {...props}
//       className={[
//         "w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10",
//         props.className ?? "",
//       ].join(" ")}
//     />
//   );
// }

// export function MembersTable({ mode }: { mode: "admin" | "user" }) {
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(20);
//   const [items, setItems] = useState<Member[]>([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const apiBase = mode === "admin" ? "/api/admin/members" : "/api/user/members";

//   const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

//   async function load() {
//     setLoading(true);
//     setError(null);
//     try {
//       const url = new URL(apiBase, window.location.origin);
//       url.searchParams.set("page", String(page));
//       url.searchParams.set("pageSize", String(pageSize));
//       if (q.trim()) url.searchParams.set("q", q.trim());
//       const res = await fetch(url.toString(), { cache: "no-store" });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.error ?? "Failed to load");
//       setItems(json.items);
//       setTotal(json.total);
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Failed to load");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     void load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   async function createMember(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = new FormData(e.currentTarget);
//     const payload = Object.fromEntries(form.entries());
//     const res = await fetch(apiBase, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({
//         ...payload,
//         joinDate: payload.joinDate ? new Date(String(payload.joinDate)) : new Date(),
//       }),
//     });
//     const json = await res.json();
//     if (!res.ok) {
//       alert(json?.error ?? "Failed to create");
//       return;
//     }
//     (e.currentTarget as HTMLFormElement).reset();
//     setPage(1);
//     await load();
//   }

//   return (
//     <div className="space-y-3">
//       <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center gap-2">
//           <Input
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             placeholder="Search by name / member ID…"
//           />
//           <button
//             onClick={() => {
//               setPage(1);
//               void load();
//             }}
//             className="rounded-xl border px-3 py-2 text-sm hover:bg-zinc-50"
//           >
//             Search
//           </button>
//         </div>

//         {mode === "admin" ? (
//           <details className="rounded-xl border bg-white p-3">
//             <summary className="cursor-pointer text-sm font-medium text-zinc-900">
//               Add member
//             </summary>
//             <form onSubmit={createMember} className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2 text-zinc-900">
//             {/* <form onSubmit={createMember} className="w-full rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-zinc-900/10"> */}
//               <Input name="memberUid" placeholder="Member ID (e.g., M-0002)" required />
//               <Input name="fullName" placeholder="Full name" required />
//               <Input name="phone" placeholder="Phone (optional)" />
//               <Input name="email" placeholder="Email (optional)" type="email" />
//               <Input
//                 name="joinDate"
//                 placeholder="Join date"
//                 type="date"
//                 required
//                 className="md:col-span-1"
//               />
//               <div className="md:col-span-2">
//                 <button className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800">
//                   Create
//                 </button>
//               </div>
//             </form>
//           </details>
//         ) : null}
//       </div>

//       {error ? (
//         <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//           {error}
//         </div>
//       ) : null}

//       <div className="overflow-x-auto rounded-xl border">
//         <table className="min-w-full divide-y">
//           <thead className="bg-zinc-50">
//             <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">
//               <th className="px-3 py-2">Member ID</th>
//               <th className="px-3 py-2">Name</th>
//               <th className="px-3 py-2">Status</th>
//               <th className="px-3 py-2">Join</th>
//               <th className="px-3 py-2">Phone</th>
//               <th className="px-3 py-2">Email</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y bg-white text-sm">
//             {loading ? (
//               <tr>
//                 <td className="px-3 py-3 text-zinc-600" colSpan={6}>
//                   Loading…
//                 </td>
//               </tr>
//             ) : items.length === 0 ? (
//               <tr>
//                 <td className="px-3 py-3 text-zinc-600" colSpan={6}>
//                   No members found.
//                 </td>
//               </tr>
//             ) : (
//               items.map((m) => (
//                 <tr key={m.id}>
//                   <td className="px-3 py-2 font-medium text-zinc-900">{m.memberUid}</td>
//                   <td className="px-3 py-2 font-medium text-zinc-900">{m.fullName}</td>
//                   <td className="px-3 py-2">
//                     <span
//                       className={[
//                         "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
//                         m.status === "ACTIVE"
//                           ? "bg-emerald-50 text-emerald-700"
//                           : "bg-zinc-100 text-zinc-700",
//                       ].join(" ")}
//                     >
//                       {m.status}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2">{new Date(m.joinDate).toLocaleDateString()}</td>
//                   <td className="px-3 py-2">{m.phone ?? "-"}</td>
//                   <td className="px-3 py-2">{m.email ?? "-"}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between text-sm text-zinc-700">
//         <div>
//           Page <span className="font-medium">{page}</span> of{" "}
//           <span className="font-medium">{totalPages}</span> ({total} total)
//         </div>
//         <div className="flex gap-2">
//           <button
//             disabled={page <= 1}
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
//           >
//             Prev
//           </button>
//           <button
//             disabled={page >= totalPages}
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             className="rounded-lg border px-3 py-1.5 disabled:opacity-50 hover:bg-zinc-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
