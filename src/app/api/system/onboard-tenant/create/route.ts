import { NextRequest } from "next/server";
import { randomBytes, randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import { jsonCreated, jsonError } from "@/lib/api/http";
// Deliberately using the raw client: this endpoint CREATES the first tenant
// and admin user, so there is no tenantId to scope through yet — same
// justification as src/lib/auth.ts.
import { rawPrisma } from "@/lib/prisma";
import { getOnboardingAllowedEmail, verifyOnboardingOtp } from "@/lib/systemOnboardingOtp";
import { sendEmail } from "@/services/email";
import { getBaseUrl } from "@/lib/url";

const RESET_OTP_TTL_MS = 10 * 60 * 1000;

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const OTP_ERROR_MESSAGES: Record<string, string> = {
  "no-otp-requested": "Request a verification code first.",
  "expired": "Verification code has expired. Request a new one.",
  "too-many-attempts": "Too many incorrect attempts. Request a new verification code.",
  "invalid": "Incorrect verification code.",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email ?? "").trim().toLowerCase();
    const otp = String(body?.otp ?? "").trim();

    // Hard gate #1: email must match exactly, checked server-side on every
    // request — the client-submitted value is never trusted.
    if (email !== getOnboardingAllowedEmail()) {
      return jsonError(Object.assign(new Error("Not authorized."), { status: 403 }));
    }

    // Hard gate #2: a valid, unexpired, not-already-used OTP for this exact
    // request. No path below this line executes without both gates passing.
    if (!otp) {
      return jsonError(Object.assign(new Error("Verification code is required."), { status: 422 }));
    }
    const otpResult = await verifyOnboardingOtp(otp);
    if (!otpResult.ok) {
      return jsonError(Object.assign(new Error(OTP_ERROR_MESSAGES[otpResult.reason]), { status: 401 }));
    }

    const tenantName = String(body?.tenantName ?? "").trim();
    const adminEmail = String(body?.adminEmail ?? "").trim().toLowerCase();
    const tenantId = body?.tenantId ? slugify(String(body.tenantId)) : slugify(tenantName);

    if (!tenantName) {
      return jsonError(Object.assign(new Error("Tenant name is required."), { status: 422 }));
    }
    if (!tenantId) {
      return jsonError(Object.assign(new Error("Could not derive a valid tenant id from the name — provide one explicitly."), { status: 422 }));
    }
    if (!adminEmail || !adminEmail.includes("@")) {
      return jsonError(Object.assign(new Error("A valid admin email is required."), { status: 422 }));
    }

    const existingTenant = await rawPrisma.tenant.findUnique({ where: { id: tenantId } });
    if (existingTenant) {
      return jsonError(Object.assign(new Error(`Tenant id "${tenantId}" already exists.`), { status: 409 }));
    }

    // No admin-set password: the account is created with a random, unusable
    // password (never revealed to anyone), plus a "set your password" reset
    // OTP — same mechanism as the existing forgot-password flow — so the new
    // admin sets their own password via /forgot-password.
    const unusablePassword = randomBytes(32).toString("hex");
    const unusablePasswordHash = await bcrypt.hash(unusablePassword, 12);

    const resetOtp = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const resetOtpHash = await bcrypt.hash(resetOtp, 10);

    const result = await rawPrisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({ data: { id: tenantId, name: tenantName } });
      const admin = await tx.user.create({
        data: {
          tenantId: tenant.id,
          email: adminEmail,
          passwordHash: unusablePasswordHash,
          role: "ADMIN",
          isActive: true,
          name: "Admin",
          resetOtpHash,
          resetOtpExpiresAt: new Date(Date.now() + RESET_OTP_TTL_MS),
          resetOtpAttempts: 0,
        },
      });
      return { tenant, admin };
    });

    const setPasswordUrl = `${getBaseUrl(req)}/forgot-password`;

    await sendEmail({
      to: adminEmail,
      subject: `Set your password — ${tenantName} admin account`,
      text:
        `An admin account for "${tenantName}" has been created for you.\n\n` +
        `Set your password here using this email and the code below:\n${setPasswordUrl}\n\n` +
        `Verification code: ${resetOtp}\n\n` +
        `This code expires in 10 minutes.`,
      html:
        `<p>An admin account for <strong>${tenantName}</strong> has been created for you.</p>` +
        `<p>Set your password using this email and the code below:</p>` +
        `<p><a href="${setPasswordUrl}">${setPasswordUrl}</a></p>` +
        `<p style="font-size:24px;font-weight:bold;letter-spacing:4px;">${resetOtp}</p>` +
        `<p>This code expires in <strong>10 minutes</strong>.</p>`,
    });

    return jsonCreated({
      tenant: { id: result.tenant.id, name: result.tenant.name },
      admin: { id: result.admin.id, email: result.admin.email },
    });
  } catch (e) {
    return jsonError(e);
  }
}
