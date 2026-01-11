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
    padding?: string
}

let {children, padding="1rem"}: Props = $props()
</script>

<div class="card" style:padding>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .card {
        border-color: black;
        border-width: 1px;
        border-radius: var(--radius-md);
    }
</style>