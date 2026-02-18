import { timestamps } from "../utils";
import { mobileUsers } from "./mobile-users";
import { businesses } from "./businesses";
import { createInsertSchema } from "drizzle-zod";
import { measurementStatusEnum } from "../enums";
import { pgTable, text, integer, real, jsonb, boolean } from "drizzle-orm/pg-core";

// Measurements
export const mobileUserMeasurements = pgTable("mobile_user_measurements", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => mobileUsers.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  status: measurementStatusEnum("status").notNull().default("processing"),
  height: real("height").notNull(),
  waist: real("waist"),
  unit: text("unit").notNull().default("inches"),
  frontImageUrl: text("front_image_url"),
  frontImageKey: text("front_image_key"),
  sideImageUrl: text("side_image_url"),
  sideImageKey: text("side_image_key"),
  primaryMeasurements: jsonb("primary_measurements"),
  detailedMeasurements: jsonb("detailed_measurements"),
  totalPoints: integer("total_points"),
  confidenceScore: integer("confidence_score"),
  qualityScore: integer("quality_score"),
  processingProgress: integer("processing_progress").default(0),
  processingStep: integer("processing_step").default(0),
  processingTotalSteps: integer("processing_total_steps").default(5),
  processingError: text("processing_error"),
  completedAt: text("completed_at"),
  ...timestamps,
});

export const insertMobileUserMeasurementSchema = createInsertSchema(
  mobileUserMeasurements,
);

// Measurement Shares
export const mobileUserMeasurementShares = pgTable(
  "mobile_user_measurement_shares",
  {
    id: text("id").primaryKey(),
    measurementId: text("measurement_id")
      .notNull()
      .references(() => mobileUserMeasurements.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => mobileUsers.id, { onDelete: "cascade" }),
    businessId: text("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    customUserId: text("custom_user_id"),
    notes: text("notes"),
    status: text("status").notNull().default("active"),
    ...timestamps,
  },
);

export const insertMobileUserMeasurementShareSchema = createInsertSchema(
  mobileUserMeasurementShares,
);
