CREATE TYPE "public"."mobile_user_provider" AS ENUM('google', 'apple');--> statement-breakpoint
ALTER TABLE "order_items" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "catalogue_designs" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "catalogue_designs" DROP CONSTRAINT "catalogue_designs_catalogue_id_catalogues_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "catalogue_designs" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalogue_designs" ADD CONSTRAINT "catalogue_designs_catalogue_id_catalogues_id_fk" FOREIGN KEY ("catalogue_id") REFERENCES "public"."catalogues"("id") ON DELETE cascade ON UPDATE no action;