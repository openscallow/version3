<script lang='ts'>
    import type { resolve } from "path";

/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 17/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 17/12/2025
 * Last change: refactored whole Button Element Now it support Loading state 
 * 
*/

let {
    children = null, // Allows passing icons or custom text
    buttonName = "Button Name",
    color = "white",
    backgroundColor = "#24a0ed",
    activeColor = "#1a7ab8", // New prop for click state
    width = "100%",
    spinnerSize = "18px", // Dynamic spinner size
    spinnerColor = "white", // Dynamic spinner color
    onclick = async () => {}
} = $props();

let isLoading = $state(false);

async function handlePointerClick(e: MouseEvent) {
    if (isLoading) return;
    isLoading = true;
    
    try {
        await onclick(e);
    } finally {
        isLoading = false;
    }
    }
</script>

<button 
    class:button--loading={isLoading}
    style:--btn-width={width} 
    style:--btn-color={color} 
    style:--btn-bg={backgroundColor} 
    style:--btn-active-bg={activeColor}
    style:--spinner-size={spinnerSize}
    style:--spinner-color={spinnerColor}
    onclick={handlePointerClick}
    disabled={isLoading}
>
    <span class="button__text">
        {#if children}
            {@render children()}
        {:else}
            {buttonName}
        {/if}
    </span> 
</button>

<style>
    button {
        /* Use CSS variables with fallbacks */
        width: var(--btn-width);
        color: var(--btn-color);
        background-color: var(--btn-bg);
        
        padding: 1rem;
        outline: none;
        border: none;
        position: relative;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s, opacity 0.2s;
    }

    button:disabled {
        cursor: not-allowed;
        opacity: 0.8;
        background-color: var(--color-auth-cta-disabled);
    }

    /* Dynamic Active State */
    button:active:not(:disabled) {
        background-color: var(--btn-active-bg);
    }

    .button__text {
        transition: all 0.2s;
        display: inline-block;
        font-size: var(--font-size-button);
        font-weight: var(--font-weight-button);
        font-family: var(--font-family-button);
    }

    .button--loading .button__text {
        opacity: 0;
        visibility: hidden;  
    }

    /* Dynamic Spinner using CSS Variables */
    .button--loading::after {
        content: '';
        width: var(--spinner-size);
        height: var(--spinner-size);
        position: absolute;
        inset: 0;
        margin: auto;
        border: 2.5px solid transparent;
        border-top-color: var(--spinner-color);
        border-left-color: var(--spinner-color);
        border-right-color: var(--spinner-color);
        border-radius: 50%;
        animation: button-loading-spinner 0.8s linear infinite;
    }

    @keyframes button-loading-spinner {
        from { transform: rotate(0turn); }
        to { transform: rotate(1turn); }
    }
</style>