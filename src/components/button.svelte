<script lang="ts">
	export let el: "button" | "a" = "button"
	export let href: string | undefined = undefined


	$: if (el == "a" && !href) {
		console.warn("Svelte Button that is a tag must have a href")
	}
</script>

<svelte:element 
	on:click 
		class="text-heading-s focus:outline focus:outline-purple-300/50 text-white bg-purple-600 hover:bg-purple-300  disabled:opacity-50 transition-colors px-6 py-4 rounded-[9999px] {$$props.class}" 
	{href} 
	this={el}
>
	<slot />
</svelte:element>
