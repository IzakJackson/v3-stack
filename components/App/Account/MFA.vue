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
					Manage your factors.
				</span>
				<span v-if="!factors && loading">
					Loading your MFA settings. <LoadingIcon />
				</span>
			</CardDescription>
		</CardHeader>

		<!-- Enrollment -->
		<div
			v-auto-animate
			v-if="factors.length < 1 && !loading">
			<CardContent class="grid gap-6 md:grid-cols-3">
				<FormField
					v-slot="{ componentField }"
					name="email">
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
						name="email">
						<FormItem v-auto-animate>
							<FormLabel>Verification Code</FormLabel>
							<FormControl>
								<Input
									v-model="verifyCode"
									type="text" />
							</FormControl>
							<FormDescription>
								Enter the verification code from your authenticator app.
							</FormDescription>
							<FormMessage />
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
					@click="onEnableClicked">
					Enable
				</Button>
				<Button
					type="button"
					variant="secondary"
					class="ml-auto">
					Cancel
				</Button>
			</CardFooter>
		</div>

		<!-- Unenrollment -->
		<div v-if="factors.length >= 1 && !loading">
			<CardContent class="grid gap-6">
				<Table v-if="factors.length > 0">
					<TableHeader>
						<TableRow>
							<TableHead>Factor ID</TableHead>
							<TableHead> {{ '' }}</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow
							v-for="factor in factors"
							:key="factor.id">
							<TableCell class="font-medium">{{ factor.id }}</TableCell>
							<TableCell>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Button
												variant="ghost"
												size="icon"
												@click="copyToClipboard(factor.id)">
												<Square2StackIcon class="h-5 w-5 text-primary" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Copy Factor ID</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</TableCell>
							<TableCell class="capitalize">{{
								factor.friendly_name || 'N/A'
							}}</TableCell>
							<TableCell class="uppercase">{{ factor.factor_type }}</TableCell>
							<TableCell
								:class="[
									'capitalize',
									factor.status === 'verified'
										? 'text-primary'
										: 'text-destructive',
								]"
								>{{ factor.status }}</TableCell
							>
						</TableRow>
					</TableBody>
				</Table>
				<div
					v-else
					class="mt-4">
					Multi-Factor Authentication is not enabled.
				</div>
				<FormField
					v-slot="{ componentField }"
					name="factorId">
					<FormItem v-auto-animate>
						<FormLabel>Enter Factor ID to Disable</FormLabel>
						<FormControl>
							<Input
								v-model="unenrollFactorId"
								type="text" />
						</FormControl>
					</FormItem>
				</FormField>
			</CardContent>
			<CardFooter class="space-x-2">
				<Button
					class="ml-auto"
					variant="destructive"
					type="button"
					@click="onUnenrollClicked">
					Disable
				</Button>
			</CardFooter>
		</div>
	</Card>
</template>

<script lang="ts" setup>
import { Square2StackIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();

const factorId = ref('');
const loading = ref(true);
const qr = ref(''); // holds the QR code image SVG
const verifyCode = ref(''); // contains the code entered by the user
const factors = ref([]); // holds the list of factors
const unenrollFactorId = ref(''); // factor ID to unenroll

const supabase = useSupabaseClient();

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		toast({
			title: 'Success',
			description: 'Copied to clipboard',
			variant: 'positive',
		});
	} catch (error) {
		toast({
			title: 'Error',
			description: 'Failed to copy to clipboard',
			variant: 'destructive',
		});
	}
};

const onEnableClicked = async () => {
	try {
		// Initiate MFA challenge
		const { data: challenge, error: challengeError } =
			await supabase.auth.mfa.challenge({
				factorId: factorId.value,
			});

		if (challengeError) throw error; // Correct error throw

		// Ensure challenge data is available
		if (!challenge || !challenge.id) {
			let error;
			error.message = 'Challenge data is undefined or invalid.';
			throw error;
		}

		const challengeId = challenge.id;

		// Verify MFA challenge
		const { error: verifyError } = await supabase.auth.mfa.verify({
			factorId: factorId.value,
			challengeId,
			code: verifyCode.value,
		});
		if (verifyError) throw error; // Correct error throw

		// Fetch updated factors
		await fetchFactors();

		toast({
			title: 'Success',
			description: 'Multi-factor authentication enabled.',
			variant: 'destructive',
		});
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message || 'An unknown error occurred.',
			variant: 'destructive',
		});
	}
};

const onUnenrollClicked = async () => {
	try {
		const { error } = await supabase.auth.mfa.unenroll({
			factorId: unenrollFactorId.value,
		});

		if (error) throw error;

		// Refresh the list of factors after unenrollment
		await fetchFactors();

		toast({
			title: 'Success',
			description: 'Multi-factor authentication disabled.',
			variant: 'destructive',
		});
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message,
			variant: 'destructive',
		});
	}
};

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

const generateQRCode = async () => {
	try {
		const { data, error } = await supabase.auth.mfa.enroll({
			factorType: 'totp',
		});

		if (error) throw error;

		factorId.value = data.id;

		if (data.totp && data.totp.qr_code) {
			qr.value = data.totp.qr_code;
		} else {
			toast({
				title: `Error`,
				description: 'QR code not received.',
				variant: 'destructive',
			});
		}

		await fetchFactors();
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message,
			variant: 'destructive',
		});
	}
};

onMounted(async () => {
	await fetchFactors();
});
</script>
