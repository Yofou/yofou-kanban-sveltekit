import { derived, writable } from "svelte/store"
import { browser } from  "$app/environment"

export const isAsideOpen = writable(false)
export let timeout: number;

export const defferedIsOpen = derived(isAsideOpen, ($isAsideOpen, set) => {
	if (!browser) return
	window.clearTimeout(timeout)
	
	timeout = window.setTimeout(() => {
		set($isAsideOpen)
	}, 250)
}, false)
