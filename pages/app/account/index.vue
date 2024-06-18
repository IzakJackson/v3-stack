<template>
	<div>
		<AppPageHeader
			heading="Profile"
			subheading="Account"
			lead="Update your account information." />
		<div
			class="mx-auto grid max-w-screen-2xl gap-6 px-4 py-6 sm:px-6 sm:py-8 md:grid-cols-3 lg:grid-cols-5 lg:px-8 lg:py-12 xl:grid-cols-6">
			<AppSideNavBar section="account" />
			<div class="space-y-6 sm:space-y-8 md:col-span-2 lg:col-span-4">
				<Card>
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
											v-if="user && !profileStore.loading"
											:default-value="user.email"
											type="email"
											v-bind="componentField"
											disabled />
										<Skeleton
											v-else
											class="h-10 w-full" />
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
											v-if="!profileStore.loading"
											:default-value="profileStore.username"
											type="text"
											v-bind="componentField" />
										<Skeleton
											v-else
											class="h-10 w-full" />
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
											v-if="!profileStore.loading"
											:default-value="profileStore.fullName"
											type="text"
											v-bind="componentField" />
										<Skeleton
											v-else
											class="h-10 w-full" />
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
											v-if="!profileStore.loading"
											:default-value="profileStore.website"
											type="url"
											v-bind="componentField" />
										<Skeleton
											v-else
											class="h-10 w-full" />
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
											v-if="!profileStore.loading"
											:default-value="profileStore.bio"
											v-bind="componentField"
											@input="updateBio" />
										<Skeleton
											v-else
											class="h-20 w-full" />
									</FormControl>
									<FormDescription
										:class="[
											profileStore.charCount > 140 ? 'text-destructive' : '',
										]">
										Maximum 140 characters ({{
											profileStore.charCount
										}}/140)</FormDescription
									>
									<FormMessage />
								</FormItem>
							</FormField>
							<FormField
								v-slot="{ componentField }"
								name="avatar_path">
								<FormItem v-auto-animate>
									<FormLabel>Avatar</FormLabel>
									<FormControl>
										<AppAccountAvatarUploader
											:path="profileStore.avatar_path"
											v-bind="componentField"
											@update:path="profileStore.avatar_path = $event"
											@upload="onSubmit" />
									</FormControl>
								</FormItem>
							</FormField>
						</CardContent>

						<CardFooter>
							<Button
								type="submit"
								:disabled="submitting && profileStore.loading">
								<LoadingIcon
									v-if="submitting"
									class="h-8 w-8" />
								<span v-else>Update</span>
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/toast/use-toast';
import { useProfileStore } from '@/stores/profileStore';

// Supabase
const user = useSupabaseUser();
const supabase = useSupabaseClient();

// UI State
const submitting = ref(false);
const { toast } = useToast();

// Use Profile Store
const profileStore = useProfileStore();

// Fetch Profile on Mount
if (user.value) {
	await profileStore.fetchProfile();
}

// Update Bio Character Count
const updateBio = (event: Event) => {
	const input = event.target as HTMLTextAreaElement;
	profileStore.bio = input.value;
	profileStore.charCount = input.value.length;
};

// Form Validation
const formSchema = toTypedSchema(
	z.object({
		username: z
			.string()
			.min(3)
			.max(20)
			.refine((s) => !s.includes(' '), 'Spaces are not allowed')
			.optional(),
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
			avatar_url: profileStore.avatar_path,
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
		alert(error);
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
