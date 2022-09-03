<script lang="ts">
	import "$lib/styles/fonts.css"
	import "$lib/styles/tailwind.css"
	import { invalidateAll  } from "$app/navigation";
	import Logo from "$components/icons/logo.svelte"
	import type { LayoutData } from "./$types"
	import { page } from "$app/stores";

	export let data: LayoutData
	$: src = data.theme === "dark" ? "/sun.svg" : '/moon.svg'
	$: alt = data.theme === "dark" ? "swap to light theme" : 'swap to dark theme'

	const onClick = async () => {
		await fetch("/theme", {
			method: "POST"
		})

		invalidateAll()
	}
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

<div class="contents" class:dark={data.theme === "dark"}>
	<nav class="h-[96px] bg-white dark:bg-grey-500 grid grid-cols-[repeat(2,max-content),1fr,max-content] items-center gap-4 px-8 text-[black] dark:text-white">
		<a href="/">
			<Logo />
		</a>

		<div class="w-[1px] bg-grey-200 dark:bg-grey-400 h-full"></div>

		<h1 class="capitalize text-heading-xl">
			{$page.url.pathname.includes("login") ? 'Login' : 'Sign-up'}
		</h1>

		<button on:click={onClick}>
			<img {src} {alt}>		
		</button>
	</nav>

	<main class="h-[calc(100vh-96px)] grid">
		<slot />
	</main>
</div>
