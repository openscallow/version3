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
 
  const productNameUrl = $page.url.pathname.substring(1);
  const productObj = productDatabase[productNameUrl];
 
  let images = [...productObj.images]; // Array with single image
  let activeImage = productObj.img;
  let currentIndex = 0;
  let productQuantity = 1;
  let mobileMenuOpen = false;
  let lightBoxOpen = false;
 
  // information about product
  let productName = productObj.name;
  let currentPrice = productObj.currentPrice;
  let previousPrice = productObj.previousPrice;
 
  $: totalImages = images.length;
 
  function incrementQuantity() {
    productQuantity += 1;
  }
 
  function decrementQuantity() {
    if (productQuantity > 1) {
      productQuantity -= 1;
    }
  }
 
  function addToCart() {
    // Implement add to cart functionality here
    console.log(`Added ${productQuantity} items to cart`);
  }
 
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
 
  onMount(() => {
    addToRecentlyViewed({
      id: productNameUrl,
      name: productName,
      image: activeImage,
      price: currentPrice,
    });
  });
</script>

<main class="main">
  <section class="product-wrapper">
    <div class="container">
      <div class="product-images-wrapper">
        <div class="preview-image-wrapper">
          <Slider {images} height="400px" />
        
          <div class="count">
            <p>
              <span class="current">1</span> of
              <span class="total">1</span>
            </p>
          </div>
        </div>
  
        <div class="thumbs-wrapper hide-for-mobile">
          <div class="thumb-image active">
            <img src={activeImage} alt="Product Thumb Image" />
          </div>
          <div class="thumb-image">
            <img src={activeImage} alt="Product Thumb Image" />
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
  
        <form on:submit|preventDefault={addToCart} class="add-to-cart-form">
          <div class="product-quantity">
            <button type="button" class="button minus" on:click={decrementQuantity}>
              <img src={minus} alt="Minus Icon" />
            </button>
            <span class="product-quantity-num">{productQuantity}</span>
            <button type="button" class="button plus" on:click={incrementQuantity}>
              <img src={plus} alt="Plus Icon" />
            </button>
          </div>
  
          <button
            type="submit"
            aria-label="Add to cart"
            class="button add-btn"
            on:click={placeOrder}
          >
            Buy Now
          </button>
        </form>
      </div>
    </div>
  </section>
</main>

<!-- LightBox -->
<div class="lightbox-wrapper" class:open={lightBoxOpen}>
  <div class="lightbox-content"></div>
</div>

<!-- Overlay -->
<div class="overlay" class:open={mobileMenuOpen || lightBoxOpen} on:click={() => { mobileMenuOpen = false; lightBoxOpen = false; }}></div>