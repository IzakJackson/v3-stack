import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const testRouter = router({
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
