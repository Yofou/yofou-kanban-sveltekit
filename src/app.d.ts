// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		theme: "light" | "dark"
		session: import('svelte-kit-cookie-session').Session<
			Omit<import('@prisma/client').User, 'password'>
		>;
		cookies: Record<string, string>; // all parsed cookies are automatically set from handleSession to avoid overhead
	}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}
