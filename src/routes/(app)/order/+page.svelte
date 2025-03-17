<script>
    import  Progress from '$lib/components/step-progressbar.svelte';
    import Delivery from '$lib/components/delivery.svelte';

   
    
    let prodcutObj =JSON.parse(sessionStorage.getItem("userData"));
    const userAddress = localStorage.getItem('userAddress');

    
</script>
<Progress />
{#if prodcutObj}

 <Delivery shippingAddress={userAddress}
          items={prodcutObj.items} 
          currentPrice={prodcutObj.currentPrice} 
          previousPrice={prodcutObj.previousPrice}/> 
{/if}
