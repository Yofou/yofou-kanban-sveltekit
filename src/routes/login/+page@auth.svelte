<script lang="ts">
	import AuthContainer from "$components/auth-container.svelte"
	import Button from "$components/button.svelte";
	import Input from "$components/text-input.svelte";
</script>

<AuthContainer>
	<h2 class="text-heading-xl mb-[30px]">Login</h2>

	<Input class="mb-4">
		Email
	</Input>

	<Input class="mb-4" type="password">
		Password
	</Input>

	<div class="w-full flex justify-between items-center">
		<Button>
			Submit
		</Button>

		<a class="uppercase text-purple-600 text-heading-s hover:line-through focus:line-through focus:outline-none" href="/sign-up">sign up</a>
	</div>
</AuthContainer>
