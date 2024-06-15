<template>
	<Card class="text-center">
		<CardHeader v-if="!isMagicLinkSent">
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
