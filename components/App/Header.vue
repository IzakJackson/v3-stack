<template>
	<div class="fixed left-0 right-0 top-0 z-10 border-b border-secondary">
		<div class="mx-auto max-w-screen-2xl p-2">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<NuxtLink
						to="/app"
						class="hover:opacity-90">
						<BrandLogo :icon="true" />
					</NuxtLink>
					<AppNavBar class="hidden sm:block" />
				</div>
				<div class="flex items-center">
					<AppUserMenu />
				</div>
			</div>
		</div>
	</div>
</template>
