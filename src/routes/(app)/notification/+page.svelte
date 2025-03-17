<script lang="ts">
    import '@tailwind';
    import type { Snippet } from 'svelte';
    import {fetchNotifications, type FetchNotificationsParams, type Notification} from '$lib/utils/fetchNotifications'
    import {patchNotifications} from '$lib/utils/patchNotifications'
    import {customerId} from '$lib/utils/customerCorrelated'
    import { onMount } from 'svelte'
    
    let notifications: Notification[] = $state([]);
    let isLoading: boolean = $state(true);
    let error: string = $state('');

    // Fetch notifications for customer and handle loading state
    onMount(async ()=>{
        try {
            notifications = await getNotifications(customerId()) ?? [];
        } catch (error) {
            error = (error as Error).message;
        } finally {
            isLoading = false;
        }
    })

    async function getNotifications(customerId: string) {
        try {
            const notifications = await fetchNotifications({
                baseUrl: '/api/notifications',
                customerId: customerId
            });
            return notifications; 
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    }

    async function showMessage(index: number) {
        if (typeof window !== 'undefined' && window.localStorage) {

            const titleElement = document.getElementById('title');
            if(titleElement){
                titleElement.innerHTML = notifications[index].title;
            }
            
            const messageElement = document.getElementById('message');
            if(messageElement){
                messageElement.innerHTML = notifications[index].message;
            }

            const dialog = document.getElementById('my_modal_5') as HTMLDialogElement;
            if(dialog){
                dialog.showModal();
            }

            let updateStatus = await patchNotifications({
                baseUrl: '/api/notifications',
                notificationIds: [notifications[index].id]
            });

        }

    }
</script>
{#snippet Notification(notification: Notification, index: number)}
<button type="button" class="flex w-full items-start gap-4 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg" onclick={()=>showMessage(index)}>
    <img 
        src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-50-discount-speed-style-shape-png-image-png-image_7886991.png" 
        class="h-12 w-12 rounded-full" 
        alt="temporary"
    >
    <div>
        <p class=" line-clamp-2">{@html notification.title}</p>
    </div>
</button>
{/snippet}
<div class="mx-auto max-w-2xl p-4">
    {#if notifications}
        <div class="space-y-4">

            {#each notifications as notification, index}
            {#if notification.status === 'unread'}
            <div class="indicator w-full">
                <span class="indicator-item indicator-center badge badge-primary">new</span>
                {@render Notification(notification, index)}
              </div>
            {:else}
                {@render Notification(notification, index)}
            {/if}

            {/each}

        </div>
    {:else}
        <div class="rounded-lg bg-gray-50 py-12 text-center">
            <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-700">No notifications</h2>
            </div>
        </div>
    {/if}
</div>

<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold" id="title">Hello!</h3>
    <p class="py-4" id="message">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

