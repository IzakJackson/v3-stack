import { router } from '../trpc';
import { testRouter } from './test';

// Define and export the application router
export const appRouter = router({
	test: testRouter,
});

export type AppRouter = typeof appRouter;
