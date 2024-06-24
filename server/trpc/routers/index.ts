import { router } from '../trpc';
import { testRouter } from './test';
import { userRouter } from './user';

// Define and export the application router
export const appRouter = router({
	test: testRouter,
	user: userRouter,
});

export type AppRouter = typeof appRouter;
