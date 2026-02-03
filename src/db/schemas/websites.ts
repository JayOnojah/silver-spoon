import { timestamps } from "../utils";
import { businesses } from "./businesses";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, boolean } from "drizzle-orm/pg-core";

export const websites = pgTable("websites", {
  id: text("id").primaryKey(),
  name: text("name"),
  title: text("title"),
  heroImage: text("hero_image"),
  heroImageKey: text("hero_image_key"),
  heroTitle: text("hero_title"),
  heroContent: text("hero_content"),
  customColor: text("custom_color"),
  customFont: text("custom_font"),
  favicon: text("favicon"),
  faviconKey: text("favicon_key"),
  description: text("description"),
  keywords: text("keywords"),
  domain: text("domain").unique(),
  published: boolean("published").notNull().default(false),
  template: text("website_template").$type<
    "modern" | "classic" | "minimal" | "elegant"
  >(),
  buttonPrimaryColor: text("button_primary_color").default("406CF4"),
  buttonPrimaryTextColor: text("button_primary_text_color").default("FFFFFF"),
  buttonSecondaryColor: text("button_secondary_color").default("ECF0FE"),
  buttonSecondaryTextColor: text("button_secondary_text_color").default(
    "406CF4"
  ),
  userId: text("user_id"),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertWebsiteSchema = createInsertSchema(websites);

export const websiteBlocks = pgTable("website_blocks", {
  id: text("id").primaryKey(),
  blockTitle: text("block_title").notNull(),
  blockDescription: text("block_description").notNull(),
  blockBanner: text("block_banner"),
  blockBannerKey: text("block_banner_key"),
  imageOne: text("image_one"),
  imageOneKey: text("image_one_key"),
  imageTwo: text("image_two"),
  imageTwoKey: text("image_two_key"),
  imageThree: text("image_three"),
  imageThreeKey: text("image_three_key"),
  imageFour: text("image_four"),
  imageFourKey: text("image_four_key"),
  websiteId: text("website_id")
    .notNull()
    .references(() => websites.id, { onDelete: "cascade" }),
  businessId: text("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertWebsiteBlockSchema = createInsertSchema(websiteBlocks);
