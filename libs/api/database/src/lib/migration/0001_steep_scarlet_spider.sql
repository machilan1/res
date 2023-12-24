ALTER TABLE "app_user" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "student" DROP COLUMN IF EXISTS "role";