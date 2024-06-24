<template>
	<AppLayoutContainer>
		<AppLayoutSectionMenu section="account" />
		<div class="w-full max-w-6xl md:order-first lg:col-span-5">
			<h1 class="text-3xl font-extrabold capitalize">Account</h1>
		</div>
		<div class="space-y-6 sm:space-y-8 lg:col-span-4">
			<AppAccountSecurityMFA />
			<AppAccountSecurityDeleteAccount />
		</div>
	</AppLayoutContainer>
</template>
