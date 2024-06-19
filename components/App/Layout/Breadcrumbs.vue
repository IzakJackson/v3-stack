<template>
	<Breadcrumb class="hidden md:flex">
		<BreadcrumbList>
			<BreadcrumbItem
				v-for="(crumb, index) in breadcrumbs"
				:key="index">
				<BreadcrumbLink
					v-if="crumb.href"
					as-child>
					<a :href="crumb.href">{{ crumb.text }}</a>
				</BreadcrumbLink>
				<BreadcrumbPage v-else>{{ crumb.text }}</BreadcrumbPage>
				<BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

// Function to generate breadcrumbs
const generateBreadcrumbs = (route) => {
	const pathArray = route.path.split('/').filter((path) => path);
	const breadcrumbs = pathArray.map((path, index) => {
		const href = '/' + pathArray.slice(0, index + 1).join('/');
		let text = path.charAt(0).toUpperCase() + path.slice(1);

		// Special case for `/app` to be `Dashboard`
		if (path === 'app') {
			text = 'Dashboard';
		}

		return { text, href };
	});

	// Add a base breadcrumb if needed
	if (breadcrumbs.length && breadcrumbs[0].href !== '/app') {
		breadcrumbs.unshift({ text: 'Dashboard', href: '/app' });
	}

	// Last breadcrumb should not have a link
	if (breadcrumbs.length) {
		breadcrumbs[breadcrumbs.length - 1].href = null;
	}

	return breadcrumbs;
};

const breadcrumbs = generateBreadcrumbs(route);
</script>
