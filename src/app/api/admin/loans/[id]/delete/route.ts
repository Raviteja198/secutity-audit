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

    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;

    if (!id) {
      return jsonError("Loan ID is required");
    }

    const loan = await prisma.loan.findUnique({
      where: { id },
    });

    if (!loan) {
      return jsonError("Loan not found");
    }

    // Only allow deletion of PENDING_APPROVAL and ACTIVE loans
    if (loan.status !== "PENDING_APPROVAL" && loan.status !== "ACTIVE") {
      return jsonError(
        "Only pending or active loans can be deleted. Closed or defaulted loans cannot be deleted."
      );
    }

    await prisma.loan.delete({
      where: { id },
    });

    return jsonOk({ message: "Loan deleted successfully" });
  } catch (e) {
    console.error("Delete loan error:", e);
    const errorMessage = e instanceof Error ? e.message : "Failed to delete loan";
    return jsonError(errorMessage);
  }
}
