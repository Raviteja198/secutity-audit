import { RulesPanel } from "@/components/rules/RulesPanel";

export default function AdminRulesPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold text-zinc-900">Rules</h1>
        <p className="text-sm text-zinc-600">
          Versioned contribution and penalty rules (past months never change).
        </p>
      </div>
      <RulesPanel mode="admin" />
    </div>
  );
}

