<script>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: initial file
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 11/12/2025
 * Last change: Replaced the old relative app.css import with the new alias-based @styles import.
 * 
*/

import '@styles';
import Navbar from '$lib/components/navbar.svelte';
import Footer from '$lib/components/svelte/footer.svelte';
import { visit } from '$lib/analytics/core/visits';
import { onMount } from 'svelte';

    
/**
 * @typedef {Object} Props
 * @property {import('svelte').Snippet} [children]
*/

/** @type {Props} */

let { children } = $props();

onMount(()=>{visit()})

</script>
<Navbar />

<div style="padding-bottom: 5rem;">
{@render children?.()}
</div>

<Footer />

