export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api/authz";
import { forTenant } from "@/lib/tenantPrisma";
import { buildReceiptPdf } from "@/services/receipts";

export async function GET(req: NextRequest, ctx: { params: Promise<{ paymentId: string }> }) {
  const auth = await requireAdmin(req);
  const db = forTenant(auth.tenantId);
  const { paymentId } = await ctx.params;
  const { bytes, receiptNumber } = await buildReceiptPdf(db, paymentId);
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

