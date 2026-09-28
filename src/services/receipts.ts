import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from "pdf-lib";
import type { TenantPrismaClient } from "@/lib/tenantPrisma";

// ─── Money helpers ─────────────────────────────────────────────────────────────

/** Format paise as Rs. X,XX,XXX.XX  (avoids ₹ which WinAnsi can't encode) */
function fmtMoney(paise: number) {
  const rupees = paise / 100;
  return `Rs. ${rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function fmtMonth(month: number, year: number) {
  return `${MONTH_NAMES[month - 1] ?? month} ${year}`;
}

function fmtDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Drawing helpers ───────────────────────────────────────────────────────────

function hLine(page: PDFPage, x: number, y: number, w: number, thickness = 0.5) {
  page.drawLine({
    start: { x, y },
    end:   { x: x + w, y },
    thickness,
    color: rgb(0.75, 0.75, 0.8),
  });
}

function box(page: PDFPage, x: number, y: number, w: number, h: number, fill = rgb(0.95, 0.95, 0.97)) {
  page.drawRectangle({ x, y, width: w, height: h, color: fill });
}

function text(
  page: PDFPage,
  str: string,
  x: number,
  y: number,
  {
    font,
    size = 11,
    color = rgb(0.15, 0.15, 0.2),
  }: { font: PDFFont; size?: number; color?: ReturnType<typeof rgb> },
) {
  page.drawText(str, { x, y, size, font, color });
}

// Right-align text at a given right-edge x
function textRight(
  page: PDFPage,
  str: string,
  rightX: number,
  y: number,
  { font, size = 11, color = rgb(0.15, 0.15, 0.2) }: { font: PDFFont; size?: number; color?: ReturnType<typeof rgb> },
) {
  const w = font.widthOfTextAtSize(str, size);
  page.drawText(str, { x: rightX - w, y, size, font, color });
}

// ─── Main builder ──────────────────────────────────────────────────────────────

export async function buildReceiptPdf(db: TenantPrismaClient, paymentId: string) {
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: { member: true, receipt: true },
  });
  if (!payment) throw Object.assign(new Error("Payment not found"), { status: 404 });
  if (!payment.receipt) throw Object.assign(new Error("Receipt not yet created for this payment"), { status: 400 });

  // ── Page setup ─────────────────────────────────────────────────────────────
  const pdfDoc = await PDFDocument.create();
  // Half-A4 portrait (receipt size)
  const W = 595.28;
  const H = 500;
  const page = pdfDoc.addPage([W, H]);

  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const oblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const L  = 40;   // left margin
  const R  = W - 40; // right edge
  const CW = R - L;  // content width

  // ── Header band ────────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: H - 70, width: W, height: 70, color: rgb(0.09, 0.06, 0.22) });

  text(page, "YOUTH GROUP", L, H - 28, { font: bold, size: 16, color: rgb(1, 1, 1) });
  text(page, "Community Savings & Welfare Fund", L, H - 44, { font: oblique, size: 9, color: rgb(0.72, 0.65, 0.95) });

  const title = "OFFICIAL RECEIPT";
  const titleW = bold.widthOfTextAtSize(title, 11);
  text(page, title, R - titleW, H - 30, { font: bold, size: 11, color: rgb(0.78, 0.70, 1) });
  const rcptNum = payment.receipt.receiptNumber;
  const rcptW = regular.widthOfTextAtSize(rcptNum, 9);
  text(page, rcptNum, R - rcptW, H - 46, { font: regular, size: 9, color: rgb(0.60, 0.55, 0.85) });

  // ── Receipt meta row ───────────────────────────────────────────────────────
  let y = H - 85;

  const paidDate = payment.paidAt ?? payment.updatedAt ?? payment.createdAt;
  text(page, "Date:", L, y, { font: bold, size: 9, color: rgb(0.5, 0.5, 0.55) });
  text(page, fmtDate(paidDate), L + 36, y, { font: regular, size: 9, color: rgb(0.3, 0.3, 0.35) });

  const statusLabel = payment.status === "PAID" ? "PAID" : payment.status === "LATE" ? "LATE" : payment.status;
  const statusColor = payment.status === "PAID" ? rgb(0.07, 0.55, 0.35) : rgb(0.75, 0.35, 0.1);
  const statusBg    = payment.status === "PAID" ? rgb(0.88, 0.97, 0.91) : rgb(0.99, 0.93, 0.87);
  const slW = bold.widthOfTextAtSize(statusLabel, 9) + 16;
  page.drawRectangle({ x: R - slW, y: y - 3, width: slW, height: 15, color: statusBg, borderColor: statusColor, borderWidth: 0.5 });
  text(page, statusLabel, R - slW + 8, y + 1, { font: bold, size: 9, color: statusColor });

  // ── Divider ────────────────────────────────────────────────────────────────
  y -= 16;
  hLine(page, L, y, CW);

  // ── Member section ─────────────────────────────────────────────────────────
  y -= 18;
  text(page, "MEMBER", L, y, { font: bold, size: 8, color: rgb(0.5, 0.45, 0.65) });

  y -= 14;
  text(page, payment.member.fullName, L, y, { font: bold, size: 13, color: rgb(0.12, 0.08, 0.28) });

  y -= 15;
  text(page, payment.member.memberUid, L, y, { font: regular, size: 10, color: rgb(0.45, 0.42, 0.55) });

  // Phone (if available)
  if (payment.member.phone) {
    const phone = payment.member.phone;
    const phoneW = regular.widthOfTextAtSize(phone, 9);
    text(page, phone, R - phoneW, y, { font: regular, size: 9, color: rgb(0.45, 0.42, 0.55) });
  }

  // ── Period ─────────────────────────────────────────────────────────────────
  y -= 14;
  text(page, "Payment period:", L, y, { font: regular, size: 9, color: rgb(0.5, 0.5, 0.55) });
  text(page, fmtMonth(payment.month, payment.year), L + 90, y, { font: bold, size: 9, color: rgb(0.25, 0.2, 0.45) });

  // ── Divider ────────────────────────────────────────────────────────────────
  y -= 16;
  hLine(page, L, y, CW);

  // ── Amounts table ──────────────────────────────────────────────────────────
  y -= 18;
  text(page, "PAYMENT DETAILS", L, y, { font: bold, size: 8, color: rgb(0.5, 0.45, 0.65) });

  const col1 = L;
  const col2 = R;

  const rows = [
    { label: "Contribution",  value: fmtMoney(payment.baseAmountPaise) },
    { label: "Penalty",       value: fmtMoney(payment.penaltyAmountPaise) },
  ];

  for (const row of rows) {
    y -= 16;
    text(page, row.label, col1, y, { font: regular, size: 10, color: rgb(0.3, 0.28, 0.4) });
    textRight(page, row.value, col2, y, { font: regular, size: 10, color: rgb(0.3, 0.28, 0.4) });
  }

  // Total row with background
  y -= 6;
  hLine(page, L, y, CW, 0.75);
  y -= 4;
  box(page, L, y - 6, CW, 24, rgb(0.93, 0.90, 0.99));
  y -= 2;
  text(page, "TOTAL", col1 + 8, y + 5, { font: bold, size: 11, color: rgb(0.18, 0.1, 0.38) });
  textRight(page, fmtMoney(payment.totalAmountPaise), col2 - 8, y + 5, { font: bold, size: 13, color: rgb(0.18, 0.1, 0.38) });

  // ── Payment method ─────────────────────────────────────────────────────────
  y -= 28;
  hLine(page, L, y + 12, CW);
  text(page, "Payment Method:", col1, y, { font: regular, size: 9, color: rgb(0.5, 0.5, 0.55) });
  text(page, (payment.paymentMethod ?? "CASH").toUpperCase(), col1 + 95, y, { font: bold, size: 9, color: rgb(0.25, 0.2, 0.45) });

  // ── Footer ─────────────────────────────────────────────────────────────────
  const footerY = 24;
  page.drawRectangle({ x: 0, y: 0, width: W, height: footerY + 14, color: rgb(0.96, 0.95, 0.99) });
  hLine(page, 0, footerY + 14, W, 0.4);

  const footerMsg = "This is a computer-generated receipt and does not require a signature.";
  const fmW = oblique.widthOfTextAtSize(footerMsg, 7.5);
  text(page, footerMsg, (W - fmW) / 2, footerY + 2, { font: oblique, size: 7.5, color: rgb(0.55, 0.52, 0.65) });

  const bytes = await pdfDoc.save();
  return { bytes, receiptNumber: rcptNum };
}
