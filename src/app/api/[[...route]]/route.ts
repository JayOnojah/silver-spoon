import { Hono } from "hono";
import { handle } from "hono/vercel";

import websites from "./websites";
import customers from "./customers";
import businesses from "./businesses";
// import orders from "./orders";
// import catalogues from "./catalogues";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/websites", websites)
  .route("/customers", customers)
  .route("/businesses", businesses);
// .route("/orders", orders); --- IGNORE ---
// .route("/catalogues", catalogues); --- IGNORE ---

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
