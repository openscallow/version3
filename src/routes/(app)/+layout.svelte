<script>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: initial file
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 23/09/2025
 * Last change: added a visit function to track user visits site-wide instead of on a single page.
 * 
*/

	import Navbar from '$lib/components/navbar.svelte';
	import '../../app.css';
	import Footer from '$lib/components/svelte/footer.svelte';
	import { visit } from '$lib/analytics/core/visits';
    import { onMount } from 'svelte';

    
	
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	onMount(()=>{
        visit()
    })
</script>
<Navbar />

<div style="padding-bottom: 5rem;">
{@render children?.()}
</div>

<Footer />

