<template>
	<Card class="text-center">
		<CardHeader v-if="!isMagicLinkSent">
			<CardTitle>Sign Up</CardTitle>
			<CardDescription class="mt-2">
				Enter your email below to sign up,
				<br />
				or
				<NuxtLink
					to="/signin"
					class="text-primary hover:underline">
					sign in
				</NuxtLink>
			</CardDescription>
		</CardHeader>
		<AuthMagicLinkSent v-if="isMagicLinkSent" />
		<AuthLogin
			v-if="!isMagicLinkSent"
			@success="onSuccess()" />
	</Card>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'auth',
});

const isMagicLinkSent = ref(false);

const onSuccess = () => {
	isMagicLinkSent.value = true;
};
</script>
