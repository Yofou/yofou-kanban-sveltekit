<script lang="ts">
	import Board from "$components/dashboard/board.svelte";
	import NavAside from "$components/dashboard/nav-aside.svelte";
	import TopNav from "$components/dashboard/top-nav.svelte";
	import type { PageData } from "./$types"
	export let data: PageData; 
</script>

<div 
	class="grid overflow-x-hidden w-full h-full min-h-screen grid-rows-[max-content,1fr]" 
	class:dark={data.theme === "dark"}
>
	<NavAside />
	<TopNav />
	<Board />
</div>
