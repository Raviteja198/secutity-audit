export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api/authz";
import { buildReceiptPdf } from "@/services/receipts";

export async function GET(req: NextRequest, ctx: { params: Promise<{ paymentId: string }> }) {
  await requireAuth(req);
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
}

