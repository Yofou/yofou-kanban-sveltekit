import type { RequestHandler } from "@sveltejs/kit"
import { serialize } from "cookie"
import { settings } from "$lib/cookie-settings"

export const POST: RequestHandler = ({ locals, setHeaders }) => {
	if (locals.theme === null || locals.theme === undefined) {
		locals.theme = "dark"
	} else if (locals.theme == "light") {
		locals.theme = "dark"
	} else {
		locals.theme = "light"
	}

	setHeaders({
		'set-cookie': serialize("theme", locals.theme, settings) 
	})

	return new Response(
		JSON.stringify({
			theme: locals.theme
		})
	)
}
