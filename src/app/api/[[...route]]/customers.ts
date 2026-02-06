import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { getCookie } from "hono/cookie";
import { currentUser } from "@/src/lib/auth";
import { and, eq, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { CustomerSchema } from "@/src/schemas/customer";
import { customers, insertCustomerSchema } from "@/src/db/schemas/customers";

const app = new Hono()
  .get("/", async (c) => {
    const user = await currentUser();

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const businessId = getCookie(c, "business_id");

    if (!businessId || businessId === "undefined") {
      return c.json({ error: "Business ID is required" }, 400);
    }

    const data = await db
      .select({
        id: customers.id,
        firstName: customers.firstName,
        lastName: customers.lastName,
        email: customers.email,
        phone: customers.phone,
        createdAt: customers.createdAt,
        updatedAt: customers.updatedAt,
      })
      .from(customers)
      .where(eq(customers.businessId, businessId));

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
        return c.json({ message: "User ID is required" }, 400);
      }

      const [data] = await db
        .select()
        .from(customers)
        .where(eq(customers.id, id));

      return c.json({ data });
    },
  )
  .post("/", zValidator("json", CustomerSchema), async (c) => {
    const values = c.req.valid("json");

    const businessId = getCookie(c, "business_id");

    if (!businessId || businessId === "undefined") {
      return c.json({ error: "Business ID is required" }, 400);
    }

    const [data] = await db
      .insert(customers)
      .values({
        id: createId(),
        businessId,
        ...values,
      } as typeof customers.$inferInsert)
      .returning();

    return c.json({ data });
  })
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
        .delete(customers)
        .where(inArray(customers.id, values.ids))
        .returning({
          id: customers.id,
        });

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      }),
    ),
    zValidator(
      "json",
      insertCustomerSchema.pick({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      }),
    ),
    async (c) => {
      const user = await currentUser();

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const values = c.req.valid("json");

      const [data] = await db
        .update(customers)
        .set(values)
        .where(and(eq(customers.id, user.id), eq(customers.id, user?.id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json({ data });
    },
  )
  .delete(async (c) => {
    const user = await currentUser();

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [data] = await db
      .delete(customers)
      .where(and(eq(customers.id, user.id)))
      .returning({ id: customers.id });

    if (!data) {
      return c.json({ error: "Not Found" }, 404);
    }

    return c.json({ data });
  });
export default app;
