<script lang="ts">
/**
 * Created by: Gautam mer (CEO)
 * Created at: Initial
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 31/12/2025
 * Last change: removing redundant relative item code
*/
import ProductCarousel from '$lib/components/features/product-detail-page/ProductCarousel.svelte';

  import { onMount } from 'svelte';
  import { addToRecentlyViewed } from '$lib/components/recentlyViewed/recentView.js';
  import '../../../../../app.css';
  import './product.css';
  import minus from '$lib/images/icon-minus.svg';
  import plus from '$lib/images/icon-plus.svg';
  import Slider from '$lib/components/productSlider/slider.svelte';
  import '@tailwind'
  import GetCoin from '$lib/components/getCoin/getCoin.svelte';
  import { handleCartInsert } from './handleCartInsert';
  import { updateViewCount } from './updateViewCount'
  import { customerId } from '$lib/components/ts/customer_correlated.svelte'
  import { browsingHistory } from './browsingHistory';
  import CoreDetails from './components/CoreDetails.svelte';

  let { data } = $props();
 
  
  // Map new data structure to existing variable names
  let productName = data.productName;
  let currentPrice = data.currentPrice;
  let previousPrice = data.mrp;
  let images = [...data.images];

  
  //Product Quantity Management
  let productQuantity = $state(1);
  
  function incrementQuantity() {
    if(productQuantity >= 10) {
      productQuantity = 10; // Limit to a maximum of 10
      return;
    }
    productQuantity += 1;
  }
 
  function decrementQuantity() {
    if (productQuantity > 1) {
      productQuantity -= 1;
    }
  }

  /**
   * Order Management Module
   * ---------------------
   * Key Features:
   * - Validates and structures order data
   * - Preserves order information across sessions
   * - Smart redirection based on authentication status
   * - Error handling and fallback mechanisms
   * 
   * Flow:
   * 1. Order data is created and structured
   * 2. Order is temporarily saved to session storage
   * 3. User is redirected based on login status:
   *    - Logged in → Checkout page
   *    - Not logged in → Sign up page
   * 
   * Note: This module assumes the existence of required product data
   * and authentication status indicators in local storage.
   */
  let potentialCoin = $state(0);
  type OrderData = {
    id: string;
    name: string;
    quantity: number;
    currentPrice: number;
    actualPrice: number;
    coins_earned: number | 0;
  };

  function createOrderData(): OrderData {
    return {
      id: data._id,
      name: productName,
      quantity: productQuantity,
      currentPrice: currentPrice,
      actualPrice: previousPrice,
      coins_earned: potentialCoin,
    };
  }

  function saveOrderToSession(orderData: OrderData) {
    try {
      sessionStorage.setItem('pending_order', JSON.stringify(orderData));
    } catch (error) {
      console.error('Failed to save order to session storage:', error);
      // Handle error appropriately
    }
  }

  function redirectToCheckout() {
    try {
      const isCustomerLoggedIn = localStorage.getItem('customer_correlated') !== null;
      const redirectPath = isCustomerLoggedIn ? '/checkout' : '/signUp';
      window.location.href = redirectPath;
    } catch (error) {
      console.error('Failed to redirect:', error);
      // Provide fallback behavior
    }
  }

  function placeOrder() {
    const potentialCoinElement = document.getElementById('potentialCoin');
    potentialCoin = potentialCoinElement ? parseInt(potentialCoinElement.innerText) || 0 : 0;
    try {
      const orderData = createOrderData();
      saveOrderToSession(orderData);
      redirectToCheckout();
    } catch (error) {
      console.error('Failed to place order:', error);
      // Show user-friendly error message
    }
  }
 
  //update recently viewed 
  onMount(() => {
    addToRecentlyViewed({
      id: data._id,
      name: productName,
      image: images[0], // Using first image as thumbnail
      price: currentPrice,
    });

    try {
      updateViewCount(data._id)
    } catch (error) {
      console.log("updating product does not work")
    }

    if(customerId()){
      browsingHistory(data._id, productName)
    }
  });

  let thumbImage = images[0]; // Using first image as thumbnail

  async function generateInquiry() {
    try {
      const isCustomerLoggedIn = localStorage.getItem('customer_correlated') !== null;
      const redirectPath = isCustomerLoggedIn ? `./${data._id}/notify` : '/signUp';
      window.location.href = redirectPath;
    } catch (error) {
      console.error('Failed to redirect:', error);
      // Provide fallback behavior
    }
  }

</script>

<main class="main">
<section class="product-wrapper">
  <div class="container">
    <div class="product-images-wrapper">
      <div class="preview-image-wrapper">
        <Slider {images} height="400px" />
      </div>

      <div class="thumbs-wrapper hide-for-mobile">
        <div class="thumb-image active">
          <img src={thumbImage} alt="Product Thumb" />
        </div>
        <div class="thumb-image">
          <img src={thumbImage} alt="Product Thumb" />
        </div>
      </div>
    </div>
    <div class="product-details-wrapper">
      <p class="product-brand">{data.Brand}</p>
      <h1 class="product-title">{productName}</h1>
      <p class="product-description">{data.description}</p>

      {#if data.core_details}
        <CoreDetails attributes={data.core_details}/>
      {/if}
      {#if data.sizeRadio}
        <h2>select size</h2>
        <div class="radio-group">
          {#each data.sizeRadio as size}
            <div class="radio-button">
              <input type="radio" id={size} name="price" value={size} onchange={e => productName = `${data.productName}  size=${e.target.value}`}>
              <label for={size}>{size}</label>
            </div>
          {/each}
        </div>
      {/if}
      
      <div class="product-price">
        <div class="current-price-wrapper">
          <h2 class="current-price">&#8377;{currentPrice}</h2>
          <span class="discount">save {Math.floor(100-((currentPrice/previousPrice)*100))}%</span>
        </div>
        <div class="previous-price-wrapper">
          <span class="previous-price">&#8377;{previousPrice}</span>
        </div>
      </div>

      <GetCoin coin_rewards={data.coin_rewards} prouctQuantity={productQuantity}/>
      <form class="add-to-cart-form">
        {#if data.stockAvailability > 0}
        <div class="product-quantity">
          <button type="button" class="button minus" onclick={decrementQuantity}>
            <img src={minus} alt="Minus Icon" />
          </button>
          <span class="product-quantity-num">{productQuantity}</span>
          <button type="button" class="button plus" onclick={incrementQuantity}>
            <img src={plus} alt="Plus Icon" />
          </button>
        </div>
        {:else}
        <h1 style="font-size: 2rem"> OUT OF STOCK</h1>
        {/if}
        

        {#if data.stockAvailability > 0}
        <button type="submit" class="button cart-btn" onclick={()=>handleCartInsert(data._id, productQuantity, currentPrice, productName)}> Add to Cart </button>
        <button type="submit" class="button add-btn" onclick={placeOrder}> Buy Now </button>
        {:else}
        <button class="button add-btn" onclick={generateInquiry}> Notify Me  </button>
        {/if}
      </form>
    </div>
  </div>
</section>
</main>

<h1 class="text-left text-lg font-bold mb-4 mt-8 pl-4">Related Products</h1>
<ProductCarousel objectID={data._id}/>