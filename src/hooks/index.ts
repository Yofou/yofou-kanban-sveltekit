import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { themeHandle } from "./theme";

export const handle: Handle = sequence(themeHandle)
