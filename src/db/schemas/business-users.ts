import { users } from "./users";
import { businesses } from "./businesses";
import { businessUserRoleEnum } from "../enums";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, primaryKey, boolean } from "drizzle-orm/pg-core";

// Business Users
export const businessUsers = pgTable(
  "business_users",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    role: businessUserRoleEnum("role").notNull(),
    isActive: boolean("is_active").notNull().default(true),
  },
  (t) => [primaryKey({ columns: [t.userId, t.businessId] })]
);

export const insertBusinessUserSchema = createInsertSchema(businessUsers);
