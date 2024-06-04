// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	// plugins: { eslintConfigPrettier },
}).append(
	{
		ignores: ['components/ui/**'],
	},
	{
		rules: {
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'always',
						component: 'always',
					},
					svg: 'always',
					math: 'always',
				},
			],
		},
	},
);
