import { ExportPanel } from "@/components/reports/ExportPanel";

export default function UserReportsPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Reports</h1>
        <p className="text-sm text-zinc-600">Read-only reporting overview.</p>
      </div>
      <ExportPanel mode="user" />
    </div>
  );
}

