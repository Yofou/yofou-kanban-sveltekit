<script lang="ts">
	import "$styles/tailwind.css"
	import "$styles/fonts.css"
	import type { LayoutData } from "./$types"

	export let data: LayoutData.auth
</script>

<svelte:head>
	<svelte:element this="style">
		{#if data.theme === "dark"}
			body {'{'}
				background: #20212C;
			{'}'}
		{:else}
			body {'{'}
				background: #F4F7FD;
			{'}'}
		{/if}
	</svelte:element>
</svelte:head>

<slot />
