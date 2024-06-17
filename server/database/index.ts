import 'dotenv/config';
import { env } from '~~/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { profiles } from './schema';

// Get the database connection string from the environment variables
const connectionString = env.SUPABASE_DATABASE_URL;

// Create a PostgreSQL client using the connection string
export const client = postgres(connectionString, { prepare: false });

// Initialize and export the drizzle ORM with the PostgreSQL client
export const db = drizzle(client);

// Export the table schema
const allProfiles = await db.select().from(profiles);
