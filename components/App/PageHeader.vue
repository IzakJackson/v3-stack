<template>
	<section class="bg-primary">
		<div
			class="px-4 py-6 mx-auto max-w-screen-2xl sm:px-6 sm:py-8 lg:px-8 lg:py-12">
			<p
				v-if="subheading"
				class="text-lg font-semibold leading-7 text-white opacity-80">
				{{ subheading }}
			</p>
			<h1
				class="text-4xl font-extrabold tracking-tight text-white scroll-m-20 lg:text-5xl">
				{{ heading }}
			</h1>
			<p
				v-if="lead"
				class="font-medium leading-7 text-white [&:not(:first-child)]:mt-2">
				{{ lead }}
			</p>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps({
	heading: {
		type: String,
		default: '',
	},
	subheading: {
		type: String,
		default: '',
	},
	lead: {
		type: String,
		default: '',
	},
});
</script>
