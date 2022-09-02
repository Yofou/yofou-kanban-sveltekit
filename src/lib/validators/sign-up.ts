import { z } from "zod"
import PasswordValidator from "./password"
import type { ZodFormattedError } from "zod"

export type ValidatorReturn = ZodFormattedError<{
	username: string,
	email: string,
	password: string,
	confirm: string
}>

export default z.object({
	username: z.string().min(5, { message: "Username must have atleast 5 characters" }),
	email: z.string().email({ message: "Must be a valid email" }),
	password: PasswordValidator,
	confirm: z.string().min(8)
}).refine(
	(data) => {
		return data.password === data.confirm
	},
	{
		message: "Password & Confirm does not match",
		path: ["confirm"]
	}
)
