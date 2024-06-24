<template>
	<Card class="text-center">
		<CardHeader>
			<CardTitle>Verification Required</CardTitle>
			<CardDescription class="mt-2 text-center">
				Enter the verification code from your authenticator app.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<FormField
				v-slot="{ componentField }"
				name="code">
				<FormItem v-auto-animate>
					<FormControl>
						<div class="flex items-center justify-center space-x-2">
							<PinInput
								id="pin-input"
								v-model="value"
								placeholder="○"
								@complete="handleComplete">
								<PinInputGroup class="mx-auto">
									<PinInputInput
										v-for="(id, index) in Array(6).keys()"
										:key="id"
										class="!bg-background !text-foreground"
										:index="index" />
								</PinInputGroup>
							</PinInput>
							<Button
								:disabled="submitting"
								@click="onSubmitClicked">
								<LoadingIcon
									v-if="submitting"
									class="h-8 w-8" />
								<span v-else>Verify</span>
							</Button>
						</div>
					</FormControl>
				</FormItem>
			</FormField>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

definePageMeta({
	layout: 'auth',
});

const value = ref<string[]>([]);
const verifyCode = ref('');
const submitting = ref(false);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

// Handle the complete event for verification code input
const handleComplete = (e: string[]) => {
	verifyCode.value = e.join('');
};

// Handle the submit button click event
const onSubmitClicked = async () => {
	try {
		submitting.value = true;

		// Challenge and verify the MFA code
		const { data, error } = await supabase.auth.mfa.challengeAndVerify({
			factorId: user.value.factors[0].id,
			code: verifyCode.value,
		});

		if (error) throw error;

		// Get the authenticator assurance level after verification
		const { data: aalData, error: aalError } =
			await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

		if (aalError) throw aalError;

		console.log(
			'MFA level after verification',
			aalData.currentLevel,
			aalData.nextLevel,
		);

		// Redirect to the app if the MFA level is 'aal2'
		if (aalData.currentLevel === 'aal2') {
			return navigateTo('/app');
		}
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message || 'An unknown error occurred.',
			variant: 'destructive',
		});
	} finally {
		submitting.value = false;
	}
};

// Check user authentication and MFA level on component mount
onMounted(async () => {
	if (!user.value) {
		return navigateTo('/signin');
	}

	const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

	if (data.currentLevel === 'aal2') {
		return navigateTo('/app');
	}
});
</script>
