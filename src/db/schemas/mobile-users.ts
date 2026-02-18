import { timestamps } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { mobileUserProviderEnum } from "../enums";
import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const mobileUsers = pgTable("mobile_users", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  provider: mobileUserProviderEnum("provider").notNull(),
  providerId: text("provider_id").notNull(),
  avatar: text("avatar"),
  gender: text("gender"),
  height: text("height"),
  waist: text("waist"),
  unit: text("unit").default("inches"),
  language: text("language").default("en-US"),
  isActive: boolean("is_active").notNull().default(true),
  ...timestamps,
});

export const insertMobileUserSchema = createInsertSchema(mobileUsers);
