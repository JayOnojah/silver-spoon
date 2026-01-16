import { timestamps } from "../utils";
import { userPlatformRoleEnum } from "../enums";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  phone: text("phone").notNull(),
  phoneVerified: timestamp("phone_verified", { mode: "date" }),
  password: text("password").notNull(),
  avatar: text("avatar"),
  platformRole: userPlatformRoleEnum("role").notNull().default("owner"),
  defaultBusinessId: text("default_business_id"),
  defaultBusinessType: text("default_business_type"),
  isActive: boolean("is_active").notNull().default(true),
  ...timestamps,
});

export const insertUserSchema = createInsertSchema(users);
