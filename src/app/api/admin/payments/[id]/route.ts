import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await requireAdmin(req);

    // Handle both sync and async params (for Next.js compatibility)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id) {
      return jsonError("Payment ID is required");
    }

    // Check if payment exists
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return jsonError("Payment not found");
    }

    // Only allow deletion of PENDING and LATE payments
    if (payment.status !== "PENDING" && payment.status !== "LATE") {
      return jsonError(
        "Only pending or late payments can be deleted. Paid payments cannot be deleted."
      );
    }

    // Delete associated receipt if exists
    await prisma.receipt.deleteMany({
      where: { paymentId: id },
    });

    // Delete the payment
    await prisma.payment.delete({
      where: { id },
    });

    return jsonOk({ message: "Payment deleted successfully" });
  } catch (e) {
    console.error("Delete payment error:", e);
    const errorMessage = e instanceof Error ? e.message : "Failed to delete payment";
    return jsonError(errorMessage);
  }
}
