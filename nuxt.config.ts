// https://nuxt.com/docs/api/configuration/nuxt-config
import './env';

export default defineNuxtConfig({
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	build: {
		transpile: ['trpc-nuxt'],
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxt/image',
		'@nuxt/fonts',
		'@formkit/auto-animate/nuxt',
		'@nuxtjs/color-mode',
		'shadcn-nuxt',
		'dayjs-nuxt',
		'@pinia/nuxt',
		'@nuxtjs/supabase',
		'@nuxt/eslint',
	],
	image: {
		quality: 80,
		format: ['webp'],
		screens: {
			xs: 320,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536,
			'2xl': 1536,
		},
	},
	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},
	colorMode: {
		preference: 'system',
		fallback: 'dark',
		classSuffix: '',
	},
	supabase: {
		clientOptions: {
			auth: {
				flowType: 'implicit',
			},
		},
		redirectOptions: {
			login: '/signin',
			callback: '/confirm',
			include: ['/app'],
			cookieRedirect: true,
		},
	},
});
