<template>
	<div
		class="fixed top-0 left-0 right-0 z-10 bg-white border-b border-secondary dark:bg-black">
		<div class="px-4 py-2 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
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
