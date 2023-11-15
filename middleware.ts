import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authPaths = ["/auth/signup", "/auth/signin"];
  const hasCookies = request.cookies.get("accessToken") && request.cookies.get("refreshToken");
  if (!authPaths.includes(pathname) && !hasCookies) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  } else if (authPaths.includes(pathname) && hasCookies) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/", "/comments/:path*"]
}
