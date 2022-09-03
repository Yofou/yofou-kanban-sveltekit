import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals }) => {
	try {
		if (locals.session.data.email) {
		await locals.session.destroy()
		return json({
			success: true
		})
	} else {
		return json({
			error: "No Active Session",
			success: false,
		}, {
			status: 400
		})
	}
	} catch (err) {
		console.log(err)
		return json({
			error: `${err}`,
			success: false,
		})
	}
	
}
