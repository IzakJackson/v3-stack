import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

// Define and export the 'users' table schema
export const users = pgTable('users', {
	id: serial('id').primaryKey(), // Define an auto-incrementing 'id' column as the primary key
	fullName: text('full_name'), // Define a 'full_name' column with text type
	phone: varchar('phone', { length: 256 }), // Define a 'phone' column with varchar type and a maximum length of 256
});
