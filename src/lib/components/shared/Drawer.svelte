<script lang="ts">
import { fly, fade } from 'svelte/transition';

let { isOpen = $bindable(false), children } = $props();


</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div 
		class="backdrop" 
		onclick={()=> isOpen = false} 
		transition:fade={{ duration: 200 }}
		role="button" 
		tabindex="0"
	></div>

	<div 
		class="container"
		transition:fly={{ y: '100%', duration: 300, opacity: 1 }}
	>
		<div class="handle-wrapper">
			<div class="handle"></div>
		</div>

		<div class="content">
			{@render children?.()}
		</div>
	</div>
{/if}

<style>
	/* --- Your Provided CSS --- */
	.container {
		position: absolute;
		bottom: 0;
		z-index: 999;

		/* Layout & Styling */
		left: 0;
		width: 100%;
		max-height: 85vh;
		background-color: white;
		border-top-left-radius: 1.5rem;
		border-top-right-radius: 1.5rem;
		box-shadow: 0 -10px 25px rgba(0,0,0,0.1);
		display: flex;
		flex-direction: column;
	}

	.backdrop {
		position: absolute;
		inset: 0; /* Shorthand for top/right/bottom/left: 0 */
		background: rgba(0, 0, 0, 0.4);
		z-index: 998; /* Just behind the container */
	}

	.handle-wrapper {
		width: 100%;
		padding: 1rem 0 0.5rem;
		display: flex;
		justify-content: center;
		flex-shrink: 0;
	}

	.handle {
		width: 3rem;
		height: 0.25rem;
		background-color: #cbd5e1;
		border-radius: 99px;
	}

	.content {
		padding: 1rem;
		overflow-y: auto;
	}
</style>