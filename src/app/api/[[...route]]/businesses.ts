import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { getCookie } from "hono/cookie";
import { currentUser } from "@/src/lib/auth";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { businesses, insertBusinessSchema } from "@/src/db/schemas/businesses";

const app = new Hono()
  .get("/", async (c) => {
    const user = await currentUser();
    const businessId = getCookie(c, "business_id");

    console.log("Business ID from cookie: " + businessId);

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db.select().from(businesses);

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ message: "Business ID is required" }, 400);
      }

      const [data] = await db
        .select()
        .from(businesses)
        .where(eq(businesses.id, id));

      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator("json", insertBusinessSchema.omit({ id: true })),
    async (c) => {
      const user = await currentUser();
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(businesses)
        .values({
          id: createId(),
          ...values,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const user = await currentUser();
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(businesses)
        .where(inArray(businesses.id, values.ids))
        .returning({
          id: businesses.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertBusinessSchema.omit({
        id: true,
        businessType: true,
        userId: true,
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ message: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(businesses)
        .set({
          userId: user.id,
          ...values,
        })
        .where(and(eq(businesses.id, id), eq(businesses.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ message: "Business ID is required" }, 400);
      }

      const [data] = await db
        .delete(businesses)
        .where(eq(businesses.id, id))
        .returning({ id: businesses.id });

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    }
  );
export default app;
