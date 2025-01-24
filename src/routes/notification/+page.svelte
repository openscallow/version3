<script lang="ts">
    import {fetchNotifications} from '$lib/utils/fetchNotifications'
    import {patchNotifications} from '$lib/utils/patchNotifications'
    import {customerId} from '$lib/utils/customerCorrelated'
    import { onMount } from 'svelte'
    import '@tailwind'
    let notifications = $state();
    
    onMount(async ()=>{
        notifications = await getNotifications(customerId());
        console.log(notifications);
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
            console.log(index);
            document.getElementById('title').innerHTML = notifications[index].title;
            document.getElementById('message').innerHTML = notifications[index].message;
            
            if(notifications[index].metadata){
                console.log(notifications[index].metadata.link);
            }
            document.getElementById('my_modal_5').showModal();

            let updateStatus = await patchNotifications({
                baseUrl: '/api/notifications',
                notificationIds: [notifications[index].id]
            });
            
        }
        
    }
</script>
{#snippet Notification(notification, index)}
<div class="flex items-start gap-4 rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg" onclick={()=>showMessage(index)}>
    <img 
        src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-50-discount-speed-style-shape-png-image-png-image_7886991.png" 
        class="h-12 w-12 rounded-full" 
        alt="temporary"
    >
    <div>
        <p class=" line-clamp-2">{@html notification.title}</p>
        <!-- <p class="mt-1 text-gray-600 line-clamp-2">{@html notification.message}</p> -->
    </div>
</div>
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
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>