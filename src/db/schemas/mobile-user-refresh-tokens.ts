import { timestamps } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const mobileUserRefreshTokens = pgTable("mobile_user_refresh_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  refreshToken: text("refresh_token").notNull(),
  deviceInfo: text("device_info"),
  revoked: boolean("revoked").notNull().default(false),
  ...timestamps,
});

export const insertMobileUserRefreshTokenSchema = createInsertSchema(
  mobileUserRefreshTokens,
);
