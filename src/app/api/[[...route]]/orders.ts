import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/src/db/drizzle";
import { getCookie } from "hono/cookie";
import { currentUser } from "@/src/lib/auth";
import { and, eq, desc } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { OrderSchema } from "@/src/schemas/order";
import { customers } from "@/src/db/schemas/customers";
import { orders, orderItems } from "@/src/db/schemas/orders";

// Generate order ID like ORD-001, ORD-002, etc.
const generateOrderId = async (businessId: string): Promise<string> => {
  const existingOrders = await db
    .select({ orderId: orders.orderId })
    .from(orders)
    .where(eq(orders.businessId, businessId))
    .orderBy(desc(orders.createdAt));

  const count = existingOrders.length + 1;
  return `ORD-${count.toString().padStart(3, "0")}`;
};

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
        customerId: orders.customerId,
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

    // Fetch customer data
    const [customer] = await db
      .select()
      .from(customers)
      .where(and(eq(customers.id, values.customerId), eq(customers.businessId, businessId)));

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }

    const id = createId();
    const orderId = await generateOrderId(businessId);

    const subtotal = values.items.reduce(
      (sum, item) => sum + (item.unitPrice * (item.quantity || 1)),
      0,
    );

    const taxAmount = 0;
    const amount = subtotal + taxAmount;

    await db.insert(orders).values({
      id,
      orderId,
      customerId: customer.id,
      customerFirstName: customer.firstName,
      customerLastName: customer.lastName,
      customerEmail: customer.email || null,
      customerPhone: customer.phone || null,
      customerAddress: customer.address || null,
      customerCity: customer.city || null,
      customerPostalCode: customer.postalCode || null,
      customerCountry: customer.country || null,
      customerLandmark: customer.landmark || null,
      subtotal,
      taxAmount,
      amount,
      orderStatus: values.orderStatus || "pending",
      orderSource: "system",
      paymentMethodEnum: "cash",
      paymentStatus: values.paymentStatus || "not_paid",
      startDate: values.startDate ? new Date(values.startDate) : null,
      endDate: values.endDate ? new Date(values.endDate) : null,
      userId: user.id,
      businessId,
    } as typeof orders.$inferInsert);

    if (values.items.length > 0) {
      await db.insert(orderItems).values(
        values.items.map((item) => ({
          id: createId(),
          orderId: id,
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
      .where(eq(orders.id, id));

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
