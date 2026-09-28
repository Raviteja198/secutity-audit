import { NextRequest } from "next/server";
import { jsonError, jsonOk } from "@/lib/api/http";
import { sendEmail } from "@/services/email";
import { getOnboardingAllowedEmail, issueOnboardingOtp } from "@/lib/systemOnboardingOtp";

const GENERIC_MESSAGE = "If eligible, a verification code has been sent.";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();
    const allowedEmail = getOnboardingAllowedEmail();

    // Same response regardless of match — don't let this endpoint be used to
    // confirm/deny which email is allowed.
    if (email !== allowedEmail) {
      return jsonOk({ message: GENERIC_MESSAGE });
    }

    const otp = await issueOnboardingOtp();

    await sendEmail({
      to: allowedEmail,
      subject: "New tenant onboarding verification code",
      text:
        `A new-tenant onboarding request was started.\n\n` +
        `Verification code: ${otp}\n\n` +
        `This code expires in 10 minutes. If you didn't request this, ignore this email.`,
      html:
        `<p>A new-tenant onboarding request was started.</p>` +
        `<p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${otp}</p>` +
        `<p>This code expires in <strong>10 minutes</strong>. If you didn't request this, ignore this email.</p>`,
    });

    return jsonOk({ message: GENERIC_MESSAGE });
  } catch (e) {
    return jsonError(e);
  }
}
