import { LoansTable } from "@/components/loans/LoansTable";

export default function UserLoansPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Loans</h1>
        <p className="text-sm text-zinc-600">Read-only loan list.</p>
      </div>
      <LoansTable mode="user" />
    </div>
  );
}

