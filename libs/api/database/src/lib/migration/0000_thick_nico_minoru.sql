DO $$ BEGIN
 CREATE TYPE "action" AS ENUM('apply', 'dismiss');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('student', 'landlord', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"user_id" integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "campus" (
	"campus_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facility" (
	"facility_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"is_tag" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"favorite_id" bigserial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"case_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feature" (
	"feature_id" bigserial PRIMARY KEY NOT NULL,
	"case_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "landlord" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"banned" boolean DEFAULT false NOT NULL,
	"contact_time" jsonb DEFAULT '{"start":9,"end":21}'::jsonb,
	CONSTRAINT "landlord_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "renting" (
	"renting_id" bigserial PRIMARY KEY NOT NULL,
	"type_id" integer NOT NULL,
	"landlord_id" integer,
	"campus_id" integer,
	"address" text NOT NULL,
	"price" integer NOT NULL,
	"title" text NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"square" integer NOT NULL,
	"floor" integer NOT NULL,
	"total_floor" integer NOT NULL,
	"is_rented" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "renting_facility" (
	"renting_facility_id" bigserial PRIMARY KEY NOT NULL,
	"dacility_id" integer NOT NULL,
	"renting_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "renting_record" (
	"renting_record_id" bigserial PRIMARY KEY NOT NULL,
	"renting_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"action" "action" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rule" (
	"rule_id" bigserial PRIMARY KEY NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"student_number" text NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "student_student_number_unique" UNIQUE("student_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "type" (
	"type_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app_user" (
	"user_id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" "role" NOT NULL,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin" ADD CONSTRAINT "admin_user_id_app_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_student_id_app_user_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_case_id_renting_renting_id_fk" FOREIGN KEY ("case_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feature" ADD CONSTRAINT "feature_case_id_renting_renting_id_fk" FOREIGN KEY ("case_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "landlord" ADD CONSTRAINT "landlord_user_id_app_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting" ADD CONSTRAINT "renting_type_id_type_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "type"("type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting" ADD CONSTRAINT "renting_landlord_id_landlord_user_id_fk" FOREIGN KEY ("landlord_id") REFERENCES "landlord"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting" ADD CONSTRAINT "renting_campus_id_campus_campus_id_fk" FOREIGN KEY ("campus_id") REFERENCES "campus"("campus_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting_facility" ADD CONSTRAINT "renting_facility_dacility_id_facility_facility_id_fk" FOREIGN KEY ("dacility_id") REFERENCES "facility"("facility_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting_facility" ADD CONSTRAINT "renting_facility_renting_id_renting_renting_id_fk" FOREIGN KEY ("renting_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting_record" ADD CONSTRAINT "renting_record_renting_id_renting_renting_id_fk" FOREIGN KEY ("renting_id") REFERENCES "renting"("renting_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "renting_record" ADD CONSTRAINT "renting_record_student_id_student_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "student"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student" ADD CONSTRAINT "student_user_id_app_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "app_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
