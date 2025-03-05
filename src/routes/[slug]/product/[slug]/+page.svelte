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
  import Swiper from 'swiper/bundle';
  import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';

  let { data } = $props();
  console.log(data)
  
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

    const swiper = new Swiper('.swiper', swiperConfig);
  });

  let thumbImage = images[0]; // Using first image as thumbnail

  //swiper 

  const swiperConfig = {
    modules: [Navigation, FreeMode, Mousewheel],
    loop: false,
    slidesPerView: 1.5,
    spaceBetween: 2,
    freeMode: {
      enabled: true,
      sticky: false,
      momentumRatio: 0.25,
      momentumVelocityRatio: 0.5,
    },
    grabCursor: true,
    mousewheel: true,
    breakpoints: {
      1024: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
    },
  };

  function updateRelativeProduct(id : number, data: any){
    let product = document.querySelector(`.productId${id}`);
    if(product){
      product.innerHTML = `
      <a class="no-underline text-inherit" href=${"/"+ data.productName.replaceAll(" ","-").replaceAll(".", "-") + "/product/" + data._id} target="_blank">
        <div class="flex w-52 flex-col gap-4">
          <img src=${data.images[0]} alt="Product Image" class="w-full h-32 object-contain rounded-sm" />
          <p class="text-sm font-semibold whitespace-normal">${data.productName}</p>
          <div class="flex items-center gap-1">
            <p class="text-sm leading-3 border-r-2 pr-1 border-indigo-500">&#8377;${data.currentPrice}</p>
            <del class="text-xs leading-3">M.R.P: &#8377;${data.mrp}</del>
          </div>
          <div class="text-xs p-1 rounded-full border w-fit border-black"> ${data.brand} </div>
        </div>
      </a>
      `;
    }
  }


  async function fetchRelativeProduct(productId : any){
    try {
            const response = await fetch(`/api/getProduct?productid=${productId}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            
            const data = await response.json();
            updateRelativeProduct(productId, data.product);
         
        } catch (error) {
            console.error('Error fetching product:', error);
            
        }
  }

  onMount(() => {
    data.relatedProducts.forEach((productId: any) => {
      fetchRelativeProduct(productId)
    });
  });
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
<h1 class="text-left text-lg font-bold mb-4 mt-8 pl-4">Related Products</h1>
<div class="swiper bg-white">
  <div class="swiper-wrapper">
    {#each data.relatedProducts as productId}
    <div class="swiper-slide productId{productId}  ">
      <div class="flex w-52 flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28"></div>
        <div class="skeleton h-4 w-full"></div>
        <div class="skeleton h-4 w-full"></div>
      </div>
    </div>
    {/each}
  </div>
</div>

<br>
<br>


  <!--swiper is changing style via js so we have to implement here  -->
<style>
  .swiper{
    padding:10px;
  }

  .swiper-slide{
    padding-right: 10px;
    
  }
</style>