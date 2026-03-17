import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isApiPath(pathname: string) {
  return pathname.startsWith("/api/");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/user");

  if (!needsAuth) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    if (isApiPath(pathname)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const defaultCallbackUrl = pathname.startsWith("/admin")
      ? "/admin/dashboard"
      : pathname.startsWith("/user")
        ? "/user"
        : req.nextUrl.pathname;

    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", defaultCallbackUrl);
    return NextResponse.redirect(url);
  }

  const role = (token as { role?: "ADMIN" | "USER" }).role;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (role !== "ADMIN") {
      if (isApiPath(pathname)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/api/admin/:path*", "/api/user/:path*"],
};
