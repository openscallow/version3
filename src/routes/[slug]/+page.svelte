<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { productDatabase } from '$lib/json/product.js';
  import { addToRecentlyViewed } from '$lib/stores/recentlyViewed.js';
  import '../../app.css';
  import './product.css';
  import minus from '$lib/images/icon-minus.svg';
  import plus from '$lib/images/icon-plus.svg';
  import Slider from '$lib/components/productSlider/slider.svelte';
  import '@tailwind'
  //retrive information about product
  const productNameUrl = $page.url.pathname.substring(1);
  const productObj = productDatabase[productNameUrl];

  let productName = productObj.name;
  let currentPrice = productObj.currentPrice;
  let previousPrice = productObj.previousPrice;
  let images = [...productObj.images]; 

  //Quantity logic
  let productQuantity = 1;
  
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
    const data = {
      name: productName,
      items: productQuantity,
      currentPrice: currentPrice,
      previousPrice: previousPrice,
      index: productNameUrl
    };
    sessionStorage.setItem('userData', JSON.stringify(data));
    window.location.href = '../MVC';
  }
 
  //update recently viewed 
  onMount(() => {
    addToRecentlyViewed({
      id: productNameUrl,
      name: productName,
      image: activeImage,
      price: currentPrice,
    });
  });

  //issue 
  let thumbImage = productObj.img; //code : 01
</script>

<main class="main">
  <section class="product-wrapper">
    <div class="container">
      <div class="product-images-wrapper">
        <div class="preview-image-wrapper">
          <Slider {images} height="400px" />
        </div>
  
        <!-- code : 01 -->
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
        <p class="product-brand">{productObj.company}</p>
        <h1 class="product-title">{productName}</h1>
        <p class="product-description">{productObj.description}</p>
  
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
            <button type="button" class="button minus" on:click={decrementQuantity}>
              <img src={minus} alt="Minus Icon" />
            </button>
            <span class="product-quantity-num">{productQuantity}</span>
            <button type="button" class="button plus" on:click={incrementQuantity}>
              <img src={plus} alt="Plus Icon" />
            </button>
          </div>
  
          <button type="submit" class="button add-btn" on:click={placeOrder}>
            Buy Now
          </button>
        </form>
      </div>
    </div>
  </section>
</main>