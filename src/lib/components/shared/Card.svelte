<script lang="ts">
//----------------------------------------------------------------------------------------------------------
// Created by: Created by: Gautam mer (CEO)
// Created at: 11/01/2026
//
// Last edit by: Gautam mer (CEO)
// Edited at: 11/01/2026
// Last change: initialize
//----------------------------------------------------------------------------------------------------------
import type { Snippet } from 'svelte';

interface Props {
    children?: Snippet,
    padding?: string,
    boxShadow?: string,
    background?: string,
}

let {children, padding="0rem", boxShadow="none", background="none"}: Props = $props()
</script>

<div class="card" 
     style:background
     style:padding
     style:box-shadow={boxShadow}>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .card {
        border-radius: var(--radius-md);
        width: 100%;
    }
</style>