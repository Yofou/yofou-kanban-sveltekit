<script lang="ts">
	import AuthContainer from "$components/auth-container.svelte"
	import Button from "$components/button.svelte";
	import Input from "$components/text-input.svelte";
	import type { LoginValidator } from "$lib/validators/login";

	const auth = {
		email: '',
		password: ''
	}

	let errors: LoginValidator
	$: console.log(errors)

	const onSubmit = async () => {
		const res = await fetch("/login/api", {
			method: "POST",
			body: JSON.stringify(auth)
		})

		if (res.ok) {
			console.log("succces")
		} else {
			console.log("fail")
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

		<div class="w-full flex justify-between items-center">
			<Button>
				Submit
			</Button>

			<a class="uppercase text-purple-600 text-heading-s hover:line-through focus:line-through focus:outline-none" href="/sign-up">sign up</a>
		</div>
	</form>
</AuthContainer>
