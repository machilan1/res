ALTER TABLE "renting" RENAME COLUMN "type_id" TO "house_type_id";--> statement-breakpoint
ALTER TABLE "type" RENAME COLUMN "type_id" TO "house_type_id";--> statement-breakpoint
ALTER TABLE "renting" DROP CONSTRAINT "renting_type_id_type_type_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting" ADD CONSTRAINT "renting_house_type_id_type_house_type_id_fk" FOREIGN KEY ("house_type_id") REFERENCES "type"("house_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
