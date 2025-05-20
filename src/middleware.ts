import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/auth");

  const hasAuthTokens = request.cookies.has("accessToken") || request.cookies.has("refreshToken");

  if (!hasAuthTokens && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (hasAuthTokens && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth/:path*"],
};
