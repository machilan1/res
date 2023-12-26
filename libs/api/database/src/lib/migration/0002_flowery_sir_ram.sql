ALTER TABLE "admin" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_email_unique" UNIQUE("email");