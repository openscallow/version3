<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { addToRecentlyViewed } from '$lib/components/recentlyViewed/recentView.js';
  import '../../../../app.css';
  import './product.css';
  import minus from '$lib/images/icon-minus.svg';
  import plus from '$lib/images/icon-plus.svg';
  import Slider from '$lib/components/productSlider/slider.svelte';
  import '@tailwind'

  let { data } = $props();
  
  // Map new data structure to existing variable names
  let productName = data.productName;
  let currentPrice = data.currentPrice;
  let previousPrice = data.mrp;
  let images = [...data.images];

  //Quantity logic
  let productQuantity = $state(1);
  
  function incrementQuantity() {
    productQuantity += 1;
  }
 
  function decrementQuantity() {
    if (productQuantity > 1) {
      productQuantity -= 1;
    }
  }

  //buy btn action
  function placeOrder() {
    const orderData = {
      id: data._id,
      name: productName,
      quantity: productQuantity,
      currentPrice: currentPrice,
      actualPrice: previousPrice
    };
    sessionStorage.setItem('product', JSON.stringify(orderData));

    if(localStorage.getItem('customer_correlated')){
      window.location.href = '/checkout'
    }else{
      window.location.href = '/signUp'
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
  });

  let thumbImage = images[0]; // Using first image as thumbnail
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

      <div class="product-price">
        <div class="current-price-wrapper">
          <h2 class="current-price">&#8377;{currentPrice}</h2>
          <span class="discount">save {Math.floor(100-((currentPrice/previousPrice)*100))}%</span>
        </div>
        <div class="previous-price-wrapper">
          <span class="previous-price">&#8377;{previousPrice}</span>
        </div>
      </div>

      <form class="add-to-cart-form">
        <div class="product-quantity">
          <button type="button" class="button minus" onclick={decrementQuantity}>
            <img src={minus} alt="Minus Icon" />
          </button>
          <span class="product-quantity-num">{productQuantity}</span>
          <button type="button" class="button plus" onclick={incrementQuantity}>
            <img src={plus} alt="Plus Icon" />
          </button>
        </div>

        <button type="submit" class="button add-btn" onclick={placeOrder}>
          Buy Now
        </button>
      </form>
    </div>
  </div>
</section>
</main>