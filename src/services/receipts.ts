import { prisma } from "@/lib/prisma";
import puppeteer from 'puppeteer';

async function buildReceiptHtml(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { member: true, receipt: true },
  });
  if (!payment) throw Object.assign(new Error("Payment not found"), { status: 404 });
  if (!payment.receipt) throw Object.assign(new Error("Receipt not created yet"), { status: 400 });
  if (!payment.member) throw Object.assign(new Error("Member not found"), { status: 404 });

  const paidAt = (payment.paidAt ?? payment.createdAt).toISOString().slice(0, 10);
  const totalAmountFormatted = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(payment.totalAmountPaise / 100);
  const baseAmountFormatted = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(payment.baseAmountPaise / 100);
  const penaltyAmountFormatted = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(payment.penaltyAmountPaise / 100);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payment Receipt</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .text-right { text-align: right; }
      </style>
    </head>
    <body>
      <h1>Payment Receipt</h1>
      <p><strong>Receipt #:</strong> ${payment.receipt.receiptNumber}</p>
      <p><strong>Date:</strong> ${paidAt}</p>

      <h2>Member Details</h2>
      <table>
        <tr><th>Name</th><td>${payment.member.fullName}</td></tr>
        <tr><th>Member ID</th><td>${payment.member.memberUid}</td></tr>
      </table>

      <h2>Payment Details</h2>
      <table>
        <tr><th>Period</th><td>${payment.month}/${payment.year}</td></tr>
        <tr><th>Contribution</th><td>${baseAmountFormatted}</td></tr>
        <tr><th>Penalty</th><td>${penaltyAmountFormatted}</td></tr>
        <tr><th>Total Amount</th><td>${totalAmountFormatted}</td></tr>
        <tr><th>Status</th><td>${payment.status}</td></tr>
        <tr><th>Payment Method</th><td>${payment.paymentMethod || "-"}</td></tr>
        <tr><th>Paid At</th><td>${payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "-"}</td></tr>
      </table>
    </body>
    </html>
  `;
}

export async function buildReceiptPdf(paymentId: string) {
  try {
    const htmlContent = await buildReceiptHtml(paymentId);

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: { receipt: true },
    });
    const receiptNumber = payment?.receipt?.receiptNumber ?? 'receipt';

    return { bytes: pdfBuffer, receiptNumber };
  } catch (error) {
    console.error("Error building receipt PDF:", error);
    throw error;
  }
}