<script>
	import Navbar from '$lib/components/navbar.svelte';
	import '../../app.css';
	import Footer from '$lib/components/svelte/footer.svelte'
	
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>
<Navbar />

<div style="padding-bottom: 5rem;">
{@render children?.()}
</div>

<Footer />

