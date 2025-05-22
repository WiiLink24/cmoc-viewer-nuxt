-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "artisans" (
	"artisan_id" serial NOT NULL,
	"name" varchar,
	"country_id" integer,
	"wii_number" bigint,
	"mac_address" varchar,
	"mii_data" "bytea",
	"number_of_posts" integer DEFAULT 0 NOT NULL,
	"total_likes" integer DEFAULT 0 NOT NULL,
	"is_master" boolean DEFAULT false NOT NULL,
	"last_post" timestamp DEFAULT '2000-01-01 01:00:00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contest_miis" (
	"contest_id" integer,
	"artisan_id" integer,
	"country_id" integer,
	"wii_number" bigint,
	"mac_address" varchar,
	"mii_data" "bytea",
	"likes" integer,
	"rank" integer,
	"entry_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contest_votes" (
	"contest_id" integer,
	"vote_1" integer,
	"vote_2" integer,
	"vote_3" integer,
	"mac_address" varchar
);
--> statement-breakpoint
CREATE TABLE "contests" (
	"contest_id" serial NOT NULL,
	"has_special_award" boolean,
	"has_thumbnail" boolean,
	"english_name" varchar,
	"status" varchar,
	"open_time" timestamp,
	"close_time" timestamp,
	"has_souvenir" boolean
);
--> statement-breakpoint
CREATE TABLE "miis" (
	"entry_id" serial NOT NULL,
	"artisan_id" integer,
	"initials" varchar,
	"skill" integer,
	"nickname" varchar,
	"gender" integer,
	"country_id" integer,
	"wii_number" bigint,
	"mii_data" "bytea",
	"mii_id" "bytea",
	"likes" integer DEFAULT 0 NOT NULL,
	"perm_likes" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" serial NOT NULL,
	"artisan_id" integer,
	"voted_mii" integer
);

*/