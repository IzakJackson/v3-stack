<template>
	<div class="flex items-center justify-center space-x-2">
		<CodeBracketIcon class="h-10 w-10 text-primary" />
		<h1
			v-if="!icon"
			class="text-2xl font-semibold">
			V3 Stack
		</h1>
	</div>
</template>

<script setup lang="ts">
import { CodeBracketIcon } from '@heroicons/vue/24/outline';

defineProps({
	icon: {
		type: Boolean,
		default: false,
	},
});
</script>
