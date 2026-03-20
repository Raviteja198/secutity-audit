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
      return jsonError("Charity ID is required");
    }

    const charity = await prisma.charity.findUnique({
      where: { id },
    });

    if (!charity) {
      return jsonError("Charity entry not found");
    }

    await prisma.charity.delete({
      where: { id },
    });

    return jsonOk({ message: "Charity entry deleted successfully" });
  } catch (e) {
    console.error("Delete charity error:", e);
    const errorMessage = e instanceof Error ? e.message : "Failed to delete charity";
    return jsonError(errorMessage);
  }
}
