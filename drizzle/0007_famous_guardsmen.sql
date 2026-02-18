CREATE TYPE "public"."user_provider" AS ENUM('google');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "provider" "user_provider";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "provider_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_provider_id_unique" UNIQUE("provider_id");