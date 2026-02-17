import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { db } from "@/src/db/drizzle";
import { eq, and, sql } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { mobileUserMeasurements } from "@/src/db/schemas/mobile-user-measurements";

const app = new Hono().get("/", async (c) => {
  const { id_token } = await c.req.json<{ id_token: string }>();

  if (!id_token) {
    throw new HTTPException(400, { message: "Missing id_token" });
  }
});

export default app;
