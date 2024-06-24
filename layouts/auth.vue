<template>
	<main class="relative">
		<div class="absolute right-4 top-4 z-10">
			<ColorModeToggle />
		</div>
		<div
			class="container relative flex min-h-screen items-center justify-center">
			<div class="w-full max-w-md space-y-8 text-center">
				<NuxtLink
					to="/"
					class="hover:opacity-90">
					<BrandLogo class="justify-center" />
				</NuxtLink>
				<div class="space-y-4">
					<slot />
					<p class="mx-auto max-w-sm text-sm text-muted-foreground">
						By clicking continue, you agree to our
						<NuxtLink
							to="#"
							class="text-primary hover:underline">
							Terms of Service
						</NuxtLink>
						and
						<NuxtLink
							to="#"
							class="text-primary hover:underline">
							Privacy Policy
						</NuxtLink>
					</p>
				</div>
			</div>
		</div>
		<Toaster />
	</main>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const route = useRoute();

watchEffect(() => {
	if (user.value && !route.path.startsWith('/mfa')) {
		return navigateTo('/app');
	}
});
</script>
