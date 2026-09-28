import { AuditTable } from "@/components/audit/AuditTable";

export default function AdminAuditPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Audit logs</h1>
        <p className="text-sm text-zinc-600">Immutable history of all admin actions.</p>
      </div>
      <AuditTable />
    </div>
  );
}

