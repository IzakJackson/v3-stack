<template>
	<div>
		<div class="flex items-center justify-between p-4">
			<NuxtLink
				to="/"
				class="hover:opacity-90">
				<BrandLogo />
			</NuxtLink>
			<div class="flex items-center space-x-2">
				<ColorModeToggle />
				<Button
					v-if="!user"
					variant="outline"
					as-child>
					<NuxtLink to="/signin">Sign In</NuxtLink>
				</Button>
				<Button
					v-if="!user"
					as-child>
					<NuxtLink to="/signup">Sign Up</NuxtLink>
				</Button>
				<Button
					v-if="user"
					as-child>
					<NuxtLink to="/app">Open App</NuxtLink>
				</Button>
			</div>
		</div>
		<div class="container space-y-16 py-16">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
</script>
