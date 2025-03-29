<script lang="ts">
    import type { Snippet } from 'svelte';
    import { fetchNotifications, type FetchNotificationsParams, type Notification } from '$lib/utils/fetchNotifications';
    import { patchNotifications } from '$lib/utils/patchNotifications';
    import { customerId } from '$lib/utils/customerCorrelated';
    import { onMount } from 'svelte';
    import { fade, slide, fly } from 'svelte/transition';
    
    let notifications: Notification[] = $state([]);
    let isLoading: boolean = $state(true);
    let error: string = $state('');
    let activeNotification: Notification | null = $state(null);

    // Fetch notifications for customer and handle loading state
    onMount(async () => {
        try {
            notifications = await getNotifications(customerId()) ?? [];
        } catch (err) {
            error = (err as Error).message;
        } finally {
            isLoading = false;
        }
    });

    async function getNotifications(customerId: string) {
        try {
            const notifications = await fetchNotifications({
                baseUrl: '/api/notifications',
                customerId: customerId
            });
            return notifications; 
        } catch (err) {
            console.error('Error:', (err as Error).message);
            throw err;
        }
    }

    async function showMessage(notification: Notification, index: number) {
        activeNotification = notification;
        
        // Mark as read in UI immediately for better UX
        if (notifications[index].status === 'unread') {
            notifications[index].status = 'read';
        }
        
        // Send update to server
        try {
            await patchNotifications({
                baseUrl: '/api/notifications',
                notificationIds: [notification.id]
            });
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    }
    
    function closeModal() {
        activeNotification = null;
    }
    
    // Get notification date in readable format
    function formatDate(dateString: string): string {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    
    // Format time ago (e.g., "2 hours ago", "3 days ago")
    function timeAgo(dateString: string): string {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval === 1 ? '1 year ago' : `${interval} years ago`;
        }
        
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval === 1 ? '1 month ago' : `${interval} months ago`;
        }
        
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval === 1 ? 'yesterday' : `${interval} days ago`;
        }
        
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
        }
        
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
        }
        
        return 'just now';
    }
</script>

{#snippet NotificationItem(notification: Notification, index: number)}
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="notification-item {notification.status === 'unread' ? 'unread' : ''}"
        onclick={() => showMessage(notification, index)}
        onkeydown={(e) => e.key === 'Enter' && showMessage(notification, index)}
        tabindex="0"
        transition:slide={{ duration: 200 }}
    >
        <div class="notification-icon">
            {#if notification.status === 'unread'}
                <span class="unread-indicator"></span>
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
        </div>
        <div class="notification-content">
            <h3 class="notification-title">{@html notification.title}</h3>
            {#if notification.created_at}
                <span class="notification-date">{timeAgo(notification.created_at)}</span>
            {/if}
        </div>
    </div>
{/snippet}

<div class="notifications-container">
    <h2 class="notifications-header">Notifications</h2>
    
    {#if isLoading}
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading notifications...</p>
        </div>
    {:else if error}
        <div class="error-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
            <button class="retry-button" onclick={() => location.reload()}>Retry</button>
        </div>
    {:else if notifications.length === 0}
        <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                <line x1="6" y1="2" x2="18" y2="19"></line>
            </svg>
            <h3>No Notifications</h3>
            <p>You don't have any notifications at the moment.</p>
        </div>
    {:else}
        <div class="notifications-list">
            {#each notifications as notification, index}
                {@render NotificationItem(notification, index)}
            {/each}
        </div>
    {/if}
</div>

{#if activeNotification}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" onclick={closeModal} transition:fade={{ duration: 200 }}>
        <div class="modal-content" transition:fly={{ y: 20, duration: 300 }}>
            <div class="modal-header">
                <div class="modal-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="modal-title">{@html activeNotification.title}</h3>
                    {#if activeNotification.created_at}
                        <p class="modal-date">{formatDate(activeNotification.created_at)} · {timeAgo(activeNotification.created_at)}</p>
                    {/if}
                </div>
                <button class="close-button" onclick={closeModal} aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                {@html activeNotification.message}
            </div>
            <div class="modal-footer">
                <button class="secondary-button" onclick={closeModal}>Dismiss</button>
            </div>
        </div>
    </div>
{/if}

<style>

    /* Main container */
    .notifications-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #1f2937;
    }
    
    .notifications-header {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 20px;
        color: #111827;
    }
    
    /* Notification list */
    .notifications-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    /* Individual notification */
    .notification-item {
        display: flex;
        align-items: flex-start;
        padding: 16px;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
    }
    
    .notification-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transform: translateY(-2px);
    }
    
    .notification-item.unread {
        background-color: #f0f7ff;
    }
    
    .notification-icon {
        position: relative;
        margin-right: 16px;
        color: #4a7dfc;
        height: 36px;
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eef4ff;
        border-radius: 50%;
        flex-shrink: 0;
    }
    
    .notification-icon svg {
        width: 20px;
        height: 20px;
    }
    
    .unread-indicator {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 10px;
        height: 10px;
        background-color: #e53e3e;
        border-radius: 50%;
        border: 2px solid white;
    }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-title {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #374151;
    }
    
    .notification-date {
        display: block;
        font-size: 0.85rem;
        color: #6b7280;
        margin-top: 6px;
    }
    
    /* Empty state */
    .empty-state, .error-state, .loading-state {
        padding: 40px 20px;
        text-align: center;
        background-color: #f9f9f9;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .empty-state svg, .error-state svg {
        width: 40px;
        height: 40px;
        color: #9ca3af;
        margin-bottom: 16px;
    }
    
    .empty-state h3, .error-state h3 {
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: #4b5563;
    }
    
    .empty-state p, .error-state p {
        font-size: 0.95rem;
        color: #6b7280;
        margin: 0;
    }
    
    /* Loading state */
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
    
    /* Modal - Modernized */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 50;
        padding: 20px;
    }
    
    .modal-content {
        background-color: white;
        border-radius: 16px;
        width: 100%;
        max-width: 500px;
        max-height: 90vh;
        overflow: hidden;
        position: relative;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 25px 50px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
    }
    
    .modal-header {
        padding: 24px 24px 16px;
        display: flex;
        align-items: flex-start;
        gap: 16px;
        position: relative;
        border-bottom: 1px solid #f3f4f6;
    }
    
    .modal-icon {
        color: #4a7dfc;
        height: 42px;
        width: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eef4ff;
        border-radius: 12px;
        flex-shrink: 0;
    }
    
    .modal-icon svg {
        width: 24px;
        height: 24px;
    }
    
    .close-button {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;
    }
    
    .close-button svg {
        width: 18px;
        height: 18px;
    }
    
    .close-button:hover {
        background-color: #f3f4f6;
        color: #4b5563;
    }
    
    .modal-title {
        margin: 0 0 6px;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
        padding-right: 24px;
    }
    
    .modal-date {
        margin: 0;
        font-size: 0.85rem;
        color: #6b7280;
    }
    
    .modal-body {
        padding: 20px 24px;
        color: #4b5563;
        line-height: 1.6;
        overflow-y: auto;
        flex: 1;
    }
    
    .modal-body p {
        margin-top: 0;
        margin-bottom: 16px;
    }
    
    .modal-body p:last-child {
        margin-bottom: 0;
    }
    
    .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #f3f4f6;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
    }
    
    .primary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #4a7dfc;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background-color 0.2s;
        text-decoration: none;
    }
    
    .primary-button:hover {
        background-color: #3b6cdf;
    }
    
    .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #f3f4f6;
        color: #4b5563;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .secondary-button:hover {
        background-color: #e5e7eb;
        color: #374151;
    }
</style>