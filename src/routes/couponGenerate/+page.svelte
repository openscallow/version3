<script lang="ts">
    import '@tailwind'
    let customer_id: string = $state('');

    async function getCoupon() {
        try {
          let response = await fetch(`/couponGenerate/${customer_id}`);  
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            
        }
    }

</script>

<main>
    <h1>Notification Update</h1>
    <div class="join">
      <input class="input join-item" bind:value={customer_id} type="text" placeholder="customer_id id" />
      <button class="btn join-item rounded-r-full" onclick={getCoupon}>Get Notification</button>
    </div>
</main>