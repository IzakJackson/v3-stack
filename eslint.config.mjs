// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';

export default withNuxt({
	plugins: { prettier },
}).append(
	{
		ignores: ['components/ui/**'],
	},
	{
		rules: {
			'prettier/prettier': 'error',
		},
	},
);
