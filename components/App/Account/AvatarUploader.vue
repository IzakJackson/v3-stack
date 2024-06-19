<template>
	<div class="flex items-center space-x-2">
		<Popover>
			<PopoverTrigger>
				<Skeleton
					v-if="profileStore.loading"
					class="h-20 w-20" />
				<div
					v-if="path && !profileStore.loading"
					class="relative h-20 w-20 cursor-pointer overflow-hidden rounded-lg border-2 border-muted bg-background shadow hover:border-primary">
					<img
						:src="profileStore.src"
						alt="User Avatar"
						class="absolute inset-0 h-full w-full object-cover" />
				</div>
			</PopoverTrigger>
			<PopoverContent class="overflow-hidden">
				<img
					:src="profileStore.src"
					alt="User Avatar"
					class="h-full w-full rounded" />
			</PopoverContent>
		</Popover>
		<div class="relative">
			<label
				for="single"
				class="aspect-square group flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted bg-background hover:border-primary">
				<ArrowUpTrayIcon
					v-if="!profileStore.uploading"
					class="h-4 w-4 text-muted-foreground group-hover:text-primary" />
				<LoadingIcon
					v-else
					class="h-4 w-4 text-muted-foreground" />
				<span class="sr-only">Upload</span>
			</label>
			<input
				id="single"
				style="position: absolute; visibility: hidden"
				type="file"
				accept="image/*"
				:disabled="profileStore.uploading"
				@change="uploadAvatar" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ArrowUpTrayIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/components/ui/toast/use-toast';
import { useProfileStore } from '@/stores/profileStore';

const props = defineProps(['path']);
const { path } = toRefs(props);
const emit = defineEmits(['update:path', 'upload']);

// Supabase
const supabase = useSupabaseClient();

// UI State
const profileStore = useProfileStore();
const { toast } = useToast();

// Call downloadAvatar only if path is valid
if (path.value) {
	profileStore.downloadAvatar(path.value);
}

watch(path, () => {
	if (path.value) {
		profileStore.downloadAvatar(path.value);
	}
});

const uploadAvatar = async (evt) => {
	const files = evt.target.files;
	try {
		profileStore.uploading = true;

		if (!files || files.length === 0) {
			throw new Error('You must select an image to upload.');
		}

		const file = files[0];
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random()}.${fileExt}`;
		const filePath = `${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from('avatars')
			.upload(filePath, file);

		if (uploadError) throw uploadError;

		emit('update:path', filePath); // Emit the updated path
		emit('upload');
		profileStore.downloadImage(filePath);
	} catch (error) {
		toast({
			title: 'Error uploading image',
			description: error.message,
			variant: 'destructive',
		});
	} finally {
		profileStore.uploading = false;
	}
};
</script>
