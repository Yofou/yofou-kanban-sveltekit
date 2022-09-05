import type { RequestHandler } from '@sveltejs/kit';
import SignUpValidator from '$lib/validators/sign-up';
import { json } from '@sveltejs/kit';
import { client } from '$lib/client';
import { hash } from 'argon2';
import { Prisma } from '@prisma/client';

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();
	const res = SignUpValidator.safeParse(data);

	try {
		if (res.success) {
			const dbRes = await client.user.create({
				data: {
					name: res.data.username,
					email: res.data.email,
					password: await hash(res.data.password)
				}
			});

			await locals.session.set({ 
				id: dbRes.id,
				name: dbRes.name,
				email: dbRes.email,
			})

			return json({
				data: dbRes
			});
		} else {
			const error = res.error.format();
			return json(error, {
				status: 400
			});
		}
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
			return json({
				error: `${(err.meta?.target as string[])?.[0]}`,
				success: false,
			}, {
				status: 400
			})
		}

		return json({
			error: err
		}, { status: 500 })
	}
};
