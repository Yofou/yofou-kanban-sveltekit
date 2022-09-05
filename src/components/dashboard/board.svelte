<script lang="ts">
	import { fly } from "svelte/transition"
	import { isAsideOpen, defferedIsOpen } from "$lib/stores/nav-aside";

	const openAside = () => {
		$isAsideOpen = true
	}
</script>

<main 
	class="relative transition-transform w-full h-full" 
	class:translate-x-[300px]={$defferedIsOpen}
>
	{#if !$isAsideOpen}
		<button 
			class="absolute bottom-8 left-0 w-[56px] h-[48px] rounded-r-[100px] bg-purple-600 grid" 
			on:click={openAside}
			transition:fly={{ x: -56, opacity: 1, duration: 250 }}
		>
			<div class="relative">
				<img class="absolute top-1/2 left-[15px] scale-110 -translate-y-1/2" src="/eye.svg" alt="">
			</div>
		</button>
	{/if}
</main>
