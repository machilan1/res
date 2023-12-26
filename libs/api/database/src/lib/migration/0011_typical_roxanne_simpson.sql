ALTER TABLE "favorite" RENAME COLUMN "case_id" TO "renting_id";--> statement-breakpoint
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_case_id_renting_renting_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_renting_id_renting_renting_id_fk" FOREIGN KEY ("renting_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
