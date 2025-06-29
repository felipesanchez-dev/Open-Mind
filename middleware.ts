import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  try {
    const hasAuthCookie =
      request.cookies.has("better-auth.session_token") ||
      request.cookies.has("session") ||
      request.cookies.has("authjs.session-token");

    if (hasAuthCookie) {
      const response = NextResponse.next();
      response.headers.set("x-has-auth-cookie", "true");
      return response;
    }
  } catch (error) {
    console.error("Middleware auth error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password"],
};
