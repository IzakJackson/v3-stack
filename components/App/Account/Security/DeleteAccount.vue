<template>
	<Card class="border-destructive">
		<CardHeader>
			<CardTitle>Delete Account</CardTitle>
			<CardDescription>
				Permanently delete your account and all associated data.
			</CardDescription>
		</CardHeader>

		<CardContent>
			<Dialog>
				<DialogTrigger class="ml-auto">
					<Button
						variant="destructive"
						type="button">
						Delete Account
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle
							>Are you sure you want to delete your account?</DialogTitle
						>
						<DialogDescription>
							This will delete your account and all associated data. This action
							is permanent and cannot be undone.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							class="ml-auto"
							variant="destructive"
							type="button"
							:disabled="submitting"
							@click="onDeleteAccountClicked">
							<LoadingIcon
								v-if="submitting"
								class="h-8 w-8" />
							<span v-else>Confirm Delete Account</span>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</CardContent>
	</Card>
</template>

<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';

const { $client } = useNuxtApp();
const { user } = $client;
const { toast } = useToast();
const submitting = ref(false);
const supauser = useSupabaseUser();
const supabase = useSupabaseClient();

const onDeleteAccountClicked = async () => {
	try {
		submitting.value = true;

		const userId = supauser.value.id;

		await supabase.auth.signOut();

		await user.deleteUser.mutate({ userId });

		toast({
			title: 'Success',
			description: 'Account successfully deleted.',
		});

		return navigateTo('/');
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message,
			variant: 'destructive',
		});
	} finally {
		submitting.value = false;
	}
};
</script>
