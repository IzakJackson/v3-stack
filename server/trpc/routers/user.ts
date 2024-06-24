// server/trpc/routers/user.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { serverSupabaseServiceRole } from '#supabase/server';

const t = initTRPC.create();

export const userRouter = t.router({
	deleteUser: t.procedure
		.input(
			z.object({
				userId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const client = serverSupabaseServiceRole(ctx.event);
			const { userId } = input;

			// Delete from profiles table first
			const { error: profileError } = await client
				.from('profiles')
				.delete()
				.eq('id', userId);

			if (profileError) {
				throw new Error(`Error deleting user profile: ${profileError.message}`);
			}

			// Then delete from auth table
			const { error: authError } = await client.auth.admin.deleteUser(userId);

			if (authError) {
				throw new Error(`Error deleting user: ${authError.message}`);
			}

			return { message: 'User deleted successfully' };
		}),
});
