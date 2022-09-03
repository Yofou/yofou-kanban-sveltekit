import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.session.data.email) {
		throw redirect(302, "/login")	
	}

	return {}
}