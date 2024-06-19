<template>
	<main class="relative">
		<div class="absolute right-4 top-4 z-10">
			<ColorModeToggle />
		</div>
		<div
			class="container relative flex min-h-screen items-center justify-center">
			<div class="w-full max-w-md space-y-8 text-center">
				<button
					class="hover:opacity-90"
					@click="handleError">
					<BrandLogo />
				</button>
				<div class="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Error {{ error.statusCode }}</CardTitle>
							<CardDescription>Oops! Something went wrong.</CardDescription>
						</CardHeader>
						<CardContent>
							{{ error.message }}
						</CardContent>
						<CardFooter>
							<Button
								class="w-full"
								@click="handleError"
								>Back Home</Button
							>
						</CardFooter>
					</Card>
					<p class="px-8 text-sm text-muted-foreground">
						If problem persists, please contact us at
						<a
							href="mailto:support@example.com"
							class="text-primary hover:underline"
							>support@example.com</a
						>
					</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
	error: Object as () => NuxtError,
});

const user = useSupabaseUser();

const handleError = () => {
	if (user.value) {
		clearError({ redirect: '/app' });
	} else {
		clearError({ redirect: '/' });
	}
};
</script>
