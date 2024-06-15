<template>
	<div>
		<div class="prose relative dark:prose-invert">
			<h1>Welcome to V3 Stack 🤘</h1>
			<p>
				This is a production-ready type-safe boilerplate for
				<a href="https://nuxt.com">Nuxt 3</a>, heavily inspired by
				<a href="https://create.t3.gg/">Theo & T3</a>, with my personal
				preferences mixed in.
			</p>
			<p>
				With <a href="https://supabase.com">Supabase</a> powering the backend
				and Nuxt 3 for the frontend and server, you can build a full-stack
				application with a strong focus on type safety, security and
				performance.
			</p>
			<b>Out of the box, the V3 Stack includes:</b>
			<ul>
				<li><b>TailwindCSS</b> - for styling</li>
				<li><b>Shadcn UI</b> - for UI components</li>
				<li><b>tRPC</b> - for a type-safe API</li>
				<li><b>Drizzle ORM</b> - for a type-safe database access</li>
				<li><b>Pinia</b> & <b>Pinia ORM</b> - for state management</li>
				<li><b>T3 Env</b> - for type-safe environment variables</li>
				<li>
					<b>Supabase Authentication</b> - for magic link sign up, & sign in
				</li>
				<li><b>Multifactor Authentication</b> - for extra security</li>
				<li>
					<b>Basic User Profiles</b> - including the ability to delete accounts
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'marketing',
});
</script>
