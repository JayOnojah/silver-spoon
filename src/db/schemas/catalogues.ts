import { timestamps } from "../utils";
import { businesses } from "./businesses";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text } from "drizzle-orm/pg-core";

// Catalogues
export const catalogues = pgTable("catalogues", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id"),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertCatalogueSchema = createInsertSchema(catalogues);

// Catalogue Designs
export const catalogueDesigns = pgTable("catalogue_designs", {
  id: text("id").primaryKey(),
  catalogueId: text("catalogue_id")
    .notNull()
    .references(() => catalogues.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertCatalogueDesignSchema = createInsertSchema(catalogueDesigns);

// Catalogue Design Images
export const catalogueDesignImages = pgTable("catalogue_design_images", {
  id: text("id").primaryKey(),
  catalogueDesignId: text("catalogue_design_id")
    .notNull()
    .references(() => catalogueDesigns.id),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertCatalogueDesignImagesSchema = createInsertSchema(
  catalogueDesignImages,
);
