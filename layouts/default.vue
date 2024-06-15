<template>
	<div class="relative">
		<AppHeader />
		<div class="container relative space-y-16 py-16">
			<slot />
		</div>
		<AppMobileNavBar />
	</div>
</template>

<script setup lang="ts">
onBeforeMount(() => {
	const user = useSupabaseUser();
	if (user.value) {
		return navigateTo('/app');
	}
});
</script>
