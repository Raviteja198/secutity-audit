import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
// Pre-auth route: looks up User by email before any tenant is known, like src/lib/auth.ts.
import { rawPrisma as prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/api/http";
import { uploadTenantLogo } from "@/services/cloudinary";

const MAX_ATTEMPTS = 5;
const INVALID_OTP_MESSAGE = "Invalid or expired OTP. Please request a new one.";
const PASSWORD_RULE_MESSAGE =
  "Password must be 7-15 characters and include at least one uppercase letter, one number, and one special character.";

function isValidPassword(password: string): boolean {
  if (password.length <= 6 || password.length > 15) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const otp = String(formData.get("otp") ?? "").trim();
    const newPassword = String(formData.get("newPassword") ?? "");
    const logo = formData.get("logo");

    if (!email || !otp || !newPassword) {
      return jsonError(
        Object.assign(new Error("email, otp and newPassword are required."), { status: 422 })
      );
    }
    if (!isValidPassword(newPassword)) {
      return jsonError(Object.assign(new Error(PASSWORD_RULE_MESSAGE), { status: 422 }));
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (
      !user ||
      !user.isActive ||
      !user.resetOtpHash ||
      !user.resetOtpExpiresAt ||
      user.resetOtpExpiresAt.getTime() < Date.now()
    ) {
      return jsonError(Object.assign(new Error(INVALID_OTP_MESSAGE), { status: 400 }));
    }

    if (user.resetOtpAttempts >= MAX_ATTEMPTS) {
      return jsonError(Object.assign(new Error(INVALID_OTP_MESSAGE), { status: 400 }));
    }

    const isValid = await bcrypt.compare(otp, user.resetOtpHash);
    if (!isValid) {
      await prisma.user.update({
        where: { id: user.id },
        data: { resetOtpAttempts: { increment: 1 } },
      });
      return jsonError(Object.assign(new Error(INVALID_OTP_MESSAGE), { status: 400 }));
    }

    const newHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newHash,
        resetOtpHash: null,
        resetOtpExpiresAt: null,
        resetOtpAttempts: 0,
        otpGeneratedAt: null,
      },
    });

    // Optional tenant logo, only meaningful for admins (e.g. during onboarding's
    // "set your password" step) — silently ignored for regular member accounts.
    if (user.role === "ADMIN" && logo instanceof File && logo.size > 0) {
      const logoUrl = await uploadTenantLogo(logo, user.tenantId);
      await prisma.tenant.update({ where: { id: user.tenantId }, data: { logoUrl } });
    }

    return jsonOk({ message: "Password reset successfully. You can now sign in." });
  } catch (e) {
    return jsonError(e);
  }
}
