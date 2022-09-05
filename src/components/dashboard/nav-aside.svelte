<script lang="ts">
	import { defferedIsOpen } from "$lib/stores/nav-aside";
	import { fly } from "svelte/transition"
</script>

{#if $defferedIsOpen}
	<aside transition:fly={{ x: -300, opacity: 1, duration: 150 }} class="absolute w-[300px] h-full bg-grey-500">
		<nav class="w-full h-full">
		</nav>
	</aside>
{/if}
