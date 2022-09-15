import { client } from "$lib/client"
import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, params }) => {
	if (!locals.session.data.email) {
		throw redirect(302, "/login")	
	}

	const [boards, active] = await client.$transaction([
		client.board.findMany({
			where: { userId: locals.session.data.id }
		}),
		client.board.findFirst({
			where: { 
				id: `${params.id}`, 
				userId: locals.session.data.id, 
			}
		})
	])

	if (params.id && !active) {
		throw redirect(302, "/dashboard")
	} 

	return {
		boards,
		active: active ?? undefined
	}
}
