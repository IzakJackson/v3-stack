<template>
	<Card class="text-center">
		<CardHeader>
			<CardTitle>Sign In</CardTitle>
			<CardDescription class="mt-2">
				Enter your email below to sign in,
				<br />
				or
				<NuxtLink
					to="/signup"
					class="underline hover:text-primary">
					sign up
				</NuxtLink>
			</CardDescription>
		</CardHeader>
		<AuthLogin />
	</Card>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'auth',
});
</script>
