<script lang="ts">
	import { page } from "$app/stores"
	import BoardNavIcon from "$components/icons/board-nav.svelte";
	import type { PageData } from "../../routes/dashboard/$types"

	export let id: PageData["boards"][number]["id"]
	$: isActive = $page.url.pathname.includes(id)
</script>

<a href="/dashboard/boards/{id}" class="-ml-6 py-4 text-grey-300 text-heading-m w-full rounded-r-[100px] flex items-center gap-4" class:active={isActive}>
	<BoardNavIcon class="ml-6" />
	<slot />
</a>

<style>
	.active {
		@apply text-white bg-purple-600
	}
</style>
