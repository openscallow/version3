<script lang='ts'>
/**
 * Created by: Gautam mer (CEO)
 * Created at: 17/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 17/12/2025
 * Last change: refactored whole Button Element Now it support Loading state 
 * 
*/
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

interface Props extends Omit<HTMLButtonAttributes, 'onclick'> {
    children?: Snippet;
	variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
	mode?: 'solid' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	isLoading?: boolean; // Allow parent to force loading state
    onclick?: (e: MouseEvent) => void | Promise<void>;
    radius?: string;
    width?: string;
}



let {
    children,
	variant = 'primary',
	mode = 'solid',
	size = 'md',
    radius = '8px',
    width = '100%',
	isLoading = false,
	class: className = '',
	onclick,
	...rest
}: Props = $props();


// let {
//     children = null, // Allows passing icons or custom text
//     buttonName = "Button Name",
//     color = "white",
//     backgroundColor = "#24a0ed",
//     activeColor = "#1a7ab8", // New prop for click state
//     width = "100%",
//     spinnerSize = "18px", // Dynamic spinner size
//     spinnerColor = "white", // Dynamic spinner color
//     onclick = async () => {}
// } = $props();

// let isLoading = $state(false);

// Internal state to track async click actions
let internalLoading = $state(false);

// Derived state: combine external and internal loading
let effectiveLoading = $derived(isLoading || internalLoading);

async function handlePointerClick(e: MouseEvent) {
    // Prevent clicks if already loading or disabled
	if (effectiveLoading || rest.disabled) return;

	// If no onclick handler is passed, just bubble the event
	if (!onclick) return;

	internalLoading = true;
	try {
		await onclick(e);
	} finally {
		internalLoading = false;
	}
}

</script>

<button
    {...rest}
	class="btn {className}"
	class:btn--loading={effectiveLoading}
	data-variant={variant}
	data-mode={mode}
	data-size={size}
    style:--btn-radius = {radius}
    style:width
	onclick={handlePointerClick}
	disabled={effectiveLoading || rest.disabled}
	aria-busy={effectiveLoading}
>
	<span class="btn__content">
		{#if children}
			{@render children()}
		{:else}
			Submit
		{/if}
	</span>

	{#if effectiveLoading}
		<span class="btn__spinner" aria-hidden="true"></span>
	{/if}
</button>

<style>
	/* --- CSS Variables / Design Tokens --- */
	:root {
		--btn-transition: 0.2s ease;
		
		/* Palette - In a real app, these come from your global theme */
		--color-primary: #24a0ed;
		--color-primary-hover: #1a7ab8;
		--color-danger: #ef4444;
		--color-danger-hover: #dc2626;
		--color-neutral: #6b7280;
		--color-neutral-hover: #4b5563;
	}

	.btn {
		/* Layout & Reset */
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent; /* Prepare for outline mode */
		outline: none;
		cursor: pointer;
		font-family: inherit;
		font-weight: 600;
		border-radius: var(--btn-radius);
		transition: all var(--btn-transition);
		overflow: hidden;
	}

	/* --- Sizing Variants --- */
	.btn[data-size='sm'] { padding: 0.4rem 0.8rem; font-size: 0.875rem; }
	.btn[data-size='md'] { padding: 0.75rem 1.5rem; font-size: 1rem; }
	.btn[data-size='lg'] { padding: 1rem 2rem; font-size: 1.125rem; }

	/* --- Accessibility --- */
	.btn:focus-visible {
		box-shadow: 0 0 0 3px rgba(36, 160, 237, 0.4);
	}
	.btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		filter: grayscale(0.2);
	}

	/* --- The "Solid" Mode (Default) --- */
	.btn[data-mode='solid'][data-variant='primary'] {
		background-color: var(--color-primary);
		color: white;
	}
	.btn[data-mode='solid'][data-variant='primary']:hover:not(:disabled) {
		background-color: var(--color-primary-hover);
	}

	.btn[data-mode='solid'][data-variant='danger'] {
		background-color: var(--color-danger);
		color: white;
	}
	.btn[data-mode='solid'][data-variant='danger']:hover:not(:disabled) {
		background-color: var(--color-danger-hover);
	}

	/* --- The "Outline" Mode (Requested Feature) --- */
	.btn[data-mode='outline'] {
		background-color: transparent;
	}
	
	/* Primary Outline */
	.btn[data-mode='outline'][data-variant='primary'] {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.btn[data-mode='outline'][data-variant='primary']:hover:not(:disabled) {
		background-color: rgba(36, 160, 237, 0.1); /* Subtle tint on hover */
	}

	/* Danger Outline */
	.btn[data-mode='outline'][data-variant='danger'] {
		border-color: var(--color-danger);
		color: var(--color-danger);
	}
	.btn[data-mode='outline'][data-variant='danger']:hover:not(:disabled) {
		background-color: rgba(239, 68, 68, 0.1);
	}

	/* --- Loading State Logic --- */
	.btn__content {
		transition: opacity 0.2s;
	}
	
	.btn--loading .btn__content {
		opacity: 0; /* Hide text but keep width to prevent layout shift */
		visibility: hidden;
	}

	.btn__spinner {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 1.25em;
		height: 1.25em;
		border: 2px solid currentColor; /* Inherits text color */
		border-right-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(1turn); }
	}
</style>