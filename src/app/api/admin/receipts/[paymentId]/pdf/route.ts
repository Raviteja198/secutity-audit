export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/authz";
import { buildReceiptPdf } from "@/services/receipts";

function getErrorStatus(error: unknown) {
  if (typeof error === "object" && error !== null && "status" in error) {
    const maybeStatus = (error as { status?: unknown }).status;
    if (typeof maybeStatus === "number") return maybeStatus;
  }
  return 500;
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ paymentId: string }> }) {
  try {
    await requireAdmin(req);
    const { paymentId } = await ctx.params;
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
    console.error("Error generating receipt PDF:", e);
    return NextResponse.json({ error: (e as Error)?.message ?? "Internal Server Error" }, { status: getErrorStatus(e) });
  }
}
