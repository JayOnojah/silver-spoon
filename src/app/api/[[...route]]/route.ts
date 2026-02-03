import { Hono } from "hono";
import { handle } from "hono/vercel";

import orders from "./orders";
import websites from "./websites";
import customers from "./customers";
import businesses from "./businesses";
// import catalogues from "./catalogues";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/orders", orders)
  .route("/websites", websites)
  .route("/customers", customers)
  .route("/businesses", businesses);
// .route("/catalogues", catalogues); --- IGNORE ---

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
