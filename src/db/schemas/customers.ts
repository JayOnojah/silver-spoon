import { timestamps } from "../utils";
import { businesses } from "./businesses";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),
  landmark: text("landmark"),
  userId: text("user_id"),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertCustomerSchema = createInsertSchema(customers);
