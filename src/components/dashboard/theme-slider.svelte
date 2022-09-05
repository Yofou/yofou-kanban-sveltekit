<script>
	import { invalidateAll } from "$app/navigation";

	const onClick = async () => {
		await fetch('/theme',  {
			method: 'POST'
		})	

		invalidateAll()
	}
</script>

<div class="flex justify-center items-center py-[14px] gap-4 bg-grey-100 dark:bg-grey-600 rounded-[6px]">
	<img src="/sun.svg" alt="light theme">
	<button on:click={onClick} class="relative bg-purple-600 w-[40px] h-[20px] rounded-[12px]">
		<div class="w-[14px] h-[14px] transition-all absolute top-1/2 -translate-y-1/2 dark:-translate-x-full left-[3px] dark:left-[calc(100%-3px)] bg-white rounded-full" />
	</button>
	<img src="/moon.svg" alt="dark theme">
</div>
