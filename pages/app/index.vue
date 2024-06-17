<template>
	<div>
		<AppPageHeader heading="Dashboard" />
		<div
			class="px-4 py-6 mx-auto max-w-screen-2xl sm:px-6 sm:py-8 lg:px-8 lg:py-12">
			<Button
				v-if="hello.data.value"
				class="mt-4">
				{{ hello.data?.value.greeting }}
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();
const { test } = $client;

const hello = await test.hello.useQuery({ text: 'client' });
</script>
.
