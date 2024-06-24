<template>
	<div v-auto-animate>
		<CardContent class="grid gap-6 md:grid-cols-3">
			<FormField
				v-slot="{ componentField }"
				name="qr">
				<FormItem v-auto-animate>
					<FormLabel>QR Code</FormLabel>
					<FormControl>
						<div>
							<Button
								v-if="!qr && !loading"
								type="button"
								@click="generateQRCode">
								Generate QR Code
							</Button>
						</div>
						<Card v-if="qr">
							<img
								class="h-full w-full"
								:src="qr"
								alt="QR code" />
						</Card>
						<Skeleton
							v-if="!qr && loading"
							class="h-10 w-full" />
					</FormControl>
					<FormDescription v-if="qr && !loading">
						Scan the QR code with your authenticator app.
					</FormDescription>
				</FormItem>
			</FormField>
			<div
				v-if="qr && !loading"
				class="md:col-span-3">
				<FormField
					v-slot="{ componentField }"
					name="code">
					<FormItem v-auto-animate>
						<FormLabel>Verification Code</FormLabel>
						<FormControl>
							<div>
								<PinInput
									id="pin-input"
									v-model="value"
									placeholder="○"
									@complete="handleComplete">
									<PinInputGroup>
										<PinInputInput
											v-for="(id, index) in Array(6).keys()"
											:key="id"
											class="!bg-background !text-foreground"
											:index="index" />
									</PinInputGroup>
								</PinInput>
							</div>
						</FormControl>
						<FormDescription>
							Enter the verification code from your authenticator app.
						</FormDescription>
					</FormItem>
				</FormField>
			</div>
		</CardContent>
		<CardFooter
			v-if="qr && !loading"
			class="space-x-2">
			<Button
				type="button"
				class="ml-auto"
				:disabled="submitting"
				@click="onEnableClicked">
				<LoadingIcon
					v-if="submitting"
					class="h-8 w-8" />
				<span v-else>Enable</span>
			</Button>
			<Button
				type="button"
				variant="secondary"
				class="ml-auto"
				:disabled="submitting"
				@click="onCancelClicked">
				Cancel
			</Button>
		</CardFooter>
	</div>
</template>

<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

const emit = defineEmits(['success']);

const qr = ref(''); // holds the QR code image SVG
const value = ref<string[]>([]);
const verifyCode = ref(''); // contains the code entered by the user
const factorId = ref(''); // holds the factor ID
const loading = ref(false);
const submitting = ref(false);

const handleComplete = (e: string[]) => {
	verifyCode.value = e.join('');
};

const supabase = useSupabaseClient();

const onEnableClicked = async () => {
	try {
		submitting.value = true;

		const { data: challenge, error: challengeError } =
			await supabase.auth.mfa.challenge({ factorId: factorId.value });

		if (challengeError) throw challengeError;

		if (!challenge || !challenge.id) {
			let error = new Error('Challenge data is undefined or invalid.');
			throw error;
		}

		const challengeId = challenge.id;

		const { error: verifyError } = await supabase.auth.mfa.verify({
			factorId: factorId.value,
			challengeId,
			code: verifyCode.value,
		});
		if (verifyError) throw verifyError;

		emit('success');

		toast({
			title: 'Success',
			description: 'Multi-factor authentication enabled.',
		});
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

const onCancelClicked = () => {
	qr.value = '';
	value.value = [];
	verifyCode.value = '';
};

const generateQRCode = async () => {
	try {
		loading.value = true;
		const { data, error } = await supabase.auth.mfa.enroll({
			factorType: 'totp',
		});

		if (error) throw error;

		factorId.value = data.id;

		if (data.totp && data.totp.qr_code) {
			qr.value = data.totp.qr_code;
		} else {
			toast({
				title: 'Error',
				description: 'QR code not received.',
				variant: 'destructive',
			});
		}

		loading.value = false;
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message,
			variant: 'destructive',
		});
		loading.value = false;
	}
};
</script>
