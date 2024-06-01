import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

// Define and export the application router
export const appRouter = router({
	// Define a public procedure called 'hello'
	hello: publicProcedure
		// Specify the input schema for the procedure using zod
		.input(
			z.object({
				text: z.string().nullish(), // Input can be a string or null/undefined
			}),
		)
		// Define the query resolver for the 'hello' procedure
		.query(({ input }) => {
			// Return a greeting message, defaulting to 'world' if input text is null/undefined
			return {
				greeting: `hello ${input?.text ?? 'world'}`,
			};
		}),
});

export type AppRouter = typeof appRouter;
