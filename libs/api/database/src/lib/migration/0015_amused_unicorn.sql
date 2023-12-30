ALTER TABLE "landlord"
    RENAME COLUMN "contact_time" TO "contact_time_start";
--> statement-breakpoint
ALTER TABLE "landlord"
ALTER COLUMN "contact_time_start"
SET DATA TYPE integer;
--> statement-breakpoint
ALTER TABLE "landlord"
ALTER COLUMN "contact_time_start"
SET DEFAULT 9;
--> statement-breakpoint
ALTER TABLE "landlord"
ALTER COLUMN "contact_time_start"
SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "landlord"
ADD COLUMN "contact_time_end" integer DEFAULT 21 NOT NULL;
ALTER TABLE "landlord" --> This line is manually added to the migration file
ADD CONSTRAINT "landlord_contact_time_end_check" CHECK (
        "contact_time_start" >= 0
        AND "contact_time_end" < 24
        AND "contact_time_start" <= "contact_time_end"
    );