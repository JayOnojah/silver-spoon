import {
  authRoutes,
  publicRoutes,
  isPublicPath,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const isProd = process.env.NODE_ENV === "production";

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isPublicRoute =
    publicRoutes.includes(pathname) || isPublicPath(pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // Set tenant_id cookie for logged-in users
  if (isLoggedIn) {
    const user: any = req.auth?.user;

    if (user?.defaultTenantId) {
      const response = NextResponse.next();

      response.cookies.set("business_id", user.defaultBusinessId, {
        path: "/",
        httpOnly: false, // Allow client-side access if needed
        secure: isProd,
        sameSite: "lax",
        domain: isProd ? ".usesilverspoon.com" : undefined,
        maxAge: 60 * 60 * 24 * 365,
      });

      return response;
    }
  }

  return null;
});

// Optionally, don't invoke middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
