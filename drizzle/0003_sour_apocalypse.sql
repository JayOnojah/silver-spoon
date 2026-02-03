CREATE TYPE "public"."order_source" AS ENUM('system', 'online');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('not_paid', 'paid_in_full', 'partial_payment');--> statement-breakpoint
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
	"name" text NOT NULL,
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
	"business_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
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
	"name" text NOT NULL,
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
ALTER TABLE "verification_tokens" RENAME TO "email_verification_tokens";--> statement-breakpoint
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "verification_tokens_email_unique";--> statement-breakpoint
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "verification_tokens_token_unique";--> statement-breakpoint
ALTER TABLE "email_verification_tokens" DROP CONSTRAINT "verification_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "phone_verification_tokens" ADD CONSTRAINT "phone_verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_design_images" ADD CONSTRAINT "catalogue_design_images_catalogue_design_id_catalogue_designs_id_fk" FOREIGN KEY ("catalogue_design_id") REFERENCES "public"."catalogue_designs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_design_images" ADD CONSTRAINT "catalogue_design_images_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_designs" ADD CONSTRAINT "catalogue_designs_catalogue_id_catalogues_id_fk" FOREIGN KEY ("catalogue_id") REFERENCES "public"."catalogues"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_designs" ADD CONSTRAINT "catalogue_designs_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogues" ADD CONSTRAINT "catalogues_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_token_unique" UNIQUE("token");