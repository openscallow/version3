<script>
import '@styles';
import Navbar from '$lib/components/navbar.svelte';
import Footer from '$lib/components/svelte/footer.svelte';
import { visit } from '$lib/analytics/core/visits';
import { onMount } from 'svelte';
import { setDialogContext } from '$lib/dialog.svelte.ts';

let { children } = $props();

onMount(()=>{visit()})


const dialog = setDialogContext();
let dialogElement = $state();

$effect(() => {
	if (dialog.isOpen) {
		dialogElement?.showModal();
	} else {
		dialogElement?.close();
	}
});
</script>

<svelte:head>
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
  		"@type": "Organization",
  		"name": "Callow",
  		"url": "https://callow.in"
	}
	</script>
</svelte:head>
<Navbar />

<div style="padding-bottom: 5rem;">
{@render children?.()}
</div>

<Footer />

<dialog bind:this={dialogElement} onclose={() => dialog.close()}>
	<div class="wrapper">
		{#if dialog.content}
			{@render dialog.content()}
		{/if}
	</div>
</dialog>
