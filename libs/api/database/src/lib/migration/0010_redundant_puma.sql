ALTER TABLE "type" RENAME TO "house_type";--> statement-breakpoint
ALTER TABLE "renting" DROP CONSTRAINT "renting_house_type_id_type_house_type_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting" ADD CONSTRAINT "renting_house_type_id_house_type_house_type_id_fk" FOREIGN KEY ("house_type_id") REFERENCES "house_type"("house_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
