<script>
  import '@tailwind'
  import { onMount } from 'svelte'
  import {productDatabase} from '$lib/json/product.js'
  let orders = $state([]);

  onMount(async () => {
      const customer_correlated = JSON.parse(localStorage.getItem('customer_correlated'))
      let i = customer_correlated.i
      if (i) {
        try {
          const response = await fetch('/orderHistory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ i }),
          });

          if (response.ok) {
            let received_datam= await response.json();
            let { data } = received_datam
            orders = data
          } else {
            console.error('Failed to fetch orders');
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    
  });


  async function handelCancel(order_id) {
    console.log(order_id)
    try {
      let response = await fetch('/orderHistory/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({order_id})
      })

      if (response.ok) {
        
          location.reload()
      }
    } catch (error) {
      console.error("something went wrong :", error)
    }
}
</script>

<main>
  {#each orders as order}
    <div class="card card-side shadow-sm mx-4 my-4 rounded-md p-4 bg-white">
      <figure class="aspect-[3/4] w-[200px] object-scale-down">
        <img 
          src={productDatabase[parseInt(order.items_count[0])].img}
          alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{productDatabase[parseInt(order.items_count[0])].name}</h2>
        <p class="product-total">Total: {order.total_amount} rupees</p>
        <div class="collapse collapse-arrow bg-white w-full">
          <input type="checkbox" name="my-accordion-2" />
          <div class="collapse-title text-xl font-medium"></div>
          <div class="collapse-content ">
            <!-- <p class="product-details my-2">order_id: {order.order_id}</p> -->
            <p class="product-details my-2">School/College: {order.institute_name}</p>
            {#if order.discount_amount}
            <p class="product-details my-2">discount: ₹{order.discount_amount}</p>
            {/if} 
            <p class="product-details text-gray-500 my-2">date: {new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hourCycle: 'h12', 
            }).format(new Date(order.created_at))}</p>
            <p class="product-details text-gray-500 my-2">Items: {parseInt(order.items_count[1])}</p>
            <div class="card-actions ">
              <button onclick={()=>{handelCancel(order.order_id)}} class="btn btn-outline btn-error">Cancel order</button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  {/each}
</main>