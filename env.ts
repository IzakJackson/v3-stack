import { createEnv } from '@t3-oss/env-nuxt';
import { z } from 'zod';

// Create and export the env object using createEnv function
export const env = createEnv({
	// Define server-side environment variables with their validation schemas
	server: {
		SUPABASE_DATABASE_URL: z.string().url(),
		SUPABASE_SERVICE_KEY: z.string(),
		SUPABASE_URL: z.string().url(),
		SUPABASE_KEY: z.string(),
	},
	// Define client-side environment variables
	client: {},
});
