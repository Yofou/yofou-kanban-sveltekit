import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad.auth = ({ locals }) => {
	return {
		theme: locals.theme
	}
}
