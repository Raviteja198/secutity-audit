import { NextResponse } from "next/server";
import { getSession } from "@/lib/server-auth";
import { forTenant } from "@/lib/tenantPrisma";

export async function GET() {
  try {
    const session = await getSession();
    const tenantId = (session?.user as unknown as { tenantId?: string } | undefined)?.tenantId;

    if (!session?.user?.id || !tenantId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const db = forTenant(tenantId);

    // Get all terms acceptances for the user
    const acceptances = await db.termsAndConditionsAcceptance.findMany({
      where: { userId: session.user.id },
      orderBy: { acceptedAt: "desc" }
    });

    return NextResponse.json({
      accepted: acceptances.length > 0,
      acceptances
    });
  } catch (error) {
    console.error("Error checking terms acceptance:", error);
    return NextResponse.json(
      { error: "Failed to check terms acceptance" },
      { status: 500 }
    );
  }
}
