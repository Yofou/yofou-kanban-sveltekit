<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import AuthContainer from "$components/auth-container.svelte"
	import Button from "$components/button.svelte";
	import Input from "$components/text-input.svelte";
	import type { ValidatorReturn } from "$lib/validators/sign-up"

	export const auth = {
		username: '',
		email: '',
		password: '',
		confirm: ''
	}

	let lastSavedAuth: typeof auth | undefined = undefined
	let errors: ValidatorReturn
	export const onSubmit = async () => {
		const res = await fetch("/sign-up/api", {
			 method: "POST",
			 body: JSON.stringify(auth)
		})

		if (!res.ok) {
			errors = await res.json()
			lastSavedAuth = {...auth}
		} else {
			invalidateAll()
			// success
		}
	}
</script>

<AuthContainer>
	<h2 class="text-heading-xl mb-[30px]">Sign-up</h2>

	<form on:submit|preventDefault={onSubmit}>
		<Input 
		  	bind:value={auth.username} 
		  	error={errors?.username?._errors?.[0]} 
		  	showError={lastSavedAuth?.username === auth.username}
		  	class="mb-4" 
			name="username"
		>
			Username
		</Input>

		<Input 
			bind:value={auth.email} 
			error={errors?.email?._errors?.[0]} 
			showError={lastSavedAuth?.email === auth.email} 
			class="mb-4" 
			name="email"
		>
			Email
		</Input>

		<Input 
			bind:value={auth.password} 
			error={errors?.password?._errors?.[0]} 
			showError={lastSavedAuth?.password === auth.password}
			class="mb-4" 
			name="new-password" 
			type="password"
		>
			Password
		</Input>

		<Input 
			bind:value={auth.confirm} 
			error={errors?.confirm?._errors?.[0]} 
			showError={lastSavedAuth?.confirm === auth.confirm}
			class="mb-4" 
			name="new-password" 
			type="password"
		>
			Confirm Password
		</Input>

		<div class="w-full flex justify-between items-center">
			<Button>
				Sign up
			</Button>

			<a class="uppercase text-purple-600 text-heading-s hover:line-through focus:line-through focus:outline-none" href="/login">login</a>
		</div>
	</form>
</AuthContainer>
