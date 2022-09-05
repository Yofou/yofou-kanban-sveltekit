import { cubicBezier } from "./utils"

export const ease = (t: number) => {
	return cubicBezier(
		t, 
		{ x: 0.25, y: 0.1 },
		{ x: 0.25, y: 1 },
	).y
}
