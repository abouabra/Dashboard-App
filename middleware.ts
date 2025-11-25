// middleware.ts (or proxy.ts, depending on your setup)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/"]); // adjust this list if you have more public routes

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth();

  // If not signed in and it's not a public route → redirect to "/"
  if (!isAuthenticated && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    // match everything except static / _next assets
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};
