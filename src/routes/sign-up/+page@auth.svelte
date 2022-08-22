<script lang="ts">
	import AuthContainer from "$components/auth-container.svelte"
	import Button from "$components/button.svelte";
	import Input from "$components/text-input.svelte";
</script>

<AuthContainer>
	<h2 class="text-heading-xl mb-[30px]">Sign-up</h2>

	<Input class="mb-4">
		Username
	</Input>

	<Input class="mb-4">
		Email
	</Input>

	<Input class="mb-4" type="password">
		Password
	</Input>

	<Input class="mb-4" type="password">
		Confirm Password
	</Input>

	<div class="w-full flex justify-between items-center">
		<Button>
			Sign up
		</Button>

		<a class="uppercase text-purple-600 text-heading-s hover:line-through focus:line-through focus:outline-none" href="/login">login</a>
	</div>
</AuthContainer>
