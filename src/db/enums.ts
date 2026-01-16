import { pgEnum } from "drizzle-orm/pg-core";

export const userPlatformRoleEnum = pgEnum("platform_role", ["user", "owner"]);

export const tenantTypeEnum = pgEnum("business_type", [
  "tailor",
  "cobler",
  "others",
]);
