import { client } from '$lib/client';
import LoginValidator from '$lib/validators/login';
import { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { verify } from 'argon2';

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();
	const res = LoginValidator.safeParse(data);

	try {
		if (res.success) {
			const searchedUser = await client.user.findFirst({
				where: {
					email: res.data.email
				}
			});

			if (searchedUser?.password && await verify(searchedUser.password, res.data.password)) {
				await locals.session.set({ 
					id: searchedUser.id,
					name: searchedUser.name,
					email: searchedUser.email,
				})

				return json({
					success: true
				});	
			} else {
				// throw error
				return json({
					_errors: ['Login Failed'],
					success: false
				}, {
					status: 401
				})
			}
		} else {
			const error = res.error.format();
			return json(error, {
				status: 400
			});
		}
	} catch(err) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			console.log("hit")
		}
		return json({
			
		}, {
			status: 400
		})
	}
};
