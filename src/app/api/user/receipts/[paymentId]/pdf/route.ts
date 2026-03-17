export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/authz";
import { buildReceiptPdf } from "@/services/receipts";
import { prisma } from "@/lib/prisma";

function getErrorStatus(error: unknown) {
  if (typeof error === "object" && error !== null && "status" in error) {
    const maybeStatus = (error as { status?: unknown }).status;
    if (typeof maybeStatus === "number") return maybeStatus;
  }
  return 500;
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ paymentId: string }> }) {
  try {
    const auth = await requireAuth(req);
    const { paymentId } = await ctx.params;

    // Check if the payment belongs to the user
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: { memberId: true },
    });
    if (!payment || payment.memberId !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { bytes, receiptNumber } = await buildReceiptPdf(paymentId);
    const body = Buffer.from(bytes);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="${receiptNumber}.pdf"`,
        "cache-control": "no-store",
      },
    });
  } catch (e) {
    console.error("Error generating user receipt PDF:", e);
    return NextResponse.json({ error: (e as Error)?.message ?? "Internal Server Error" }, { status: getErrorStatus(e) });
  }
}
