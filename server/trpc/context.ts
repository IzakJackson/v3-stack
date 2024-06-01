import type { inferAsyncReturnType } from '@trpc/server';

// Create and export an empty context function for tRPC
export const createContext = () => ({});

// Infer and export the type of the context from the createContext function
export type Context = inferAsyncReturnType<typeof createContext>;
