import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isHomePage = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth();

  if (isAuthenticated && isHomePage(req)) {
    return NextResponse.redirect(new URL("/agencies", req.url));
  }

  if (!isAuthenticated && !isHomePage(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
});

export const config = {
  matcher: [
    // match everything except static / _next assets
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};
