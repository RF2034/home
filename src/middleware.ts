import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MAINTENANCE_MODE } from "./lib/maintenance";

export function middleware(request: NextRequest) {
  if (
    MAINTENANCE_MODE &&
    !request.nextUrl.pathname.startsWith("/maintenance")
  ) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
