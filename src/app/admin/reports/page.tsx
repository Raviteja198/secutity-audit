import { ExportPanel } from "@/components/reports/ExportPanel";

export default function AdminReportsPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Reports</h1>
        <p className="text-sm text-zinc-600">Exports include payments, charity, loans, and summary.</p>
      </div>
      <ExportPanel mode="admin" />
    </div>
  );
}

