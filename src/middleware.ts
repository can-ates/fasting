import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("fastingSession")?.value;

  if (currentUser && request.nextUrl.pathname.startsWith("/signup")) {
    return Response.redirect(new URL("/home", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/signup")) {
    return Response.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
