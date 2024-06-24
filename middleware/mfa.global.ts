import { useToast } from '@/components/ui/toast/use-toast';

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.server) return;

	const config = useRuntimeConfig().public.supabase;
	const { callback } = config.redirectOptions;
	const mfaRoute = '/verify';

	// Check if the route is excluded from further processing
	const isExcluded = [callback, mfaRoute].some((path) => {
		const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`);
		return regex.test(to.path);
	});

	// If the route is excluded or does not start with '/app', do nothing
	if (isExcluded || !to.path.startsWith('/app')) {
		return;
	}

	const user = useSupabaseUser();

	// Wait for the user to be available on the client side
	if (import.meta.client && !user.value) {
		await new Promise((resolve) => {
			const unwatch = watch(user, (value) => {
				if (value) {
					unwatch();
					resolve();
				}
			});
		});
	}

	if (user.value) {
		const hasMfaFactors = (user.value.factors?.length ?? 0) > 0;

		if (hasMfaFactors) {
			const supabase = useSupabaseClient();

			const { data, error } =
				await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

			// Show an error toast if there is an error fetching the assurance level
			if (error) {
				const { toast } = useToast();
				toast({
					title: `Error: ${error.code || ''}`,
					description: error.message || 'An unknown error occurred.',
					variant: 'destructive',
				});
				return;
			}

			// Redirect to MFA route if required
			if (data && data.currentLevel !== 'aal2' && data.nextLevel === 'aal2') {
				return navigateTo(mfaRoute);
			}
		}
	}
});
