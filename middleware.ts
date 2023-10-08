import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname !== "/auth/signup" 
    && pathname !== "/auth/signin" 
    && !request.cookies.get("accessToken") 
    && !request.cookies.get("refreshToken")
  ) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // if (status === "authenticated" && (request.url.includes("/signin") || request.url.includes("/signup"))) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/"
}
