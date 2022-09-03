<script lang="ts">
	import { clickOutside } from "svelte-use-click-outside"
	import { fade } from "svelte/transition"

	export let open = false
	export let position: "center" | "right" = "center"

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === "Escape") open = false
	}
</script>

<svelte:window on:keyup={onKeyUp} />

<div class="relative text-left text-body-l text-grey-300" use:clickOutside={() => open = false}>
	<slot name="action" />

	{#if open}
		<div 
			class="top-[calc(100%+18px)] absolute flex min-w-[192px] shadow-task-shadow min-h-[94px] rounded-[8px] bg-white dark:bg-grey-600 flex-col gap-4 p-4"
			class:center={position === "center"}
			class:right={position === "right"}
			transition:fade={{ duration: 150 }}
		>
			<slot name="items" />
		</div>
	{/if}
</div>

<style>
	.center {
		@apply left-1/2 -translate-x-1/2
	}

	.right {
		@apply right-full
	}
</style>
