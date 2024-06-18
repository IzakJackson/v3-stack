<template>
	<Avatar v-if="profileStore.src">
		<AvatarImage
			:src="profileStore.src"
			:alt="profileStore.username" />
	</Avatar>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profileStore';

// Use Profile Store
const profileStore = useProfileStore();
const user = useSupabaseUser();

// Fetch Profile on Mount
if (user.value) {
	await profileStore.fetchProfile();
}

// Call downloadImage only if path is valid
if (profileStore.avatar_path) {
	profileStore.downloadAvatar(profileStore.avatar_path);
}

watch(
	() => profileStore.avatar_path,
	(newPath) => {
		if (newPath) {
			profileStore.downloadAvatar(newPath);
		}
	},
);
</script>
