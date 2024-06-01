import { createNuxtApiHandler } from 'trpc-nuxt';
import { appRouter } from '~/server/trpc/routers';
import { createContext } from '~/server/trpc/context';

// Export the Nuxt API handler configured with the router and context
export default createNuxtApiHandler({
	router: appRouter, // Application's router configuration
	createContext, // Function to create the context for TRPC
});
