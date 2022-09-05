<script lang="ts">
	import BoardButtonIcon from "$components/icons/board-button.svelte";
	import Logo from "$components/icons/logo.svelte";
	import AsideBoardButton from "./aside-board-button.svelte";
	import { defferedIsOpen, isAsideOpen } from "$lib/stores/nav-aside";
	import { fly } from "svelte/transition"
	import ThemeSlider from "./theme-slider.svelte";

	const onCloseAside = () => {
		$isAsideOpen = false
	}
</script>

{#if $defferedIsOpen}
	<aside transition:fly={{ x: -300, opacity: 1, duration: 150 }} class="absolute w-[300px] h-full bg-white dark:bg-grey-500">
		<nav class="w-full px-6 py-8 h-full grid grid-rows-[repeat(2,max-content),1fr,repeat(2,max-content)]">
			<Logo />

			<h2 class="font-font-jaka font-bold text-[12px] tracking-[2.4px] uppercase text-grey-300 mt-[54px]">all boards ()</h2>
			<div class="flex flex-col mt-5">
				<AsideBoardButton>Platform Launch</AsideBoardButton>
				<button class="-ml-6 py-4 text-purple-600 text-heading-m w-full rounded-r-[100px] flex gap-4">
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
