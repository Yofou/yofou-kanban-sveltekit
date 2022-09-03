<script lang="ts">
import { invalidateAll } from "$app/navigation";

	import Button from "$components/button.svelte";
	import Logo from "$components/icons/logo.svelte";
	import DropdownDialog from "./dropdown-dialog.svelte";

	let open = false

	const onLogout = async () => {
		const res = await fetch("/user/sign-out", {
			method: "DELETE"
		}).then( 
			bytes => bytes.json() 
		).catch(
			err => ({})
		)

		invalidateAll()
	}
</script>

<nav class="min-h-[96px] bg-white dark:bg-grey-500 grid grid-cols-[max-content,max-content,1fr,max-content,max-content] items-center px-8 gap-6" aria-label="theme and user navigation">
	<Logo class="mr-2" />

	<div class="w-[1px] h-full bg-grey-200 dark:bg-grey-400" />
	<h2 class="text-grey-700 dark:text-white text-heading-xl">Platform launch</h2>

	<Button on:click el="button" class="text-heading-m font-bold">+ Add New Task</Button>
	
	<DropdownDialog bind:open position="right">
		<button slot="action" on:click={() => open = !open}>
			<img src="/options.svg" alt="">
		</button>

		<svelte:fragment slot="items">
			<button class="text-left">Edit Board</button>
			<button class="text-left text-red-600">Delete Board</button>
			<button class="text-left" on:click={onLogout}>Logout</button>
			<button class="text-left text-red-600">Delete Acc</button>
		</svelte:fragment>
	</DropdownDialog>
</nav>
