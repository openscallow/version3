<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { productDatabase } from '$lib/json/product.js';
  import { addToRecentlyViewed } from '$lib/stores/recentlyViewed.js';
  import '../../app.css';
  import './product.css';
  import minus from '$lib/images/icon-minus.svg';
  import plus from '$lib/images/icon-plus.svg';
  import next from '$lib/images/icon-next.svg';
  import previous from '$lib/images/icon-previous.svg';
 
  const productNameUrl = $page.url.pathname.substring(1);
  const productObj = productDatabase[productNameUrl];
 
  let thumbImagesDivs = [];
  let activeImage = productObj.img;
  let currentIndex = 0;
  let productQuantity = 1;
  let mobileMenuOpen = false;
  let lightBoxOpen = false;
 
  // information about product
  let productName = productObj.name;
  let currentPrice = productObj.currentPrice;
  let previousPrice = productObj.previousPrice;
 
  $: totalImages = 1; // Assuming we have 4 images based on the imports
 
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
 
  // Scaffold the order summary
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
 
  // Add to recently viewed on mount
  onMount(() => {
    addToRecentlyViewed({
      id: productNameUrl,
      name: productName,
      image: activeImage,
      price: currentPrice,
      // Add any other relevant product data
    });
  });
 </script>

<main class="main">
  <section class="product-wrapper">
    <div class="container">
      <div class="product-images-wrapper">
        <div class="preview-image-wrapper">
          <img
            src={activeImage}
            class="preview-image"
            alt="Product Image"
          />
          <div class="arrows hide-for-desktop">
            <div class="next" >
              <img src={next} alt="Next Icon" />
            </div>
            <div class="prev" >
              <img src={previous} alt="Previous Icon" />
            </div>
          </div>
          <div class="count">
            <p>
              <span class="current">{currentIndex + 1}</span> of
              <span class="total">{totalImages}</span>
            </p>
          </div>
        </div>
  
        <div class="thumbs-wrapper hide-for-mobile">
          {#each thumbImagesDivs as thumb, i}
            <div class="thumb-image" class:active={i === currentIndex} on:click={() => {currentIndex = i; showThumbsAsActive();}}>
              <img
                src={thumb.src}
                alt="Product Thumb Image"
              />
            </div>
          {/each}
        </div>
      </div>
      <div class="product-details-wrapper">
        <p class="product-brabd">{productObj.company}</p>
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