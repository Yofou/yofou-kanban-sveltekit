<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import Button from "$components/button.svelte";
	import Logo from "$components/icons/logo.svelte";
	import DropdownDialog from "./dropdown-dialog.svelte";
	import Modal from "./modal.svelte";
	import { page } from "$app/stores"

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


	let delAccOpen = false
	$: account = $page.data?.session
	const onDeleteAcc = () => {
		delAccOpen = true
	}

	const onDeleteAccAction = async () => {
		await fetch("/user/", { method: "DELETE" })
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
			<button class="text-left text-red-600" on:click={onDeleteAcc}>Delete Account</button>
		</svelte:fragment>
	</DropdownDialog>
</nav>

<Modal bind:open={delAccOpen}>
	<div class="bg-white dark:bg-grey-500 rounded-[6px] w-full max-w-[480px] min-h-[229px] p-8 place-self-center grid grid-rows-[max-content,1fr,max-content] gap-6">
		<h2 class="text-heading-l text-red-600">Delete This Account</h2>
		<p class="text-body-l text-grey-300">Are you sure you want to delete the ‘{account?.name}‘ This action will remove all boards, columns and tasks and cannot be reversed.</p>

		<div class="grid grid-cols-2 gap-4 w-full">
			<Button on:click={onDeleteAccAction} class="bg-red-600 hover:bg-red-300" el="button">Delete</Button>
				<Button on:click={() => open = false} class="bg-[white] hover:bg-white text-purple-600" el="button">Cancel</Button>
		</div>
	</div>
</Modal>
