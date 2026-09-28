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

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    if (isApiPath(pathname)) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const token = await getToken({ req, secret });
  
  if (!token) {
    if (isApiPath(pathname)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const defaultCallbackUrl = pathname.startsWith("/admin")
      ? "/admin/dashboard"
      : pathname.startsWith("/user")
        ? "/user/dashboard"
        : req.nextUrl.pathname;

    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", defaultCallbackUrl);
    return NextResponse.redirect(url);
  }

  // Check if token has required claims
  if (!token.sub) {
    console.warn("Middleware: Token present but missing sub claim", { pathname, tokenKeys: Object.keys(token) });
    if (isApiPath(pathname)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = (token as { role?: "ADMIN" | "USER" }).role ?? "USER";
  
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (role !== "ADMIN") {
      if (isApiPath(pathname)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/api/admin/:path*", "/api/user/:path*"],
};
