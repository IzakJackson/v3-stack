<template>
	<div class="flex-1">
		<nav class="grid items-start gap-2 text-sm font-bold">
			<NuxtLink
				to="/app/account"
				:class="[
					'flex items-center gap-3 rounded-lg px-3.5 py-2 transition-all',
					route.path === '/app/account'
						? 'bg-primary text-black'
						: 'bg-muted text-muted-foreground hover:bg-secondary hover:text-primary',
				]">
				Profile
			</NuxtLink>
		</nav>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
