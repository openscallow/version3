<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import {productDatabase} from '$lib/json/product.js'

  let orders = [];

  onMount(async () => {
    if (browser) {
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
 

  <div class="card-wrapper">
    <div class="product-card">
      <img class="product-image" src={productDatabase[order.productx].img} alt="Product Image" />
      <div class="product-info">
        <h3 class="product-name">{productDatabase[order.productx].name}</h3>
        <p class="product-details">Items: {order.product}</p>
        
        <p class="product-details">School/College: {order.address}</p>
        <p class="product-details">index: {order.productx}</p>
        <p class="product-total">Total: {order.product * productDatabase[order.productx].currentPrice} rupees</p>
        <div class="button-container">
          <button class="btn btn-cancel" on:click={() => handleCancelClick(order.id)}>Cancel</button>
          <button class="btn btn-buy" on:click={() => handleBuyClick(order.productx)}>Buy Again</button>
        </div>
      </div>
    </div>
    </div>
    {/if}
  {/each}

  {#each orders as order}
  {#if order.status === "complete"}
 

  <div class="card-wrapper">
    <div class="product-card">
      <img class="product-image" src={productDatabase[order.productx].img} alt="Product Image" />
      <div class="product-info">
        <h3 class="product-name">{productDatabase[order.productx].name}</h3>
        <p class="product-details">Items: {order.product}</p>
        
        <p class="product-details">School/College: {order.address}</p>
        <p class="product-details">index: {order.productx}</p>
        <p class="product-total">Total: {order.product * productDatabase[order.productx].currentPrice} rupees</p>
        <div class="button-container"> 
          
          <button class="btn btn-buy" on:click={() => handleBuyClick(order.productx)}>Buy Again</button>
        </div>
      </div>
    </div>
    </div>
    {/if}
  {/each} 
</main>






   <style>
    .card-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      /* min-height: 100vh; */
      padding: 20px;
      box-sizing: border-box;
    }
  
    .product-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 300px;
      transition: transform 0.3s ease;
    }
  
    .product-card:hover {
      transform: translateY(-5px);
    }
  
    .product-image {
      width: 100%;
      /* height: 200px; */
      /* object-fit: cover; */
    
    }
  
    .product-info {
      padding: 20px;
    }
  
    .product-name {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 10px;
    }
  
    .product-details {
      font-size: 14px;
      color: #666;
      margin: 5px 0;
    }
  
    .product-total {
      font-size: 16px;
      font-weight: bold;
      color: #e53935;
      margin: 10px 0;
    }
  
    .button-container {
      display: flex;
      justify-content:space-around;
      align-items: center;
      margin-top: 15px;
    }
  
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: opacity 0.3s ease;
    }
  
    .btn-cancel {
      background-color: transparent;
      color: #007185;
      text-decoration: underline;
      padding: 0;
      margin-right: 10px;
    }
  
    .btn-cancel:hover {
      opacity: 0.7;
    }
  
    .btn-buy {
      background-color: #FFD814;
      border-color: #FCD200;
      color: #0F1111;
    }
  
    .btn-buy:hover {
      background-color: #F7CA00;
    }
  </style>