import {
  text,
  boolean,
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

import {
  businessTypeEnum,
  subscriptionPlanEnum,
  subscriptionStatusEnum,
} from "../enums";

import { users } from "./users";
import { timestamps } from "../utils";
import { createInsertSchema } from "drizzle-zod";

export const businesses = pgTable("businesses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  businessType: businessTypeEnum("business_type").notNull().default("tailor"),
  handle: text("handle").unique(),
  description: text("description"),
  logo: text("logo"),
  logoKey: text("logo_key"),
  bannerImage: text("banner_image"),
  bannerImageKey: text("banner_image_key"),
  address: text("address"),
  phone: text("phone"),
  email: text("email").unique(),
  xUrl: text("x_url"),
  instagramUrl: text("instagram_url"),
  facebookUrl: text("facebook_url"),
  websiteUrl: text("website_url"),
  accountName: text("account_name"),
  accountNumber: text("account_number"),
  bankName: text("bank_name"),
  bankCode: text("bank_code"),
  walletBalance: integer("wallet_balance"),
  firstCatalogueSetup: boolean("first_catalogue_setup")
    .notNull()
    .default(false),
  firstWebSetup: boolean("first_web_setup").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  isVerified: boolean("is_verified").notNull().default(false),
  isSubscribed: boolean("is_subscribed").notNull().default(false),
  walletBalanceCurrency: text("wallet_balance_currency").default("NGN"),
  subscriptionStartDate: timestamp("subscription_start_date", { mode: "date" }),
  subscriptionEndDate: timestamp("subscription_end_date", { mode: "date" }),
  subscriptionPlan: subscriptionPlanEnum("subscription_plan")
    .notNull()
    .default("basic"),
  subscriptionStatus: subscriptionStatusEnum("subscription_status")
    .notNull()
    .default("inactive"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const insertBusinessSchema = createInsertSchema(businesses);
