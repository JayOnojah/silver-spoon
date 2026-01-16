CREATE TYPE "public"."business_type" AS ENUM('tailor', 'cobler', 'others');--> statement-breakpoint
CREATE TYPE "public"."platform_role" AS ENUM('user', 'owner');--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"phone" text NOT NULL,
	"phone_verified" timestamp,
	"password" text NOT NULL,
	"avatar" text,
	"role" "platform_role" DEFAULT 'owner' NOT NULL,
	"default_business_id" text,
	"default_business_type" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
