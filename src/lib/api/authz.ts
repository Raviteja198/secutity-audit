import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export type ApiAuthContext = {
  userId: string;
  role: "ADMIN" | "USER";
  tenantId: string;
};

export async function requireAuth(req: NextRequest): Promise<ApiAuthContext> {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw Object.assign(new Error("Authentication not configured: NEXTAUTH_SECRET is missing"), { status: 500 });
  }

  const token = await getToken({ req, secret });

  if (!token) {
    throw Object.assign(new Error("Unauthorized - no token found"), { status: 401 });
  }

  if (!token.sub) {
    console.error("Token found but no sub claim:", { token: Object.keys(token) });
    throw Object.assign(new Error("Unauthorized - invalid token"), { status: 401 });
  }

  const role = (token as { role?: ApiAuthContext["role"] }).role ?? "USER";
  const tenantId = (token as { tenantId?: string }).tenantId;

  if (!tenantId) {
    // Any pre-multi-tenancy token (minted before this deploy) is missing this claim —
    // fail closed rather than silently defaulting to the wrong tenant. Affected users
    // just need to log out and back in once.
    throw Object.assign(new Error("Unauthorized - missing tenant context, please log in again"), { status: 401 });
  }

  return { userId: token.sub, role, tenantId };
}

export async function requireAdmin(req: NextRequest): Promise<ApiAuthContext> {
  const ctx = await requireAuth(req);
  if (ctx.role !== "ADMIN") {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return ctx;
}

