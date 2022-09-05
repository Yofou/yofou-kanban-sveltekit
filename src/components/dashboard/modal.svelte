<script lang="ts">
	import { clickOutside } from "svelte-use-click-outside"
	import { fade } from "svelte/transition"
	export let open = false

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Escape") open = false
	}
</script>

<svelte:body on:keyup={onKeyUp} />

{#if open}
	<div transition:fade|local class="fixed top-0 left-0 w-screen h-screen bg-[black]/50 grid">
		<div use:clickOutside={() => open = false} class="contents">
			<slot />
		</div>
	</div>
{/if}
