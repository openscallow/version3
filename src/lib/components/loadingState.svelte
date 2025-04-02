<script lang="ts">

    let { 
        isLoading, 
        loadingMessage, 
        hasError, 
        errorMessage, 
        retryFunction} = $props();

</script>

{#if isLoading}
    <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>{loadingMessage}</p>
    </div>
{:else if hasError}
    <div class="error-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{errorMessage}</p>
        {#if retryFunction}
            <button class="retry-button" onclick={retryFunction}>Retry</button>
        {/if}
    </div>
{/if}

<style>
    /* Common styles */
    .loading-state, .error-state {
        padding: 40px 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #9ca3af;
    }
    
    /* Loading spinner */
    .loading-spinner {
        width: 36px;
        height: 36px;
        border: 3px solid rgba(74, 125, 252, 0.2);
        border-top-color: #4a7dfc;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Error state */
    .error-state svg {
        width: 40px;
        height: 40px;
        color: #9ca3af;
        margin-bottom: 16px;
    }
    
    .error-state p {
        font-size: 0.95rem;
        color: #6b7280;
        margin: 0;
    }
    
    .retry-button {
        margin-top: 16px;
        padding: 8px 16px;
        background-color: #f0f7ff;
        color: #4a7dfc;
        border: none;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
    }
    
    .retry-button:hover {
        background-color: #e1ecff;
    }
</style>