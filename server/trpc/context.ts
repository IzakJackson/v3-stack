// server/trpc/context.ts
import { inferAsyncReturnType } from '@trpc/server';
import { H3Event } from 'h3';

export async function createContext(event: H3Event) {
	return { event };
}

export type Context = inferAsyncReturnType<typeof createContext>;
