<template>
	<div class="relative ml-auto flex-1 md:grow-0">
		<MagnifyingGlassIcon
			class="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
		<Input
			type="search"
			placeholder="Search..."
			class="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[336px]" />
	</div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
</script>
