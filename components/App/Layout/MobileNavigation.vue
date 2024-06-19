<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button
				size="icon"
				variant="outline"
				class="sm:hidden">
				<Bars3Icon class="h-5 w-5" />
				<span class="sr-only">Toggle Menu</span>
			</Button>
		</SheetTrigger>
		<SheetContent
			side="left"
			class="sm:max-w-xs">
			<nav class="grid gap-6 text-left text-lg">
				<SheetTrigger as-child>
					<NuxtLink
						to="/app"
						class="hover:opacity-90">
						<BrandLogo />
					</NuxtLink>
				</SheetTrigger>
				<SheetTrigger as-child>
					<NuxtLink
						to="/app"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
						<HomeIcon class="h-5 w-5" />
						Dashboard
					</NuxtLink>
				</SheetTrigger>
				<!-- <SheetTrigger as-child>
					<NuxtLink
						to="#"
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
						<Cog6ToothIcon class="w-5 h-5" />
						Settings
					</NuxtLink>
				</SheetTrigger> -->
			</nav>
		</SheetContent>
	</Sheet>
</template>

<script setup lang="ts">
import { Bars3Icon, Cog6ToothIcon, HomeIcon } from '@heroicons/vue/24/outline';
</script>
