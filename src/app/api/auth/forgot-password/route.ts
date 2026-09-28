import { NextRequest } from "next/server";
import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
// Pre-auth route: looks up User by email before any tenant is known, like src/lib/auth.ts.
import { rawPrisma as prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api/http";
import { sendEmail } from "@/services/email";
import { getBaseUrl } from "@/lib/url";

const OTP_TTL_MS = 10 * 60 * 1000;

const GENERIC_MESSAGE =
  "If an account exists for that email, a password reset OTP has been sent.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!email) {
      return jsonError(Object.assign(new Error("Email is required."), { status: 422 }));
    }

    const user = await prisma.user.findFirst({ where: { email } });

    // Always return the same message whether or not the account exists,
    // so this endpoint can't be used to enumerate registered emails.
    if (!user || !user.isActive) {
      return jsonOk({ message: GENERIC_MESSAGE });
    }

    const otp = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetOtpHash: otpHash,
        resetOtpExpiresAt: new Date(Date.now() + OTP_TTL_MS),
        resetOtpAttempts: 0,
      },
    });

    const resetUrl = `${getBaseUrl(req)}/forgot-password`;

    await sendEmail({
      to: user.email,
      subject: "Reset Password For Youth managment",
      text:
        `Hey here is a otp to reset your password : ${otp}\n\n` +
        `Reset it here: ${resetUrl}\n\n` +
        `This code expires in 10 minutes.\n\n` +
        `From \nPeople's Youth Association\nM.Raviteja`,
      html:
        `<p>Hey here is a otp to reset your password :</p>` +
        `<p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${otp}</p>` +
        `<p>Reset it here: <a href="${resetUrl}">${resetUrl}</a></p>` +
        `<p>This code expires in <strong>10 minutes</strong>.</p>` +
        `<p>From <br/>People's Youth Association<br/>M.Raviteja</p>`,
    });

    return jsonOk({ message: GENERIC_MESSAGE });
  } catch (e) {
    return jsonError(e);
  }
}
