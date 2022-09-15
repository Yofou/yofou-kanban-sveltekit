import { client } from "$lib/client";
import boards from "$lib/validators/boards";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ request, locals }) => {
	const response = boards.safeParse(await request.json())

	if (response.success) {
		const board = await client.board.create({
			data: {
				name: response.data.name,
				userId: locals.session.data.id
			}
		})

		return json({
			data: board,
			success: true,
		})
	} else {
		const errors = response.error.format()
		return json({
			errors,
			sucess: false,
		}, {
			status: 400
		})
	}
}

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const body = await request.json()
	if (!body.id) {
		// throw error here 	
		return json({
			error: "No board id provided in request body",
			success: false,
		})
	}

	const { count } = await client.board.deleteMany({
		where: {
			id: body.id,
			userId: locals.session.data.id
		}
	})

	return json({
		count,
		success: true,
	})
}
