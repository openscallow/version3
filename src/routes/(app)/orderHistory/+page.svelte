<script>
  import { onMount } from 'svelte';
  import OrderCard from './OrderCard.svelte';
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
    <OrderCard 
          productId={order.items_count[0]}
          productName={order.productName} 
          total={order.total_amount} 
          instituteName={order.institute_name} 
          discount={order.discount_amount}
          qunatity={order.items_count[1]}
          order_id={order.order_id}
          />
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