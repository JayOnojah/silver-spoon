CREATE TYPE "public"."business_type" AS ENUM('tailor', 'cobbler', 'others');--> statement-breakpoint
CREATE TYPE "public"."business_user_role" AS ENUM('owner', 'admin', 'tailor', 'cashier', 'apprentice');--> statement-breakpoint
CREATE TYPE "public"."measurement_status" AS ENUM('processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."mobile_user_provider" AS ENUM('google', 'apple');--> statement-breakpoint
CREATE TYPE "public"."order_source" AS ENUM('system', 'online');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'processing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."order_type" AS ENUM('delivery', 'pick_up');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('card', 'cash', 'transfer');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('not_paid', 'paid_in_full', 'partial_payment');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('basic', 'starter', 'enterprise', 'custom');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'inactive', 'cancelled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('withdrawal', 'payment');--> statement-breakpoint
CREATE TYPE "public"."platform_role" AS ENUM('user', 'owner');--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"phone" text,
	"phone_verified" timestamp,
	"password" text,
	"avatar" text,
	"role" "platform_role" DEFAULT 'owner' NOT NULL,
	"default_business_id" text,
	"default_business_type" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "email_verification_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "email_verification_tokens_email_unique" UNIQUE("email"),
	CONSTRAINT "email_verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "password_reset_tokens_email_unique" UNIQUE("email"),
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "phone_verification_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "phone_verification_tokens_email_unique" UNIQUE("email"),
	CONSTRAINT "phone_verification_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"quantity" integer,
	"unit_price" integer NOT NULL,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"customer_id" text NOT NULL,
	"customer_first_name" text NOT NULL,
	"customer_last_name" text NOT NULL,
	"customer_address" text,
	"customer_city" text,
	"customer_postal_code" text,
	"customer_country" text,
	"customer_landmark" text,
	"customer_email" text,
	"customer_phone" text,
	"subtotal" integer NOT NULL,
	"tax_amount" integer,
	"amount" integer NOT NULL,
	"order_status" "order_status" NOT NULL,
	"order_source" "order_source" NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"user_id" text,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "website_blocks" (
	"id" text PRIMARY KEY NOT NULL,
	"block_title" text NOT NULL,
	"block_description" text NOT NULL,
	"block_banner" text,
	"block_banner_key" text,
	"image_one" text,
	"image_one_key" text,
	"image_two" text,
	"image_two_key" text,
	"image_three" text,
	"image_three_key" text,
	"image_four" text,
	"image_four_key" text,
	"website_id" text NOT NULL,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "websites" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"title" text,
	"hero_image" text,
	"hero_image_key" text,
	"hero_title" text,
	"hero_content" text,
	"custom_color" text,
	"custom_font" text,
	"favicon" text,
	"favicon_key" text,
	"description" text,
	"keywords" text,
	"domain" text,
	"published" boolean DEFAULT false NOT NULL,
	"website_template" text,
	"button_primary_color" text DEFAULT '406CF4',
	"button_primary_text_color" text DEFAULT 'FFFFFF',
	"button_secondary_color" text DEFAULT 'ECF0FE',
	"button_secondary_text_color" text DEFAULT '406CF4',
	"user_id" text,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "websites_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"postal_code" text,
	"landmark" text,
	"user_id" text,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
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
CREATE TABLE "catalogue_design_images" (
	"id" text PRIMARY KEY NOT NULL,
	"catalogue_design_id" text NOT NULL,
	"image_url" text NOT NULL,
	"image_key" text NOT NULL,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "catalogue_designs" (
	"id" text PRIMARY KEY NOT NULL,
	"catalogue_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "catalogues" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" text,
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "business_users" (
	"user_id" text NOT NULL,
	"business_id" text NOT NULL,
	"role" "business_user_role" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "business_users_user_id_business_id_pk" PRIMARY KEY("user_id","business_id")
);
--> statement-breakpoint
CREATE TABLE "mobile_users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"provider" "mobile_user_provider" NOT NULL,
	"provider_id" text NOT NULL,
	"avatar" text,
	"gender" text,
	"height" text,
	"waist" text,
	"unit" text DEFAULT 'inches',
	"language" text DEFAULT 'en-US',
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "mobile_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "mobile_user_refresh_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"refresh_token" text NOT NULL,
	"device_info" text,
	"revoked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mobile_user_measurement_shares" (
	"id" text PRIMARY KEY NOT NULL,
	"measurement_id" text NOT NULL,
	"user_id" text NOT NULL,
	"business_id" text NOT NULL,
	"custom_user_id" text,
	"notes" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mobile_user_measurements" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"status" "measurement_status" DEFAULT 'processing' NOT NULL,
	"height" real NOT NULL,
	"waist" real,
	"unit" text DEFAULT 'inches' NOT NULL,
	"front_image_url" text,
	"front_image_key" text,
	"side_image_url" text,
	"side_image_key" text,
	"primary_measurements" jsonb,
	"detailed_measurements" jsonb,
	"total_points" integer,
	"confidence_score" integer,
	"quality_score" integer,
	"processing_progress" integer DEFAULT 0,
	"processing_step" integer DEFAULT 0,
	"processing_total_steps" integer DEFAULT 5,
	"processing_error" text,
	"completed_at" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phone_verification_tokens" ADD CONSTRAINT "phone_verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_blocks" ADD CONSTRAINT "website_blocks_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_blocks" ADD CONSTRAINT "website_blocks_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_design_images" ADD CONSTRAINT "catalogue_design_images_catalogue_design_id_catalogue_designs_id_fk" FOREIGN KEY ("catalogue_design_id") REFERENCES "public"."catalogue_designs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_design_images" ADD CONSTRAINT "catalogue_design_images_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_designs" ADD CONSTRAINT "catalogue_designs_catalogue_id_catalogues_id_fk" FOREIGN KEY ("catalogue_id") REFERENCES "public"."catalogues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_designs" ADD CONSTRAINT "catalogue_designs_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogues" ADD CONSTRAINT "catalogues_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurement_shares" ADD CONSTRAINT "mobile_user_measurement_shares_measurement_id_mobile_user_measurements_id_fk" FOREIGN KEY ("measurement_id") REFERENCES "public"."mobile_user_measurements"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurement_shares" ADD CONSTRAINT "mobile_user_measurement_shares_user_id_mobile_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mobile_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurement_shares" ADD CONSTRAINT "mobile_user_measurement_shares_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurements" ADD CONSTRAINT "mobile_user_measurements_user_id_mobile_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mobile_users"("id") ON DELETE cascade ON UPDATE no action;