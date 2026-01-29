import { users } from "./users";
import { timestamps } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Verification Tokens
export const verificationTokens = pgTable("verification_tokens", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertVerificationTokenSchema =
  createInsertSchema(verificationTokens);

// Password Reset Tokens
export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertPasswordResetTokenSchema =
  createInsertSchema(passwordResetTokens);
