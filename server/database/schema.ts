import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Define and export the table schema
export const profiles = pgTable('profiles', {
	id: uuid('id').primaryKey(),
	username: text('username').unique(),
	fullName: text('full_name'),
	website: text('website'),
	bio: text('bio'),
	updated_at: timestamp('updated_at').defaultNow(),
});
