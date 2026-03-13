import { PaymentsTable } from "@/components/payments/PaymentsTable";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-lg font-semibold text-zinc-900">Payments</h1>
        <p className="text-sm text-zinc-600">
          Generate monthly dues, record payments, and download receipts.
        </p>
      </div>
      <PaymentsTable mode="admin" />
    </div>
  );
}

