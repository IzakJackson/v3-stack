<template>
	<aside
		class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
			<NuxtLink
				to="/app"
				class="-mt-1 hover:opacity-90">
				<BrandLogo :icon="true" />
			</NuxtLink>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger as-child>
						<NuxtLink
							to="/app"
							class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
							<HomeIcon class="h-5 w-5" />
							<span class="sr-only">Dashboard</span>
						</NuxtLink>
					</TooltipTrigger>
					<TooltipContent side="right"> Dashboard </TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
			<AppLayoutScrollToTopButton />
			<!-- <TooltipProvider>
				<Tooltip>
					<TooltipTrigger as-child>
						<NuxtLink
							href="#"
							class="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8">
							<Cog6ToothIcon class="w-5 h-5" />
							<span class="sr-only">Settings</span>
						</NuxtLink>
					</TooltipTrigger>
					<TooltipContent side="right"> Settings </TooltipContent>
				</Tooltip>
			</TooltipProvider> -->
		</nav>
	</aside>
</template>

<script setup lang="ts">
import { Cog6ToothIcon, HomeIcon } from '@heroicons/vue/24/outline';
</script>
