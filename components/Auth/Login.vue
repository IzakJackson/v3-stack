<template>
	<form @submit.prevent="onSubmit">
		<CardContent class="text-left">
			<FormField
				v-slot="{ componentField }"
				name="email">
				<FormItem v-auto-animate>
					<FormLabel />
					<FormControl>
						<Input
							placeholder="joe.bloggs@example.com"
							type="email"
							v-bind="componentField" />
					</FormControl>
					<FormDescription>
						We'll send a magic link to your inbox.
					</FormDescription>
					<FormMessage />
				</FormItem>
			</FormField>
		</CardContent>
		<CardFooter>
			<Button
				class="w-full"
				type="submit"
				:disabled="submitting">
				<LoadingIcon
					v-if="submitting"
					class="h-8 w-8" />
				<span v-else>Sign In</span>
			</Button>
		</CardFooter>
	</form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { useToast } from '@/components/ui/toast/use-toast';

const emits = defineEmits(['success']);

const { toast } = useToast();
const supabase = useSupabaseClient();
const submitting = ref(false);

const formSchema = toTypedSchema(
	z.object({
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email({ message: 'Must be a valid email' }),
	}),
);

const { handleSubmit, resetForm } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	try {
		submitting.value = true;

		const { error } = await supabase.auth.signInWithOtp({
			email: values.email,
			options: {
				emailRedirectTo: 'http://localhost:3000' + '/confirm',
			},
		});

		if (error) throw error;

		emits('success');

		resetForm();
	} catch (error) {
		toast({
			title: `Error: ${error.code || ''}`,
			description: error.message || 'An unknown error occurred.',
			variant: 'destructive',
		});
	} finally {
		submitting.value = false;
	}
});
</script>
