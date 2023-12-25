ALTER TABLE "renting"
ALTER COLUMN "landlord_id"
SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "renting"
ALTER COLUMN "campus_id"
SET NOT NULL;