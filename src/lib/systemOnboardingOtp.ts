import bcrypt from "bcryptjs";

/**
 * Gate for the single-operator "onboard a new tenant" flow
 * (src/app/system/onboard-tenant, src/app/api/system/onboard-tenant/*).
 *
 * Deliberately NOT backed by any DB table — this exists outside the app's
 * normal tenant-scoped data model entirely (it's what CREATES tenants), so
 * it can't depend on Tenant/User rows existing yet. State lives in memory
 * for the lifetime of the Node process, which is safe on this app's
 * persistent-server deployment (Render, not serverless) — see
 * src/lib/cronScheduler.ts for the same assumption elsewhere in the codebase.
 *
 * Only ever one entry, for the one allowed email — not a general OTP system.
 */

// Set ONBOARDING_ALLOWED_EMAIL in the environment (see .env.example) rather
// than hardcoding it here — if it's unset, getOnboardingAllowedEmail() throws
// so the endpoints fail closed instead of silently allowing/denying wrong.
export function getOnboardingAllowedEmail(): string {
  const email = process.env.ONBOARDING_ALLOWED_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw Object.assign(new Error("ONBOARDING_ALLOWED_EMAIL is not configured."), { status: 500 });
  }
  return email;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type OtpState = {
  hash: string;
  expiresAt: number;
  attempts: number;
};

const globalForOtp = globalThis as unknown as { systemOnboardingOtp?: OtpState | null };
if (globalForOtp.systemOnboardingOtp === undefined) globalForOtp.systemOnboardingOtp = null;

export async function issueOnboardingOtp(): Promise<string> {
  const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6 digits, no leading zero
  const hash = await bcrypt.hash(otp, 10);
  globalForOtp.systemOnboardingOtp = {
    hash,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  };
  return otp;
}

export type OtpVerifyResult = { ok: true } | { ok: false; reason: "no-otp-requested" | "expired" | "too-many-attempts" | "invalid" };

export async function verifyOnboardingOtp(otp: string): Promise<OtpVerifyResult> {
  const state = globalForOtp.systemOnboardingOtp;
  if (!state) return { ok: false, reason: "no-otp-requested" };

  if (Date.now() > state.expiresAt) {
    globalForOtp.systemOnboardingOtp = null;
    return { ok: false, reason: "expired" };
  }

  if (state.attempts >= MAX_ATTEMPTS) {
    globalForOtp.systemOnboardingOtp = null;
    return { ok: false, reason: "too-many-attempts" };
  }

  const isValid = await bcrypt.compare(otp, state.hash);
  if (!isValid) {
    state.attempts += 1;
    return { ok: false, reason: "invalid" };
  }

  // One-time use: clear immediately on success so it can't be replayed.
  globalForOtp.systemOnboardingOtp = null;
  return { ok: true };
}
