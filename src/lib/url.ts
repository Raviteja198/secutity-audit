import type { NextRequest } from "next/server";

/**
 * Resolves the app's own base URL for building links in emails. Each deployment
 * (Render, Vercel preview, Vercel prod) sets its own NEXTAUTH_URL, so that's the
 * authoritative source — it's already required to match the serving origin for
 * NextAuth callbacks/cookies. Falls back to the request's host for contexts
 * where NEXTAUTH_URL isn't set, then to localhost for local dev.
 */
export function getBaseUrl(req?: NextRequest): string {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.replace(/\/+$/, "");
  }
  if (req) {
    const proto = req.headers.get("x-forwarded-proto") ?? "https";
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    if (host) return `${proto}://${host}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
