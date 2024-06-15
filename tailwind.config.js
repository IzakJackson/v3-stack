const animate = require('tailwindcss-animate');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	safelist: ['dark'],
	prefix: '',

	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'collapsible-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-collapsible-content-height)' },
				},
				'collapsible-up': {
					from: { height: 'var(--radix-collapsible-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'collapsible-down': 'collapsible-down 0.2s ease-in-out',
				'collapsible-up': 'collapsible-up 0.2s ease-in-out',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.foreground'),
						h1: {
							'scroll-margin-top': theme('spacing.20'),
							fontSize: theme('fontSize.4xl'),
							fontWeight: theme('fontWeight.extrabold'),
							trackingTight: theme('tracking.tight'),
							'@screen lg': {
								fontSize: theme('fontSize.5xl'),
							},
						},
						h2: {
							marginTop: theme('spacing.10'),
							'scroll-margin-top': theme('spacing.20'),
							borderBottomWidth: '1px',
							paddingBottom: theme('spacing.2'),
							fontSize: theme('fontSize.3xl'),
							fontWeight: theme('fontWeight.semibold'),
							trackingTight: theme('tracking.tight'),
							transitionProperty: 'color',
							':first-child': {
								marginTop: '0',
							},
						},
						h3: {
							marginTop: theme('spacing.8'),
							'scroll-margin-top': theme('spacing.20'),
							fontSize: theme('fontSize.2xl'),
							fontWeight: theme('fontWeight.semibold'),
							trackingTight: theme('tracking.tight'),
						},
						p: {
							lineHeight: theme('lineHeight.7'),
							':not(:first-child)': {
								marginTop: theme('spacing.6'),
							},
						},
						a: {
							fontWeight: theme('fontWeight.medium'),
							color: theme('colors.primary.DEFAULT'),
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
								textDecorationOffset: '4px',
							},
						},
						blockquote: {
							marginTop: theme('spacing.6'),
							borderLeftWidth: '2px',
							paddingLeft: theme('spacing.6'),
							fontStyle: 'italic',
						},
						ul: {
							marginTop: theme('spacing.6'),
							marginLeft: theme('spacing.6'),
							listStyleType: 'disc',
							'> li': {
								marginTop: theme('spacing.2'),
							},
						},
						table: {
							marginTop: theme('spacing.6'),
							width: '100%',
							overflowY: 'auto',
							thead: {
								tr: {
									borderTopWidth: '1px',
									padding: '0',
									':even': {
										backgroundColor: theme('colors.muted.DEFAULT'),
									},
									th: {
										borderWidth: '1px',
										paddingX: theme('spacing.4'),
										paddingY: theme('spacing.2'),
										textAlign: 'left',
										fontWeight: theme('fontWeight.bold'),
										'&[align=center]': {
											textAlign: 'center',
										},
										'&[align=right]': {
											textAlign: 'right',
										},
									},
								},
							},
							tbody: {
								tr: {
									borderTopWidth: '1px',
									padding: '0',
									':even': {
										backgroundColor: theme('colors.muted.DEFAULT'),
									},
									td: {
										borderWidth: '1px',
										paddingX: theme('spacing.4'),
										paddingY: theme('spacing.2'),
										textAlign: 'left',
										'&[align=center]': {
											textAlign: 'center',
										},
										'&[align=right]': {
											textAlign: 'right',
										},
									},
								},
							},
						},
					},
				},
			}),
		},
	},
	plugins: [
		animate,
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/container-queries'),
	],
};
