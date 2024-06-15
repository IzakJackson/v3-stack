<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button
				variant="ghost"
				size="icon"
				class="relative">
				<MoonIcon
					class="absolute h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<SunIcon
					class="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span class="sr-only">Toggle Theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
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
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon, CheckIcon } from '@heroicons/vue/24/outline';

const colorMode = useColorMode();
</script>
