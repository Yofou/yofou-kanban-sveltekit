<script lang="ts">
	export let type: "text" | "password" = "text"
	export let value = ""
	export let name: string | undefined = undefined
	export let error: string | undefined = undefined
	export let showError: boolean = false
</script>

<label class="flex flex-col gap-2 text-grey-400 dark:text-white text-body-m {$$props.class ?? ''}">
	{#if !!error && showError}
		<p class="flex justify-between">
			<slot />
			<span class="text-red-600 text-body-m">{error}</span>
		</p>
	{:else}
		<slot />
	{/if}

	<input 
		class="px-4 py-2 text-body-l rounded-[4px] border-[#828FA3]/25 outline-none focus:outline-none focus:border-purple-600 bg-[transparent] border"
		class:border-red-600={!!error && showError}
		{name}
		{type}
		{value}
		on:input={({ currentTarget }) => value = currentTarget.value}
	>
</label>
