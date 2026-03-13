import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export type ApiAuthContext = {
  userId: string;
  role: "ADMIN" | "USER";
};

export async function requireAuth(req: NextRequest): Promise<ApiAuthContext> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.sub) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
  const role = (token as { role?: ApiAuthContext["role"] }).role ?? "USER";
  return { userId: token.sub, role };
}

export async function requireAdmin(req: NextRequest): Promise<ApiAuthContext> {
  const ctx = await requireAuth(req);
  if (ctx.role !== "ADMIN") {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return ctx;
}

