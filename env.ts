import { createEnv } from '@t3-oss/env-nuxt';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SUPABASE_DATABASE_URL: z.string().url(),
    SUPABASE_SERVICE_KEY: z.string(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_KEY: z.string(),
  },
  client: {},
});
