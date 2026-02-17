CREATE TYPE "public"."measurement_status" AS ENUM('processing', 'completed', 'failed');--> statement-breakpoint
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
ALTER TABLE "mobile_user_measurement_shares" ADD CONSTRAINT "mobile_user_measurement_shares_measurement_id_mobile_user_measurements_id_fk" FOREIGN KEY ("measurement_id") REFERENCES "public"."mobile_user_measurements"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurement_shares" ADD CONSTRAINT "mobile_user_measurement_shares_user_id_mobile_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mobile_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurement_shares" ADD CONSTRAINT "mobile_user_measurement_shares_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mobile_user_measurements" ADD CONSTRAINT "mobile_user_measurements_user_id_mobile_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."mobile_users"("id") ON DELETE cascade ON UPDATE no action;