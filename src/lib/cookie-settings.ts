import type { CookieSerializeOptions } from "cookie";

export const settings: CookieSerializeOptions = {
	sameSite: "lax",
	httpOnly: true,
	maxAge: 60 * 60 * 24 * 7 // 1 week
}
