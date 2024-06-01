import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client';
import type { AppRouter } from '~/server/trpc/routers';

export default defineNuxtPlugin(() => {
	// Create a tRPC Nuxt client with the specified router type
	const client = createTRPCNuxtClient<AppRouter>({
		// Configure the client to use HTTP batching for requests to the tRPC API
		links: [
			httpBatchLink({
				url: '/api/trpc',
			}),
		],
	});

	return {
		provide: {
			client,
		},
	};
});
