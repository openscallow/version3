<script>
  import { onMount } from 'svelte';
  import OrderCard from './OrderCard.svelte';
  import OrderCart from './OrderCart.svelte';
  import { customerId } from '$lib/components/ts/customer_correlated.svelte';
  import { getCustomerOrders } from '$lib/components/ts/getCustomerOrders';
  
  let isLoading = $state(true);
  let orders = $state([]);
  let error = $state();

  onMount(async ()=>{
    try {
      orders = await getCustomerOrders(customerId(), 'Pending')
    } catch (e) {
      console.log(e);
      error = e
    }  
  })
</script>
<main>
  {#each orders as order}
    {#if order.cart_id}
      <OrderCart 
      cart_id={order.cart_id}
      total={order.total_amount} 
      instituteName={order.institute_name} 
      discount={order.discount_amount}
      order_id={order.order_id}/>
    {:else}
      <OrderCard 
      productId={order.items_count[0]}
      productName={order.productName} 
      total={order.total_amount} 
      instituteName={order.institute_name} 
      discount={order.discount_amount}
      qunatity={order.items_count[1]}
      order_id={order.order_id}/>
    {/if}
  {/each}
</main>

<style>
  main{
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
</style>