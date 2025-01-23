<script lang="ts">
    import {fetchNotifications} from '$lib/utils/fetchNotifications'

async function getNotifications() {
    console.log("Fetching notifications...");
    try {
        const notifications = await fetchNotifications({
            baseUrl: '/api/notifications',
            customerId: 'abc@xyz',
            status: 'unread',
        });
        console.log(notifications);
    } catch (error) {
        console.error('Error:', (error as Error).message);
    }
}

getNotifications();
</script>

