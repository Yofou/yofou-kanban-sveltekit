<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import AuthContainer from "$components/auth-container.svelte"
	import Button from "$components/button.svelte";
	import Input from "$components/text-input.svelte";
	import type { LoginValidator } from "$lib/validators/login";

	const auth = {
		email: '',
		password: ''
	}

	let errors: LoginValidator
	const onSubmit = async () => {
		const res = await fetch("/login/api", {
			method: "POST",
			body: JSON.stringify(auth)
		})

		if (res.ok) {
			console.log("login succces")
			invalidateAll()
		} else {
			console.log("login fail")
			errors = await res.json()
		}
	}
</script>

<AuthContainer>
	<h2 class="text-heading-xl mb-[30px]">Login</h2>

	<form on:submit|preventDefault={onSubmit}>
		<Input bind:value={auth.email} class="mb-4">
			Email
		</Input>

		<Input bind:value={auth.password} class="mb-4" type="password">
			Password
		</Input>

		{#if errors?._errors[0]}
			<p class="text-red-600 text-body-l font-bold mb-4">{errors?._errors[0]}</p>
		{/if}

		<div class="w-full flex justify-between items-center">
			<Button>
				Submit
			</Button>

			<a class="uppercase text-purple-600 text-heading-s hover:line-through focus:line-through focus:outline-none" href="/sign-up">sign up</a>
		</div>
	</form>
</AuthContainer>
