import { settings } from "$lib/cookie-settings"
import type { Handle } from "@sveltejs/kit"
import { parse, serialize } from "cookie"

export const themeHandle: Handle = async ({ event, resolve }) => {
	const { theme }  = parse(event.request.headers.get("cookie") ?? '')

	if (theme === undefined || (theme !== "light" && theme !== "dark")) {
		event.setHeaders({
			'set-cookie': serialize("theme", "dark", settings) 
		})

		event.locals.theme = "dark"
	} else {
		event.locals.theme = theme
	}
	
	const response = await resolve(event)
	return response
}
