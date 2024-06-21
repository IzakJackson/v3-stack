<template>
	<Card>
		<CardHeader>
			<CardTitle>Multi-Factor Authentication</CardTitle>
			<CardDescription>
				<span v-if="factors.length < 1 && !loading">
					Add multi-factor authentication to your account to protect your
					account from unauthorized access.
				</span>
				<span v-if="factors.length >= 1 && !loading">
					Disable multi-factor authentication to remove the security layer from
					your account.
				</span>
				<span v-if="!factors && loading">
					Loading your multi-factor authentication settings. <LoadingIcon />
				</span>
			</CardDescription>
		</CardHeader>

		<AppAccountSecurityMFAEnrollment
			v-if="factors.length < 1 && !loading"
			@success="fetchFactors" />
		<AppAccountSecurityMFAUnenrollment
			v-if="factors.length >= 1 && !loading"
			:factors="factors"
			@success="fetchFactors" />
	</Card>
</template>

<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();

const loading = ref(true);
const factors = ref([]); // holds the list of factors

const supabase = useSupabaseClient();

const fetchFactors = async () => {
	try {
		const { data, error } = await supabase.auth.mfa.listFactors();

		if (error) throw error;

		factors.value = data.totp || [];
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message,
			variant: 'destructive',
		});
	} finally {
		loading.value = false;
	}
};

onMounted(async () => {
	await fetchFactors();
});
</script>
