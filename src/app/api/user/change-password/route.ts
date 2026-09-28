import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { forTenant } from "@/lib/tenantPrisma";
import { requireAuth } from "@/lib/api/authz";
import { jsonError, jsonOk } from "@/lib/api/http";

/**
 * POST /api/user/change-password
 * Available to all authenticated users (both ADMIN and USER roles).
 *
 * Body: { currentPassword: string; newPassword: string }
 */
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req);
    const db = forTenant(auth.tenantId);

    const body = await req.json();
    const currentPassword: string = body?.currentPassword ?? "";
    const newPassword: string = body?.newPassword ?? "";

    if (!currentPassword || !newPassword) {
      return jsonError(
        Object.assign(new Error("currentPassword and newPassword are required."), { status: 422 })
      );
    }
    if (newPassword.length < 8) {
      return jsonError(
        Object.assign(new Error("New password must be at least 8 characters."), { status: 422 })
      );
    }
    if (newPassword === currentPassword) {
      return jsonError(
        Object.assign(new Error("New password must be different from the current password."), { status: 422 })
      );
    }

    const user = await db.user.findUnique({ where: { id: auth.userId } });
    if (!user) {
      return jsonError(Object.assign(new Error("User not found."), { status: 404 }));
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return jsonError(
        Object.assign(new Error("Current password is incorrect."), { status: 401 })
      );
    }

    const newHash = await bcrypt.hash(newPassword, 12);
    await db.user.update({
      where: { id: auth.userId },
      data: {
        passwordHash: newHash,
        otpGeneratedAt: null, // Clear OTP flag — password is now user-set
      },
    });

    return jsonOk({ message: "Password changed successfully." });
  } catch (e) {
    return jsonError(e);
  }
}
