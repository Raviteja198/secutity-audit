import { PDFDocument, StandardFonts } from "pdf-lib";
import { prisma } from "@/lib/prisma";

function fmtMoneyPaise(paise: number) {
  return (paise / 100).toFixed(2);
}

export async function buildReceiptPdf(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { member: true, receipt: true },
  });
  if (!payment) throw Object.assign(new Error("Payment not found"), { status: 404 });
  if (!payment.receipt) throw Object.assign(new Error("Receipt not created yet"), { status: 400 });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 800;
  const left = 50;

  page.drawText("Payment Receipt", { x: left, y, size: 18, font: fontBold });
  y -= 28;
  page.drawText(`Receipt #: ${payment.receipt.receiptNumber}`, { x: left, y, size: 11, font });
  y -= 16;
  page.drawText(`Date: ${(payment.paidAt ?? payment.createdAt).toISOString().slice(0, 10)}`, {
    x: left,
    y,
    size: 11,
    font,
  });

  y -= 28;
  page.drawText("Member", { x: left, y, size: 12, font: fontBold });
  y -= 16;
  page.drawText(`${payment.member.fullName} (${payment.member.memberUid})`, {
    x: left,
    y,
    size: 11,
    font,
  });

  y -= 28;
  page.drawText("Period", { x: left, y, size: 12, font: fontBold });
  y -= 16;
  page.drawText(`${payment.month}/${payment.year}`, { x: left, y, size: 11, font });

  y -= 28;
  page.drawText("Amounts", { x: left, y, size: 12, font: fontBold });
  y -= 16;
  page.drawText(`Contribution: ₹${fmtMoneyPaise(payment.baseAmountPaise)}`, {
    x: left,
    y,
    size: 11,
    font,
  });
  y -= 16;
  page.drawText(`Penalty: ₹${fmtMoneyPaise(payment.penaltyAmountPaise)}`, {
    x: left,
    y,
    size: 11,
    font,
  });
  y -= 16;
  page.drawText(`Total: ₹${fmtMoneyPaise(payment.totalAmountPaise)}`, { x: left, y, size: 11, font });

  y -= 28;
  page.drawText("Payment method", { x: left, y, size: 12, font: fontBold });
  y -= 16;
  page.drawText(payment.paymentMethod ?? "-", { x: left, y, size: 11, font });

  const bytes = await pdfDoc.save();
  return { bytes, receiptNumber: payment.receipt.receiptNumber };
}

