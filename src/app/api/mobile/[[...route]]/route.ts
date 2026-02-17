import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "./auth";
import users from "./users";
import measurements from "./measurements";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/mobile");

const routes = app
  .route("/auth", auth)
  .route("/users", users)
  .route("/measurements", measurements);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
