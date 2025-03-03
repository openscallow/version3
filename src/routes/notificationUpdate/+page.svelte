<script lang="ts">
    import '@tailwind'
    import {fetchNotifications, type FetchNotificationsParams, type Notification} from '$lib/utils/fetchNotifications'
    
    let customer_id: string = $state('');
    let notifications: Notification[] = $state([]);
    
    // Add form data state
    let formData = $state({
        customerId: '',
        title: '',
        message: '',
        type: ''
    });

    async function getNotification() {
        console.log('customer_id:', customer_id);
        try {
            const params: FetchNotificationsParams = {
                baseUrl: '/api/notifications',
                customerId: customer_id,
            };
            notifications = await fetchNotifications(params);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    }

    // Add createNotification function
    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        
        try {
            const response = await fetch('/notificationUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create notification');
            }

            const result = await response.json();
            console.log('Notification created:', result);
            
            // Reset form
            formData = {
                customerId: '',
                title: '',
                message: '',
                type: ''
            };

            alert('Notification created successfully');
            
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    }
</script>

<main>
  <h1>Notification Update</h1>
  <div class="join">
    <input class="input join-item" bind:value={customer_id} type="text" placeholder="customer_id id" />
    <button class="btn join-item rounded-r-full" onclick={getNotification}>Get Notification</button>
  </div>

    <div class="notification-list">
        {#each notifications as notification}
        <div class="collapse bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <div class="collapse-title font-semibold">{notification.title}</div>
            <div class="collapse-content text-sm">
              Body : {notification.message} <br><br>
              status : {notification.status} <br><br>
              created_at : {notification.created_at} <br><br>
              metadata : {notification.metadata}
            </div>
        </div>
        {/each}
    </div>

    <h1>Create new Notification</h1>
    <form class="flex flex-col gap-4" onsubmit={handleSubmit}>
        <div class="form-control">
            <span class="label">Customer ID</span>
            <input 
                type="text" 
                class="input input-bordered" 
                placeholder="Enter customer ID"
                bind:value={formData.customerId}
                required
            />
        </div>
        <div class="form-control">
            <span class="label">Title</span>
            <input 
                type="text" 
                class="input input-bordered" 
                placeholder="Enter notification title"
                bind:value={formData.title}
                required
            />
        </div>
        <div class="form-control">
            <span class="label">Message</span>
            <textarea 
                class="textarea textarea-bordered" 
                placeholder="Enter notification message"
                bind:value={formData.message}
                required
            ></textarea>
        </div>
        <div class="form-control">
            <span class="label">Type</span>
            <select 
                class="select select-bordered"
                bind:value={formData.type}
                required
            >
                <option value="">Select type</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Create Notification</button>
    </form>
</main>