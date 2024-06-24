<template>
	<div>
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
							]">
							{{ factor.status }}
						</TableCell>
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
			<Dialog>
				<DialogTrigger
					class="ml-auto"
					:disabled="unenrollFactorId !== factors[0].id">
					<Button
						variant="destructive"
						type="button"
						:disabled="unenrollFactorId !== factors[0].id">
						Disable
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure you want to disable MFA?</DialogTitle>
						<DialogDescription>
							This will disable MFA for your account. You will no longer be able
							to log in with a second factor, but can set it up again at a later
							date.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							class="ml-auto"
							variant="destructive"
							type="button"
							:disabled="submitting"
							@click="onUnenrollClicked">
							<LoadingIcon
								v-if="submitting"
								class="h-8 w-8" />
							<span v-else>Confirm Disable</span>
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</CardFooter>
	</div>
</template>

<script lang="ts" setup>
import { Square2StackIcon } from '@heroicons/vue/24/outline';
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

defineProps({ factors: { type: Array, default: () => [] } });
const emit = defineEmits(['success']);

const unenrollFactorId = ref('');

const supabase = useSupabaseClient();

const submitting = ref(false);

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

const onUnenrollClicked = async () => {
	try {
		submitting.value = true;

		const { error } = await supabase.auth.mfa.unenroll({
			factorId: unenrollFactorId.value,
		});

		if (error) throw error;

		emit('success');

		toast({
			title: 'Success',
			description: 'Multi-factor authentication disabled.',
		});
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
