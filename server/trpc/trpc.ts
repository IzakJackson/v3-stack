import { initTRPC } from '@trpc/server';
import type { Context } from '~/server/trpc/context';

// Initialize tRPC with the provided context type
const t = initTRPC.context<Context>().create();

// Export the tRPC utilities for defining procedures, routers, and middleware
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;
