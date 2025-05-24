<script lang="ts">
    import { onMount } from 'svelte';
    import { CircleCheck, AlertTriangle, AlertCircle, X } from 'lucide-svelte';
    
    onMount(()=>{
    })
    
    let { type = 'success', title, message } = $props();
    
    // Icon mapping based on type
    const iconMap: any = {
        success: CircleCheck,
        warning: AlertTriangle,
        alert: AlertCircle,
        error: X
    };
    
    // Color mapping based on type  
    const colorMap: any = {
        success: '#22c55e',
        warning: '#f59e0b', 
        alert: '#3b82f6',
        error: '#ef4444'
    };
    
    let IconComponent = iconMap[type];
    let iconColor = colorMap[type];
</script>

<div class="toast-container" data-type={type}>
    <IconComponent color={iconColor}/>
    <div class="toast-content">
        {#if title}
            <p class="toast-title">{title}</p>
        {/if}
        <p class="toast-message">{message}</p>
    </div>
</div>

<style>
    .toast-container {
        margin: 1rem;
        padding: 0.75rem 1rem;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        position: sticky;
        top: 10px;
        z-index: 1000;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-left: 4px solid;
        max-width: 400px;
    }
    
    .toast-container[data-type="success"] {
        border-left-color: #22c55e;
        background-color: #f0fdf4;
    }
    
    .toast-container[data-type="warning"] {
        border-left-color: #f59e0b;
        background-color: #fffbeb;
    }
    
    .toast-container[data-type="alert"] {
        border-left-color: #3b82f6;
        background-color: #eff6ff;
    }
    
    .toast-container[data-type="error"] {
        border-left-color: #ef4444;
        background-color: #fef2f2;
    }
    
    .toast-content {
        flex: 1;
        min-width: 0;
    }
    
    .toast-title {
        margin: 0 0 0.25rem 0;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.25;
        color: #374151;
    }
    
    .toast-message {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.4;
        color: #6b7280;
    }
</style>