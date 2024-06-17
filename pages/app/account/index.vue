<template>
	<div>
		<AppPageHeader
			heading="Profile"
			subheading="Account"
			lead="Update your account information." />
		<div
			class="grid gap-6 px-4 py-6 mx-auto max-w-screen-2xl sm:px-6 sm:py-8 md:grid-cols-3 lg:grid-cols-5 lg:px-8 lg:py-12 xl:grid-cols-6">
			<AppSideNavBar section="account" />
			<Card class="md:col-span-2 lg:col-span-4">
				<CardHeader>
					<CardTitle>General</CardTitle>
					<CardDescription>
						General profile information. This information is public.
					</CardDescription>
				</CardHeader>
				<form @submit.prevent="onSubmit">
					<CardContent class="grid gap-6 md:grid-cols-2">
						<FormField
							v-slot="{ componentField }"
							name="email">
							<FormItem v-auto-animate>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										v-if="user && !loading"
										:default-value="user.email"
										type="email"
										v-bind="componentField"
										disabled />
									<Skeleton
										v-else
										class="w-full h-10" />
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<FormField
							v-slot="{ componentField }"
							name="username">
							<FormItem v-auto-animate>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										v-if="username"
										:default-value="username"
										type="text"
										v-bind="componentField" />
									<Skeleton
										v-else
										class="w-full h-10" />
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<FormField
							v-slot="{ componentField }"
							name="fullName">
							<FormItem v-auto-animate>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										v-if="fullName"
										:default-value="fullName"
										type="text"
										v-bind="componentField" />
									<Skeleton
										v-else
										class="w-full h-10" />
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<FormField
							v-slot="{ componentField }"
							name="website">
							<FormItem v-auto-animate>
								<FormLabel>Website</FormLabel>
								<FormControl>
									<Input
										v-if="website"
										:default-value="website"
										type="url"
										v-bind="componentField" />
									<Skeleton
										v-else
										class="w-full h-10" />
								</FormControl>
								<FormMessage />
							</FormItem>
						</FormField>
						<FormField
							v-slot="{ componentField }"
							name="bio">
							<FormItem v-auto-animate>
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea
										v-if="bio"
										:default-value="bio"
										v-bind="componentField"
										@input="updateBio" />
									<Skeleton
										v-else
										class="w-full h-20" />
								</FormControl>
								<FormDescription
									:class="[charCount > 140 ? 'text-destructive' : '']">
									Maximum 140 characters ({{ charCount }}/140)</FormDescription
								>
								<FormMessage />
							</FormItem>
						</FormField>
					</CardContent>

					<CardFooter>
						<Button
							type="submit"
							:disabled="submitting && loading">
							<LoadingIcon
								v-if="submitting"
								class="w-8 h-8" />
							<span v-else>Update</span>
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/toast/use-toast';

// Supabase
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// UI State
const loading = ref(true);
const submitting = ref(false);
const { toast } = useToast();

// Form Data
const username = ref('');
const website = ref('');
const fullName = ref('');
const bio = ref('');

// Update Bio Character Count
const charCount = ref(0);
const updateBio = (event: Event) => {
	const input = event.target as HTMLTextAreaElement;
	bio.value = input.value;
	charCount.value = input.value.length;
};

// Fetch User Profile
const fetchProfile = async () => {
	try {
		const { data, error } = await supabase
			.from('profiles')
			.select(`username, website, full_name, bio`)
			.eq('id', user.value.id)
			.single();

		if (error) throw error;

		if (data) {
			username.value = data.username;
			website.value = data.website;
			fullName.value = data.full_name;
			bio.value = data.bio;
			charCount.value = data.bio.length;
		}
	} catch (error) {
		const typedError = error as {
			error_message: string;
			error_description: string;
		};

		toast({
			title: typedError.error_message,
			description: typedError.error_description,
			variant: 'destructive',
		});
	} finally {
		loading.value = false;
	}
};

if (user.value) {
	await fetchProfile();
}

// Form Validation
const formSchema = toTypedSchema(
	z.object({
		username: z.string().min(3).max(20).optional(),
		website: z.string().url().optional(),
		fullName: z.string().optional(),
		bio: z.string().max(140).optional(),
	}),
);

const form = useForm({
	validationSchema: formSchema,
});

// Update User Profile
const onSubmit = form.handleSubmit(async (values) => {
	try {
		submitting.value = true;

		const updates = {
			id: user.value.id,
			username: values.username,
			website: values.website,
			full_name: values.fullName,
			bio: values.bio,
			updated_at: new Date(),
		};

		const { error } = await supabase.from('profiles').upsert(updates, {
			returning: 'minimal',
		});
		if (error) throw error;

		toast({
			title: 'Success! ',
			description: 'Your account has been updated.',
		});
	} catch (error) {
		const typedError = error as {
			error_message: string;
			error_description: string;
		};

		toast({
			title: typedError.error_message,
			description: typedError.error_description,
			variant: 'destructive',
		});
	} finally {
		submitting.value = false;
	}
});
</script>
