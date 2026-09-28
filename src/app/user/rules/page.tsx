import { RulesPanel } from "@/components/rules/RulesPanel";

export default function UserRulesPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Rules</h1>
        <p className="text-sm text-zinc-600">Read-only rules history.</p>
      </div>
      <RulesPanel mode="user" />
    </div>
  );
}

