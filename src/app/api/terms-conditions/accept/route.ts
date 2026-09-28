import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server-auth";
import { forTenant } from "@/lib/tenantPrisma";

export async function POST(request: NextRequest) {
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

    const { acceptedVersion = 1 } = await request.json();

    // Check if user already accepted this version
    const existing = await db.termsAndConditionsAcceptance.findUnique({
      where: {
        userId_acceptedVersion: {
          userId: session.user.id,
          acceptedVersion
        }
      }
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    // Create acceptance record for this version
    const acceptance = await db.termsAndConditionsAcceptance.create({
      data: {
        tenantId,
        userId: session.user.id,
        acceptedVersion,
        acceptedAt: new Date()
      }
    });

    return NextResponse.json(acceptance);
  } catch (error) {
    console.error("Error accepting terms:", error);
    return NextResponse.json(
      { error: "Failed to accept terms" },
      { status: 500 }
    );
  }
}
