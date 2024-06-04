<template>
	<main class="relative">
		<div class="absolute right-4 top-4">
			<ColorModeToggle />
		</div>
		<div
			class="container relative flex min-h-screen items-center justify-center">
			<div class="w-full max-w-md space-y-8 text-center">
				<NuxtLink
					to="/"
					class="hover:opacity-90">
					<BrandLogo />
				</NuxtLink>
				<div class="space-y-4">
					<slot />
					<p class="mx-auto max-w-sm text-sm text-muted-foreground">
						By clicking continue, you agree to our
						<NuxtLink
							to="#"
							class="underline hover:text-primary">
							Terms of Service
						</NuxtLink>
						and
						<NuxtLink
							to="#"
							class="underline hover:text-primary">
							Privacy Policy
						</NuxtLink>
					</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(() => {
	if (user.value) {
		return navigateTo('/app');
	}
});
</script>
