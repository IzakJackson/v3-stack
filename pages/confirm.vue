<template>
	<Card class="text-center">
		<CardHeader>
			<CardTitle>Verifying</CardTitle>
			<CardDescription class="mt-2 text-center">
				<LoadingIcon
					v-if="!isSuccess"
					class="mx-auto h-8 w-8"
					fill="rgb(34, 197, 94)" />
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

const isSuccess = ref(false);

watch(
	user,
	() => {
		if (user.value) {
			isSuccess.value = true;
			return navigateTo('/app');
		}
		return navigateTo('/');
	},
	{ immediate: true },
);
</script>
