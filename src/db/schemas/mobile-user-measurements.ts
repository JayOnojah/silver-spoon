import { timestamps } from "../utils";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text } from "drizzle-orm/pg-core";

export const mobileUserMeasurements = pgTable("mobile_user_measurements", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  height: text("height").notNull(),
  waist: text("waist").notNull(),
  ...timestamps,
});

export const insertMobileUserMeasurementSchema = createInsertSchema(
  mobileUserMeasurements,
);
