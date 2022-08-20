<script lang="ts">
	import { page  } from "$app/stores"
</script>

<nav class="h-[96px] bg-grey-500 grid grid-cols-[max-content,1fr,max-content]">
	{$page.url.pathname.includes('login') ? "login" : 'sign-up'}
</nav>

<main>
	<slot />
</main>
