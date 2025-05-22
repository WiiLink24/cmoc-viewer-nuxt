import { pgTable, serial, varchar, integer, bigint, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations, sql } from "drizzle-orm"



export const artisans = pgTable("artisans", {
	artisanId: serial("artisan_id").notNull(),
	name: varchar(),
	countryId: integer("country_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	wiiNumber: bigint("wii_number", { mode: "number" }),
	macAddress: varchar("mac_address"),
	// TODO: failed to parse database type 'bytea'
	miiData: varchar("mii_data"),
	numberOfPosts: integer("number_of_posts").default(0).notNull(),
	totalLikes: integer("total_likes").default(0).notNull(),
	isMaster: boolean("is_master").default(false).notNull(),
	lastPost: timestamp("last_post", { mode: 'string' }).default('2000-01-01 01:00:00').notNull(),
});

export const contestMiis = pgTable("contest_miis", {
	contestId: integer("contest_id"),
	artisanId: integer("artisan_id"),
	countryId: integer("country_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	wiiNumber: bigint("wii_number", { mode: "number" }),
	macAddress: varchar("mac_address"),
	// TODO: failed to parse database type 'bytea'
	miiData: varchar("mii_data"),
	likes: integer(),
	rank: integer(),
	entryId: serial("entry_id").notNull(),
});

export const contestVotes = pgTable("contest_votes", {
	contestId: integer("contest_id"),
	vote1: integer("vote_1"),
	vote2: integer("vote_2"),
	vote3: integer("vote_3"),
	macAddress: varchar("mac_address"),
});

export const contests = pgTable("contests", {
	contestId: serial("contest_id").notNull(),
	hasSpecialAward: boolean("has_special_award"),
	hasThumbnail: boolean("has_thumbnail"),
	englishName: varchar("english_name"),
	status: varchar(),
	openTime: timestamp("open_time", { mode: 'string' }),
	closeTime: timestamp("close_time", { mode: 'string' }),
	hasSouvenir: boolean("has_souvenir"),
});

export const miis = pgTable("miis", {
	entryId: serial("entry_id").notNull(),
	artisanId: integer("artisan_id").references(() => artisans.artisanId),
	initials: varchar(),
	skill: integer(),
	nickname: varchar(),
	gender: integer(),
	countryId: integer("country_id"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	wiiNumber: bigint("wii_number", { mode: "number" }),
	// TODO: failed to parse database type 'bytea'
	miiData: varchar("mii_data"),
	// TODO: failed to parse database type 'bytea'
	miiId: varchar("mii_id"),
	likes: integer().default(0).notNull(),
	permLikes: integer("perm_likes").default(0).notNull(),
});

export const votes = pgTable("votes", {
	id: serial().notNull(),
	artisanId: integer("artisan_id"),
	votedMii: integer("voted_mii"),
});

export const miisRelations = relations(miis, ({ one }) => ({
	artisan: one(artisans, {
		fields: [miis.artisanId],
		references: [artisans.artisanId],
	}),
}))