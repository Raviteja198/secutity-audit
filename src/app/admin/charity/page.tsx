import { CharityTable } from "@/components/charity/CharityTable";

export default function AdminCharityPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Charity</h1>
        <p className="text-sm text-zinc-600">Admin-managed charity spending ledger.</p>
      </div>
      <CharityTable mode="admin" />
    </div>
  );
}

