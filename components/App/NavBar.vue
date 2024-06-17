<template>
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NuxtLink to="/app">
					<NavigationMenuLink :class="navigationMenuTriggerStyle()">
						<span
							:class="[
								'sm:hidden',
								route.path === '/app' ? 'text-primary' : '',
							]">
							<HomeIcon class="w-6 h-6" />
						</span>
						<span
							:class="[
								'hidden sm:block',
								route.path === '/app' ? 'text-primary' : '',
							]">
							Dashboard
						</span>
					</NavigationMenuLink>
				</NuxtLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
</template>

<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { HomeIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
</script>
