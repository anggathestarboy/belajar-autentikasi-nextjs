import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Halaman yang boleh diakses tanpa login
  const publicPaths = ["/login"];

  const isPublic = publicPaths.some((path) =>
    pathname.startsWith(path)
  );

  // ❌ Belum login & akses halaman selain login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Sudah login tapi buka login page
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/makan/:path*",
    "/posts/:path*",
    "/login",
    "/minum/:path*",
  ],
};