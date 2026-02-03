import {
  orderStatusEnum,
  orderSourceEnum,
  paymentStatusEnum,
  paymentMethodEnum,
} from "../enums";

import { timestamps } from "../utils";
import { businesses } from "./businesses";
import { timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, integer } from "drizzle-orm/pg-core";

// Orders
export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull(),
  customerFirstName: text("customer_first_name").notNull(),
  customerLastName: text("customer_last_name").notNull(),
  customerAddress: text("customer_address"),
  customerCity: text("customer_city"),
  customerPostalCode: text("customer_postal_code"),
  customerCountry: text("customer_country"),
  customerLandmark: text("customer_landmark"),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  subtotal: integer("subtotal").notNull(), // Amount before tax
  taxAmount: integer("tax_amount"), // Calculated tax amount
  amount: integer("amount").notNull(), // Total amount including tax
  orderStatus: orderStatusEnum("order_status").notNull(),
  orderSource: orderSourceEnum("order_source").notNull(),
  paymentMethodEnum: paymentMethodEnum("payment_method").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull(),
  startDate: timestamp("start_date", { mode: "date" }),
  endDate: timestamp("end_date", { mode: "date" }),
  userId: text("user_id"),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertOrderSchema = createInsertSchema(orders);

// Orders Items
export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity"),
  unitPrice: integer("unit_price").notNull(),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertOrderItemSchema = createInsertSchema(orderItems);
