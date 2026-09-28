import { NextRequest } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAdmin } from "@/lib/api/authz";
import { jsonCreated, jsonError } from "@/lib/api/http";

/**
 * POST /api/admin/members/[id]/otp
 *
 * Generates (or regenerates) a one-time password for a member.
 * - If the member has no login account, one is created.
 * - The plain OTP is returned ONCE to the admin — it is never stored in plain text.
 * - The member can log in with their email + OTP.
 * - After logging in, they should change their password.
 *
 * Body: { email?: string }  — required only if member has no email and no existing login
 */
export async function POST(req: NextRequest, routeCtx: { params: Promise<{ id: string }> }) {
  try {
    const ctx = await requireAdmin(req);
    const db = forTenant(ctx.tenantId);

    const { id } = await routeCtx.params;
    const body = await req.json().catch(() => ({}));

    const member = await db.member.findUnique({
      where: { id },
      include: { loginUser: true },
    });

    if (!member) {
      return jsonError(Object.assign(new Error("Member not found."), { status: 404 }));
    }

    // Resolve login email
    const loginEmail = (
      body?.email?.trim() ||
      member.loginUser?.email ||
      member.email?.trim()
    )?.toLowerCase();

    if (!loginEmail) {
      return jsonError(
        Object.assign(
          new Error(
            "This member has no email address. Provide an email in the request body to create their login."
          ),
          { status: 422 }
        )
      );
    }

    // Generate 8-char uppercase OTP  e.g. "A3F89B2C"
    const plainOtp = randomBytes(4).toString("hex").toUpperCase();
    const hashedOtp = await bcrypt.hash(plainOtp, 10);
    const now = new Date();

    let loginUserId: string;

    if (member.loginUser) {
      // Update existing login account
      await db.user.update({
        where: { id: member.loginUser.id },
        data: {
          email: loginEmail,
          passwordHash: hashedOtp,
          isActive: true,
          otpGeneratedAt: now,
        },
      });
      loginUserId = member.loginUser.id;
    } else {
      // Check if an unlinked User account already has this email
      const existing = await db.user.findUnique({ where: { tenantId_email: { tenantId: ctx.tenantId, email: loginEmail } } });
      if (existing && existing.memberId && existing.memberId !== id) {
        return jsonError(
          Object.assign(
            new Error(`Email "${loginEmail}" is already linked to another member.`),
            { status: 409 }
          )
        );
      }

      if (existing) {
        // Re-use the existing account and link it
        await db.user.update({
          where: { id: existing.id },
          data: {
            passwordHash: hashedOtp,
            isActive: true,
            role: "USER",
            memberId: id,
            otpGeneratedAt: now,
          },
        });
        loginUserId = existing.id;
      } else {
        // Create a brand-new login account
        const created = await db.user.create({
          data: {
            tenantId: ctx.tenantId,
            email: loginEmail,
            name: member.fullName,
            passwordHash: hashedOtp,
            role: "USER",
            isActive: true,
            memberId: id,
            otpGeneratedAt: now,
          },
        });
        loginUserId = created.id;
      }
    }

    return jsonCreated({
      otp: plainOtp,
      loginEmail,
      loginUserId,
      memberName: member.fullName,
      generatedAt: now.toISOString(),
      message: `Share this OTP with ${member.fullName}. They log in at /login with email "${loginEmail}" and this OTP as their password.`,
    });
  } catch (e) {
    return jsonError(e);
  }
}
