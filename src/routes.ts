/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @types {string[]}
 */
export const publicRoutes = [
  "/",
  "/blog",
  "/cobblers",
  "/pricing",
  "/features",
  "/academy",
  "/about-us",
  "/fashion-designers",
];

/**
 * Static public prefixes (exact or starting with)
 */
export const publicPrefixes = [
  "/staff",
  "/website",
  "/api/orders",
  "/api/reviews",
];

/**
 * Dynamic public API routes with business handle
 */
export const isPublicWebsiteApi = (pathname: string) =>
  /^\/api\/[^/]+\/website(\/.*)?$/.test(pathname); // /api/<handle>/website

/**
 * Combined check for any public path
 */
export const isPublicPath = (pathname: string) =>
  publicPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
  publicRoutes.includes(pathname) ||
  isPublicWebsiteApi(pathname);

/**
 * Authentication routes
 */
export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/forgot-password",
];

/**
 * API auth prefix (NextAuth routes)
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
