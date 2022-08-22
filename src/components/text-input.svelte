<script lang="ts">
	export let type: "text" | "password" = "text"

	export let value = ""
</script>

<label class="flex flex-col gap-2 text-grey-400 dark:text-white text-body-m {$$props.class ?? ''}">
	<slot />

	<input 
		class="px-4 py-2 text-body-l rounded-[4px] border-[#828FA3]/25 outline-none focus:outline-none focus:border-purple-600 bg-[transparent] border"
		{type}
		{value}
		on:input={({ currentTarget }) => value = currentTarget.value}
	>
</label>
