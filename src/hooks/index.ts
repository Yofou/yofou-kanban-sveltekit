import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { themeHandle } from "./theme";
import { handleSession } from "svelte-kit-cookie-session"

const sessionHandler = handleSession({
	secret: 'Ijus3tReAlLyNeEdASt2RonGSeCrETFoRMyCoOkieS1'
});

export const handle: Handle = sequence(sessionHandler, themeHandle)
