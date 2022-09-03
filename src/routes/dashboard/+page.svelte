<script lang="ts">
	import TopNav from "$components/dashboard/top-nav.svelte";
	import type { PageData } from "./$types"
	export let data: PageData; 
</script>

<div class:dark={data.theme === "dark"}>
	<TopNav />
	<aside></aside>
	<main></main>
</div>
