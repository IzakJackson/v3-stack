<template>
	<div>
		<div class="flex items-center justify-between p-4">
			<NuxtLink
				to="/app"
				class="hover:opacity-90">
				<BrandLogo />
			</NuxtLink>
			<div class="flex items-center space-x-2">
				<ColorModeToggle />
				<Button
					variant="ghost"
					@click="signOut()">
					Sign Out
				</Button>
			</div>
		</div>
		<div class="container space-y-16 py-16">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();
const supabase = useSupabaseClient();
const isLoading = ref(false);

async function signOut() {
	try {
		isLoading.value = true;
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		navigateTo('/');
	} catch (error) {
		const typedError = error as {
			error_message: string;
			error_description: string;
		};
		toast({
			title: typedError.error_message,
			description: typedError.error_description,
			variant: 'destructive',
		});
	} finally {
		isLoading.value = false;
	}
}

onBeforeMount(() => {
	const user = useSupabaseUser();
	if (user.value) {
		return navigateTo('/app');
	}
});
</script>
