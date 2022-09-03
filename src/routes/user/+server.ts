import { client } from '$lib/client';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ locals }) => {
	try {
		if (locals.session.data?.email) {
			const res = await client.user.delete({
				where: {
					id: locals.session.data.id
				}
			});

			await locals.session.destroy();
			if (res) {
				return json({
					success: true
				});
			} else {
				return json({
					error: 'No User found but session deleted',
					success: false,
					"trace-id": crypto.randomUUID()
				});
			}
		} else {
			return json(
				{
					error: 'No Active Session',
					success: false,
					"trace-id": crypto.randomUUID()
				},
				{
					status: 406
				}
			);
		}
	} catch (err) {
		return json({
			error: `${err}`,
			success: false,
			"trace-id": crypto.randomUUID()
		})
	}
};
