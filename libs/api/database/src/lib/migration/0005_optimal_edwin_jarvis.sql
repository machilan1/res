ALTER TABLE "feature" RENAME COLUMN "case_id" TO "renting_id";--> statement-breakpoint
ALTER TABLE "feature" DROP CONSTRAINT "feature_case_id_renting_renting_id_fk";
--> statement-breakpoint
ALTER TABLE "feature" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "renting" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rule" ADD COLUMN "renting_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feature" ADD CONSTRAINT "feature_renting_id_renting_renting_id_fk" FOREIGN KEY ("renting_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rule" ADD CONSTRAINT "rule_renting_id_renting_renting_id_fk" FOREIGN KEY ("renting_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
