CREATE TABLE "business_users" (
	"user_id" text NOT NULL,
	"business_id" text NOT NULL,
	"role" "business_user_role" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "business_users_user_id_business_id_pk" PRIMARY KEY("user_id","business_id")
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
CREATE TABLE "verification_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"user_id" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "verification_tokens_email_unique" UNIQUE("email"),
	CONSTRAINT "verification_tokens_token_unique" UNIQUE("token")
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
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_blocks" ADD CONSTRAINT "website_blocks_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_blocks" ADD CONSTRAINT "website_blocks_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;