import { PaymentsTable } from "@/components/payments/PaymentsTable";

export default function UserPaymentsPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold">Payments</h1>
        <p className="text-sm text-zinc-600">Read-only payment ledger with receipts.</p>
      </div>
      <PaymentsTable mode="user" />
    </div>
  );
}

