<script>
  import '@tailwind'
  import { onMount } from 'svelte'
  import {productDatabase} from '$lib/json/product.js'

  let orders = [];

  onMount(async () => {
      const mobile = localStorage.getItem('mobile');
      if (mobile) {
        try {
          const response = await fetch('/api5', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile }),
          });

          if (response.ok) {
            orders = await response.json();
          } else {
            console.error('Failed to fetch orders');
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    
  });

  function handleCancelClick(product) {
    window.location.href = `./cancel?${product}`;
  }

  function handleBuyClick(productd) {
    window.location.href = `./${productd}`;
  }
</script>

<main>
  {#each orders as order}
  {#if order.status === "pending"}
    <div class="card card-side shadow-sm mx-4 my-4 rounded-md p-4 bg-white">
      <figure class="aspect-[3/4] w-[200px] object-scale-down">
        <img 
          src={productDatabase[order.productx].img}
          alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{productDatabase[order.productx].name}</h2>
        <p class="product-total">Total: {order.product * productDatabase[order.productx].currentPrice} rupees</p>
        <div class="collapse collapse-arrow bg-white w-full">
          <input type="checkbox" name="my-accordion-2" />
          <div class="collapse-title text-xl font-medium"></div>
          <div class="collapse-content ">
            <p class="product-details">Items: {order.product}</p>
            <p class="product-details my-4">School/College: {order.address}</p>
            <div class="card-actions ">
              <button class="btn btn-outline btn-error">Cancel order</button>
            </div>
          </div>
        </div>  
      </div>
    </div>
    {/if}
  {/each}
</main>