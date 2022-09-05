import { cubicBezier } from "./utils"

export const tailwind = (t: number) => {
	return cubicBezier(
		t, 
		{ x: 0.4, y: 0 },
		{ x: 0.2, y: 1 },
	).y
}
