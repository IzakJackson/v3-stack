<template>
	<div class="flex-1">
		<Collapsible
			v-model:open="isOpen"
			class="w-full space-y-2 lg:hidden">
			<CollapsibleTrigger as-child>
				<Button
					variant="outline"
					class="flex w-full items-center justify-between p-0 px-4">
					<h4 class="text-sm font-semibold">
						<span v-if="!isOpen">Expand </span
						><span v-if="isOpen">Collapse </span>Menu
					</h4>
					<ChevronUpDownIcon class="h-4 w-4" />
					<span class="sr-only">Toggle</span>
				</Button>
			</CollapsibleTrigger>
			<nav class="grid items-start gap-2 text-sm font-bold">
				<NuxtLink
					v-for="link in selectedLinks"
					:key="link.to"
					:to="link.to"
					:class="[
						'flex items-center gap-3 rounded-md px-4 py-2.5 transition-all',
						route.path === link.to ? 'bg-primary text-black' : 'hidden',
					]">
					{{ link.label }}
				</NuxtLink>
				<CollapsibleContent>
					<NuxtLink
						v-for="link in selectedLinks"
						:key="link.to"
						:to="link.to"
						:class="[
							'flex items-center gap-3 rounded-md px-4 py-2.5 transition-all',
							route.path === link.to
								? 'hidden bg-primary text-black'
								: 'bg-muted text-muted-foreground hover:bg-secondary hover:text-primary',
						]">
						{{ link.label }}
					</NuxtLink>
				</CollapsibleContent>
			</nav>
		</Collapsible>
		<nav class="hidden items-start gap-2 text-sm font-bold lg:grid">
			<NuxtLink
				v-for="link in selectedLinks"
				:key="link.to"
				:to="link.to"
				:class="[
					'flex items-center gap-3 rounded-md px-3.5 py-2 transition-all',
					route.path === link.to
						? 'bg-primary text-primary-foreground'
						: 'bg-secondary text-secondary-foreground hover:bg-muted hover:text-primary',
				]">
				{{ link.label }}
			</NuxtLink>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { ChevronUpDownIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
	section: {
		type: String,
		required: true,
	},
});

const route = useRoute();

const isOpen = ref(false);

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
