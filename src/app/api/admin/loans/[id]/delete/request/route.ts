import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import type { LoanStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";
import { sendEmail } from "@/services/email";
import { writeAuditLog } from "@/lib/audit";

const OTP_TTL_MS = 10 * 60 * 1000;

function settingKey(loanId: string) {
  return `loan_delete_otp:${loanId}`;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAdmin(req);
    const db = forTenant(auth.tenantId);
    const { id } = await ctx.params;

    const loan = await db.loan.findUnique({
      where: { id },
      include: { member: { select: { fullName: true, memberUid: true } } },
    });
    if (!loan) {
      return jsonError(Object.assign(new Error("Loan not found"), { status: 404 }));
    }
    const deletableStatuses: LoanStatus[] = ["PENDING_APPROVAL", "ACTIVE", "CLOSED", "DEFAULTED"];
    if (!deletableStatuses.includes(loan.status)) {
      return jsonError(
        Object.assign(new Error("This loan cannot be deleted."), { status: 400 })
      );
    }

    const admins = await db.user.findMany({
      where: { role: "ADMIN", isActive: true },
      select: { email: true, id: true, name: true },
    });

    const adminEmails = [...new Set(admins.map((a) => a.email.toLowerCase()).filter(Boolean))];
    if (adminEmails.length === 0) {
      return jsonError(
        Object.assign(new Error("No active admin users with email addresses."), { status: 400 })
      );
    }

    const plainOtp = randomBytes(4).toString("hex").toUpperCase();
    const hash = await bcrypt.hash(plainOtp, 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);
    const key = settingKey(id);

    const memberLabel = loan.member
      ? `${loan.member.fullName} (${loan.member.memberUid})`
      : "Unknown member";

    const subject = "Loan delete verification code";
    const text = [
      `A loan delete was requested in People's Youth admin.`,
      ``,
      `Member: ${memberLabel}`,
      `Loan ID: ${id}`,
      `Principal: ₹${(loan.principalPaise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
      ``,
      `Verification code: ${plainOtp}`,
      ``,
      `This code expires in 10 minutes.`,
      `Enter it in the admin Loans screen to confirm deletion.`,
    ].join("\n");

    const html = `
      <p>A loan delete was requested in <strong>People's Youth</strong> admin.</p>
      <p><strong>Member:</strong> ${memberLabel}<br/>
      <strong>Principal:</strong> ₹${(loan.principalPaise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
      <p style="font-size:22px;font-family:monospace;letter-spacing:0.2em;"><strong>${plainOtp}</strong></p>
      <p style="color:#666;font-size:13px;">This code expires in <strong>10 minutes</strong>. Enter it in the admin Loans screen to confirm deletion.</p>
    `;

    const failed: { email: string; message: string }[] = [];
    let sent = 0;

    for (const to of adminEmails) {
      try {
        await sendEmail({ to, subject, text, html });
        sent += 1;
      } catch (err) {
        failed.push({
          email: to,
          message: err instanceof Error ? err.message : "Send failed",
        });
      }
    }

    if (sent === 0) {
      return jsonError(
        Object.assign(
          new Error(
            failed[0]?.message ??
              "Could not send verification email. Check EMAIL_USER / EMAIL_PASS configuration."
          ),
          { status: 502 }
        )
      );
    }

    await db.setting.upsert({
      where: { tenantId_key: { tenantId: auth.tenantId, key } },
      create: {
        tenantId: auth.tenantId,
        key,
        value: {
          hash,
          expiresAt: expiresAt.toISOString(),
          requestedById: auth.userId,
        },
      },
      update: {
        value: {
          hash,
          expiresAt: expiresAt.toISOString(),
          requestedById: auth.userId,
        },
      },
    });

    await writeAuditLog(db, auth.tenantId, req, {
      adminId: auth.userId,
      action: "LOAN_DELETE_OTP_REQUESTED",
      entity: "Loan",
      entityId: id,
      newValue: { sent, failedEmails: failed.map((f) => f.email), expiresAt: expiresAt.toISOString() },
    });

    return jsonOk({
      sent,
      failed,
      expiresAt: expiresAt.toISOString(),
      message: `Verification code sent to ${sent} admin email(s). It expires in 10 minutes.`,
    });
  } catch (e) {
    return jsonError(e);
  }
}
