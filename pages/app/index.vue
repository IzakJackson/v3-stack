<template>
	<AppLayoutContainer>
		<div>
			<Button v-if="hello.data.value">
				{{ hello.data?.value.greeting }}
			</Button>
		</div>
	</AppLayoutContainer>
</template>

<script setup lang="ts">
const { $client } = useNuxtApp();
const { test } = $client;

const hello = await test.hello.useQuery({ text: 'client' });
</script>
