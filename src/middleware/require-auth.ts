import { jwt } from "hono/jwt";

export const requireAuth = jwt({
  secret: process.env.JWT_SECRET_KEY!,
  alg: "HS256",
});
