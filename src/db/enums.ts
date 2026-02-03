import { pgEnum } from "drizzle-orm/pg-core";

export const userPlatformRoleEnum = pgEnum("platform_role", ["user", "owner"]);

export const orderSourceEnum = pgEnum("order_source", ["system", "online"]);

export const orderTypeEnum = pgEnum("order_type", ["delivery", "pick_up"]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "withdrawal",
  "payment",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "card",
  "cash",
  "transfer",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "not_paid",
  "paid_in_full",
  "partial_payment",
]);

export const businessTypeEnum = pgEnum("business_type", [
  "tailor",
  "cobbler",
  "others",
]);

export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "basic",
  "starter",
  "enterprise",
  "custom",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "processing",
  "completed",
  "cancelled",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "inactive",
  "cancelled",
  "expired",
]);

export const businessUserRoleEnum = pgEnum("business_user_role", [
  "owner",
  "admin",
  "tailor",
  "cashier",
  "apprentice",
]);
