<template>
	<Card class="text-center">
		<CardHeader>
			<CardTitle>Sign Up</CardTitle>
			<CardDescription class="mt-2">
				Enter your email below to sign up,
				<br />
				or
				<NuxtLink
					to="/signin"
					class="underline hover:text-primary">
					sign in
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
