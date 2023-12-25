ALTER TABLE "renting_facility" DROP CONSTRAINT "renting_facility_dacility_id_facility_facility_id_fk";
--> statement-breakpoint
ALTER TABLE "renting_facility" ADD COLUMN "facility_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting_facility" ADD CONSTRAINT "renting_facility_facility_id_facility_facility_id_fk" FOREIGN KEY ("facility_id") REFERENCES "facility"("facility_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "renting_facility" DROP COLUMN IF EXISTS "dacility_id";