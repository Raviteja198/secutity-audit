import { LoansTable } from "@/components/loans/LoansTable";

export default function AdminLoansPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Loans</h1>
        <p className="text-sm text-zinc-600">
          Create loans, approve them, and generate installment schedules.
        </p>
      </div>
      <LoansTable mode="admin" />
    </div>
  );
}

