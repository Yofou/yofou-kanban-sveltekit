import { z } from "zod";
import type { ZodFormattedError } from "zod"

export type LoginValidator = ZodFormattedError<{
	email: string,
	password: string
}>

export default z.object({
	email: z.string(),
	password: z.string()
})
