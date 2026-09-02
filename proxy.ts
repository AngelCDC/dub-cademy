import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import arcjet, { createMiddleware, detectBot } from "@arcjet/next";

// Configure Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
        "STRIPE_WEBHOOK",

        // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
  ],
});

// Your existing authentication middleware
async function authMiddleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static assets, but auth check only on admin routes
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

// Combine Arcjet with your existing middleware
export default createMiddleware(aj, async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();

  // /login?redirect=... → store the return path so we can bounce back after login
  if (pathname === "/login") {
    const redirectTo = request.nextUrl.searchParams.get("redirect");
    if (isValidReturnPath(redirectTo)) {
      res.cookies.set("auth_return_to", redirectTo!, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1800, // 30 min
        path: "/",
      });
    } else {
      res.cookies.delete("auth_return_to");
    }
  }

  // /auth-redirect → if the login flow started from a return path, go back there
  if (pathname === "/auth-redirect") {
    const returnTo = request.cookies.get("auth_return_to")?.value;
    if (isValidReturnPath(returnTo)) {
      const response = NextResponse.redirect(new URL(returnTo!, request.url));
      response.cookies.delete("auth_return_to");
      return response;
    }
  }

  // Only apply auth middleware to admin routes
  if (pathname.startsWith("/admin")) {
    return authMiddleware(request);
  }

  // For non-admin routes, just continue
  return res;
});

// Allow only internal absolute paths (prevents open redirects via ?redirect=/cookie)
function isValidReturnPath(value: string | null | undefined): value is string {
  return !!value && value.length < 200 && /^\/[^/\\]/.test(value);
}
