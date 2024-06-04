<template>
	<div>
		<h1
			class="scroll-m-20 text-4xl font-extrabold capitalize tracking-tight lg:text-5xl">
			Hello world
		</h1>
		<Button
			v-if="hello.data.value"
			class="mt-4">
			{{ hello.data?.value.greeting }}
		</Button>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'marketing',
});

const { $client } = useNuxtApp();

const hello = await $client.hello.useQuery({ text: 'client' });
</script>
