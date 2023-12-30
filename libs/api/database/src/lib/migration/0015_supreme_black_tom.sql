ALTER TABLE "landlord"
ADD COLUMN "contact_time_start" integer DEFAULT 9 NOT NULL;
--> statement-breakpoint
ALTER TABLE "landlord"
ADD COLUMN "contact_time_end" integer DEFAULT 21 NOT NULL;
--> statement-breakpoint
ALTER TABLE "landlord" DROP COLUMN IF EXISTS "contact_time";
ALTER TABLE "landlord" -- This line is manually added
ADD CONSTRAINT "landlord_contact_time_check" CHECK (
        "contact_time_start" >= 0
        AND "contact_time_end" < 24
        AND "contact_time_start" <= "contact_time_end"
    );