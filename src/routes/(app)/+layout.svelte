<script>
	import Navbar from '$lib/components/navbar.svelte';
	import '../../app.css'
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>
<Navbar />

{@render children?.()}

