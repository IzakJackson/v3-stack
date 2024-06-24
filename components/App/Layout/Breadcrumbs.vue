<template>
	<Breadcrumb class="hidden md:block">
		<BreadcrumbList>
			<BreadcrumbItem
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="breadcrumb.path">
				<NuxtLink
					v-if="index !== breadcrumbs.length - 1"
					:to="breadcrumb.path"
					class="flex items-center gap-1.5 transition-colors hover:text-foreground">
					{{ breadcrumb.name }} <ChevronRightIcon class="ml-0.5 h-3.5 w-3.5" />
				</NuxtLink>
				<BreadcrumbPage v-else>
					{{ breadcrumb.name }}
				</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';

// Get the current route
const route = useRoute();

// Build breadcrumb items based on the current route
const breadcrumbs = computed(() => {
	const pathArray = route.path
		.split('/')
		.filter((path) => path && path !== 'app');
	return [
		{ name: 'Dashboard', path: '/app' },
		...pathArray.map((path, index) => {
			const fullPath = `/app/${pathArray.slice(0, index + 1).join('/')}`;
			return {
				name: path.charAt(0).toUpperCase() + path.slice(1),
				path: fullPath,
			};
		}),
	];
});
</script>
