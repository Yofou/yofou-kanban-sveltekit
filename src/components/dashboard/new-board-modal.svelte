<script lang="ts">
	import TextInput from "$components/text-input.svelte";
	import Modal from "$components/dashboard/modal.svelte";
	import Button from "$components/button.svelte";
	import { invalidateAll } from "$app/navigation";

	export let open = false

	let boardInputs = {
		name: '',
		columns: [{ id: crypto.randomUUID(), value: '' }],
	}

	$: if (open == false) {
		boardInputs = {
			name: '',
			columns: [{ id: crypto.randomUUID(), value: '' }],
		}
	}

	$: columns = boardInputs.columns
	const addNewBoardColumn = () => {
		boardInputs.columns.push({ id: crypto.randomUUID(), value: '' })
		boardInputs = boardInputs
	}

	const addNewBoard = async () => {
		const response = await fetch('/dashboard/api/boards', {
			method: 'POST',
			body: JSON.stringify({
				name: boardInputs.name
			})
		})

		if (response.ok) {
			console.log('successufly created a new board')
			invalidateAll()
			open = false
		} else {
			console.log('failed to create a new board')
			const error = await response.json()
			console.log(error)
		}
	}
</script>

<Modal bind:open>
	<div class="w-full p-8 max-w-[480px] place-self-center rounded-[6px] bg-grey-500">
		<h2 class="text-heading-l text-white mb-6">Add New Board</h2>

		<TextInput bind:value={boardInputs.name}>Board name</TextInput>

		<h3 class="text-white font-font-jaka text-[12px] font-bold mt-6 mb-2">
			Board Columns
		</h3>

		<div class="flex flex-col gap-3">
			{#each columns as column (column.id)}
				<TextInput bind:value={column.value} />
			{/each}
		</div>

		<Button class="w-full mt-3 !bg-white text-purple-600" on:click={addNewBoardColumn}>
			+ Add New Column
		</Button>
		<Button class="w-full mt-6" on:click={addNewBoard}>
			Create New Board
		</Button>
	</div>
</Modal>
