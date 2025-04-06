<script lang="ts">
    import { onMount } from 'svelte';
    import '@tailwind'
  
    // Define the Product type matching the new schema
    type Product = {
      _id:  string;
      productName: string;
      category: string;
      brand: string;
      description: string;
      color: string;
      dimensions: string;
      material: string;
      weight: string;
      mrp: number;
      currentPrice: number;
      stockAvailability: number;
      images: string[];
      tags: string[];
      relatedProducts: string[];
      isNew: boolean;
      createdAt: { $date: string };
      updatedAt: { $date: string };
    };
  
    // Initialize products array
    let products: Product[] = $state([]);

  
    // Fetch six new products from your custom endpoint
    async function fetchProducts() {
        console.log("fetching products")
      try {
        // Use your custom API endpoint that retrieves new products from MongoDB
        const response = await fetch('/api/underXRupee');
        console.log("resquested")
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        
        // Expecting the response to be in the format: { products: [...] }
        products = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    // Call fetchProducts when the component mounts
    onMount(fetchProducts);

   
  </script>
<h2 class="text-3xl font-bold ml-4 text-gray-800">under ₹10</h2>
<div class="grid gap-4 p-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(100px,200px))]">
    {#if products.length > 0}
      {#each products as product, index}
      {#if index === 5}
      <span class="product_sentinel hidden"></span>
      {/if}
      
      <div class="relative flex flex-col items-center bg-white rounded-lg transition-transform duration-300 ease-in-out shadow-sm aspect-[1/1.2] border border-black overflow-hidden p-1">
        <a class="no-underline text-inherit text-center flex flex-col w-full h-full" href={"/"+ product.productName.replaceAll(" ","-").replaceAll(".", "-") + "/product/" + product._id} rel="noopener noreferrer">
          <div class="flex-1 flex items-center justify-center overflow-hidden w-full h-0 relative bg-white">
            <img class="absolute top-0 left-0 w-full h-full object-contain" loading="lazy" src={product.images[0]} alt={product.productName} />
          </div>
          <h2 class="text-base my-2 max-w-full overflow-hidden text-ellipsis line-clamp-2 leading-[1.2em] h-[2.4em]">{product.productName}</h2>
          <div class="flex rounded-sm overflow-hidden relative border border-gray-900">
            <div class="py-[2px] text-white bg-red-500 flex-grow">
              ₹{product.currentPrice}
            </div>
            <div class="py-[2px] text-black bg-yellow-400 flex-grow">
              <del>MRP ₹{product.mrp} </del>
            </div>
            <div class="shimmer"></div>
          </div>
          {#if product.stockAvailability < 1}
              <div class="absolute top-1 w-3/4 left-1/2 -translate-x-1/2 fit-content text-white  rounded-full px-2 bg-black">Sold Out</div>
          {/if}
        </a>
      </div>
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
</div>

<style>
  .shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg);
    animation: shimmer 2.5s infinite ease-in-out;
  } 

  @keyframes shimmer {
    0% {
      transform: translateX(-150%) skewX(-20deg);
    }
    50% {
      transform: translateX(150%) skewX(-20deg);
    }
    100% {
      transform: translateX(150%) skewX(-20deg);
    }
  }   
</style>

  