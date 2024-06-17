<template>
	<div class="flex-1">
		<nav class="grid items-start gap-2 text-sm font-bold">
			<NuxtLink
				v-for="link in selectedLinks"
				:key="link.to"
				:to="link.to"
				:class="[
					'flex items-center gap-3 rounded-lg px-3.5 py-2 transition-all',
					route.path === link.to
						? 'bg-primary text-black'
						: 'bg-muted text-muted-foreground hover:bg-secondary hover:text-primary',
				]">
				{{ link.label }}
			</NuxtLink>
		</nav>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	section: {
		type: String,
		required: true,
	},
});

const route = useRoute();

const accountLinks = [
	{
		to: '/app/account',
		label: 'Profile',
	},
	{
		to: '/app/account/security',
		label: 'Security',
	},
];

const selectedLinks = computed(() => {
	switch (props.section) {
		case 'account':
			return accountLinks;
		default:
			return [];
	}
});
</script>
