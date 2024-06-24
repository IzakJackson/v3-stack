import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';

export const useProfileStore = defineStore('profile', () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const loading = ref(true);
	const uploading = ref(false);
	const username = ref('');
	const website = ref('');
	const fullName = ref('');
	const bio = ref('');
	const avatar_path = ref('');
	const src = ref('');
	const charCount = ref(0);
	const { toast } = useToast();

	const fetchProfile = async () => {
		try {
			const { data, error } = await supabase
				.from('profiles')
				.select('username, website, full_name, bio, avatar_url')
				.eq('id', user.value.id)
				.single();

			if (error) throw error;

			if (data) {
				username.value = data.username;
				website.value = data.website;
				fullName.value = data.full_name;
				bio.value = data.bio;
				avatar_path.value = data.avatar_url;
				if (data.bio !== null) {
					charCount.value = data.bio.length;
				}
			}
		} catch (error) {
			toast({
				title: `Error: ${error.code || ''}`,
				description: error.message || 'An unknown error occurred.',
				variant: 'destructive',
			});
		} finally {
			loading.value = false;
		}
	};

	const downloadAvatar = async (path) => {
		if (!path) {
			return;
		}
		try {
			loading.value = true;
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(path);
			if (error) throw error;
			src.value = URL.createObjectURL(data);
		} catch (error) {
			toast({
				title: `Error: ${error.code || ''}`,
				description: error.message || 'An unknown error occurred.',
				variant: 'destructive',
			});
		} finally {
			loading.value = false;
		}
	};

	return {
		loading,
		uploading,
		username,
		website,
		fullName,
		bio,
		avatar_path,
		src,
		charCount,
		fetchProfile,
		downloadAvatar,
	};
});
