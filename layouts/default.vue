<template>
	<div class="relative">
		<div class="relative flex min-h-screen w-full flex-col bg-muted/40">
			<AppLayoutDesktopNavigation />

			<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<AppLayoutHeader />
				<slot />
			</div>
		</div>
		<div
			class="fixed bottom-3 left-3 scale-125 rounded-lg border-2 bg-background">
			<AppLayoutScrollToTopButton />
		</div>
	</div>
</template>
