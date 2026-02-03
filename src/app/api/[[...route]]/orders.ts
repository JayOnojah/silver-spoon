import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { getCookie } from "hono/cookie";
import { currentUser } from "@/src/lib/auth";
import { and, eq, desc } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { OrderSchema } from "@/src/schemas/order";
import { orders, orderItems } from "@/src/db/schemas/orders";

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
        id: orders.id,
        orderId: orders.orderId,
        customerFirstName: orders.customerFirstName,
        customerLastName: orders.customerLastName,
        customerEmail: orders.customerEmail,
        customerPhone: orders.customerPhone,
        subtotal: orders.subtotal,
        taxAmount: orders.taxAmount,
        amount: orders.amount,
        orderStatus: orders.orderStatus,
        orderSource: orders.orderSource,
        paymentMethodEnum: orders.paymentMethodEnum,
        paymentStatus: orders.paymentStatus,
        startDate: orders.startDate,
        endDate: orders.endDate,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
      })
      .from(orders)
      .where(eq(orders.businessId, businessId))
      .orderBy(desc(orders.createdAt));

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
        return c.json({ message: "Order ID is required" }, 400);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [order] = await db
        .select()
        .from(orders)
        .where(and(eq(orders.id, id), eq(orders.businessId, businessId)));

      if (!order) {
        return c.json({ error: "Order not found" }, 404);
      }

      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, id));

      return c.json({ data: { ...order, items } });
    },
  )
  .post("/", zValidator("json", OrderSchema), async (c) => {
    const user = await currentUser();
    const values = c.req.valid("json");

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const businessId = getCookie(c, "business_id");

    if (!businessId || businessId === "undefined") {
      return c.json({ error: "Business ID is required" }, 400);
    }

    const orderId = createId();

    const subtotal = values.orderItems?.reduce(
      (sum, item) => sum + (item.unitPrice * (item.quantity || 1)),
      0,
    ) || 0;

    const taxAmount = 0;
    const amount = subtotal + taxAmount;

    await db.insert(orders).values({
      id: orderId,
      orderId: values.orderId,
      customerFirstName: values.customerFirstName,
      customerLastName: values.customerLastName,
      customerEmail: values.customerEmail || null,
      customerPhone: values.customerPhone || null,
      customerAddress: values.customerAddress || null,
      customerCity: values.customerCity || null,
      customerPostalCode: values.customerPostalCode || null,
      customerCountry: values.customerCountry || null,
      customerLandmark: values.customerLandmark || null,
      subtotal,
      taxAmount,
      amount,
      orderStatus: "pending",
      orderSource: "system",
      paymentMethodEnum: "cash",
      paymentStatus: "not_paid",
      userId: user.id,
      businessId,
    } as typeof orders.$inferInsert);

    if (values.orderItems && values.orderItems.length > 0) {
      await db.insert(orderItems).values(
        values.orderItems.map((item) => ({
          id: createId(),
          orderId,
          title: item.title,
          description: item.description,
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice,
          businessId,
        } as typeof orderItems.$inferInsert)),
      );
    }

    const [data] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));

    return c.json({ data });
  })
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator(
      "json",
      z.object({
        orderStatus: z.enum(["pending", "processing", "completed", "cancelled"]).optional(),
        paymentStatus: z.enum(["not_paid", "paid_in_full", "partial_payment"]).optional(),
      }),
    ),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      const [data] = await db
        .update(orders)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(and(eq(orders.id, id), eq(orders.businessId, businessId)))
        .returning();

      if (!data) {
        return c.json({ error: "Order not found" }, 404);
      }

      return c.json({ data });
    },
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const user = await currentUser();
      const { id } = c.req.valid("param");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const businessId = getCookie(c, "business_id");

      if (!businessId || businessId === "undefined") {
        return c.json({ error: "Business ID is required" }, 400);
      }

      // Delete order items first (foreign key constraint)
      await db.delete(orderItems).where(eq(orderItems.orderId, id));

      const [data] = await db
        .delete(orders)
        .where(and(eq(orders.id, id), eq(orders.businessId, businessId)))
        .returning({
          id: orders.id,
        });

      if (!data) {
        return c.json({ error: "Order not found" }, 404);
      }

      return c.json({ data });
    },
  );

export default app;
