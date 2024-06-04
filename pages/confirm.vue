<template>
	<Card class="text-center">
		<CardHeader>
			<CardTitle>Verifying</CardTitle>
			<CardDescription class="mt-2 text-center">
				<LoadingIcon
					v-if="!isSuccess"
					class="mx-auto h-8 w-8"
					fill="#06b6d4" />
				<span v-else> Redirecting... </span>
			</CardDescription>
		</CardHeader>
	</Card>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'auth',
});

const user = useSupabaseUser();
const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(`${cookieName}-redirect-path`).value;

const isSuccess = ref(false);

watch(
	user,
	() => {
		if (user.value) {
			isSuccess.value = true;
			useCookie(`${cookieName}-redirect-path`).value = null;
			return navigateTo(redirectPath || '/app');
		}
		return navigateTo('/');
	},
	{ immediate: true },
);
</script>
