<script lang="ts">
	import BoardButtonIcon from "$components/icons/board-button.svelte";
	import Logo from "$components/icons/logo.svelte";
	import AsideBoardButton from "./aside-board-button.svelte";
	import { defferedIsOpen, isAsideOpen } from "$lib/stores/nav-aside";
	import ThemeSlider from "./theme-slider.svelte";
	import { fly } from "svelte/transition";
	import { tailwind } from "$lib/beziers/tailwind";
	import NewBoardModal from "./new-board-modal.svelte";
	import type { PageData } from "../../routes/dashboard/$types"

	type Boards = PageData["boards"]
	export let boards: Boards
	const onCloseAside = () => {
		$isAsideOpen = false
	}

	let newBoardOpen = false
	const onNewBoardOpen = () => newBoardOpen = true
</script>

{#if $defferedIsOpen}
	<aside transition:fly|local={{ x: -300, opacity: 1, duration: 150, easing: tailwind }} class="absolute w-[300px] border-r border-r-grey-400 h-full bg-white dark:bg-grey-500">
		<nav class="w-full px-6 py-8 h-full grid grid-rows-[repeat(2,max-content),1fr,repeat(2,max-content)]">
			<Logo />

			<h2 class="font-font-jaka font-bold text-[12px] tracking-[2.4px] uppercase text-grey-300 mt-[54px]">all boards ({boards.length})</h2>
			<div class="flex flex-col mt-5">
				{#each boards as board}
					<AsideBoardButton id={board.id}>{board.name}</AsideBoardButton>	
				{/each}
				<button class="-ml-6 py-4 text-purple-600 text-heading-m w-full rounded-r-[100px] flex gap-4" on:click={onNewBoardOpen}>
					<BoardButtonIcon class="ml-6" />
					+ Create New Board
				</button>
			</div>

			<ThemeSlider />
			<button on:click={onCloseAside} class="flex gap-[10px] text-heading-m text-left text-grey-300 mt-[30px]">
				<img src="/close-eye.svg" alt="">
				Hide Sidebar
			</button>
		</nav>
	</aside>
{/if}

<NewBoardModal bind:open={newBoardOpen} />
