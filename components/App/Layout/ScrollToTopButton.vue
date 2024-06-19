<template>
	<TooltipProvider v-if="showTooltip">
		<Tooltip>
			<TooltipTrigger as-child>
				<Button
					size="icon"
					class="flex h-9 w-9 items-center justify-center md:h-8 md:w-8"
					@click="scrollToTop">
					<ArrowUpCircleIcon class="h-5 w-5" />
					<span class="sr-only">Scroll To Top</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent side="right"> Scroll To Top </TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>

<script setup lang="ts">
import { ArrowUpCircleIcon } from '@heroicons/vue/24/outline';

const showTooltip = ref(false);

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

const handleScroll = () => {
	showTooltip.value = window.scrollY > 100;
};

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>
