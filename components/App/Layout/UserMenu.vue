<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button
				variant="ghost"
				size="icon"
				class="rounded-full !duration-150 hover:ring hover:ring-primary">
				<AppAccountAvatar />
				<UserIcon class="h-6 w-6" />
			</Button>
			<span class="sr-only">My Account</span>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem as-child>
				<NuxtLink
					to="/app/account"
					class="cursor-pointer"
					>Profile</NuxtLink
				>
			</DropdownMenuItem>
			<DropdownMenuItem as-child>
				<NuxtLink
					to="/app/account/security"
					class="cursor-pointer"
					>Security</NuxtLink
				>
			</DropdownMenuItem>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent>
						<DropdownMenuItem
							class="cursor-pointer"
							@click="colorMode.preference = 'light'">
							Light
							<CheckIcon
								v-if="colorMode.preference === 'light'"
								class="ml-auto h-4 w-4 text-primary" />
						</DropdownMenuItem>
						<DropdownMenuItem
							class="cursor-pointer"
							@click="colorMode.preference = 'dark'">
							Dark
							<CheckIcon
								v-if="colorMode.preference === 'dark'"
								class="ml-auto h-4 w-4 text-primary" />
						</DropdownMenuItem>
						<DropdownMenuItem
							class="cursor-pointer"
							@click="colorMode.preference = 'system'">
							System
							<CheckIcon
								v-if="colorMode.preference === 'system'"
								class="ml-auto h-4 w-4 text-primary" />
						</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				class="cursor-pointer"
				@click="signOut()">
				Sign Out
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';
import { UserIcon, CheckIcon } from '@heroicons/vue/24/outline';

const { toast } = useToast();
const supabase = useSupabaseClient();
const submitting = ref(false);

const colorMode = useColorMode();

async function signOut() {
	try {
		submitting.value = true;
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		navigateTo('/');
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
}
</script>
