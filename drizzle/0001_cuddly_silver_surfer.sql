CREATE TYPE "public"."business_user_role" AS ENUM('owner', 'admin', 'tailor', 'cashier', 'apprentice');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'processing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."order_type" AS ENUM('delivery', 'pick_up');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('card', 'cash', 'transfer');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('basic', 'starter', 'enterprise', 'custom');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'inactive', 'cancelled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('withdrawal', 'payment');--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"business_type" "business_type" DEFAULT 'tailor' NOT NULL,
	"handle" text,
	"description" text,
	"logo" text,
	"logo_key" text,
	"banner_image" text,
	"banner_image_key" text,
	"address" text,
	"phone" text,
	"email" text,
	"x_url" text,
	"instagram_url" text,
	"facebook_url" text,
	"website_url" text,
	"account_name" text,
	"account_number" text,
	"bank_name" text,
	"bank_code" text,
	"wallet_balance" integer,
	"first_catalogue_setup" boolean DEFAULT false NOT NULL,
	"first_web_setup" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_subscribed" boolean DEFAULT false NOT NULL,
	"wallet_balance_currency" text DEFAULT 'NGN',
	"subscription_start_date" timestamp,
	"subscription_end_date" timestamp,
	"subscription_plan" "subscription_plan" DEFAULT 'basic' NOT NULL,
	"subscription_status" "subscription_status" DEFAULT 'inactive' NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "businesses_handle_unique" UNIQUE("handle"),
	CONSTRAINT "businesses_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "businesses" ALTER COLUMN "business_type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "businesses" ALTER COLUMN "business_type" SET DEFAULT 'tailor'::text;--> statement-breakpoint
DROP TYPE "public"."business_type";--> statement-breakpoint
CREATE TYPE "public"."business_type" AS ENUM('tailor', 'cobbler', 'others');--> statement-breakpoint
ALTER TABLE "businesses" ALTER COLUMN "business_type" SET DEFAULT 'tailor'::"public"."business_type";--> statement-breakpoint
ALTER TABLE "businesses" ALTER COLUMN "business_type" SET DATA TYPE "public"."business_type" USING "business_type"::"public"."business_type";--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;