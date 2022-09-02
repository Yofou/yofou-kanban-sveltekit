import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = ({ locals }) => {
	
	console.log(locals.session.data)
	if (locals.session.data?.email) {
		throw redirect(302, '/dashboard')
	}

	return {
		theme: locals.theme
	}
}
