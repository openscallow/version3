<script>
  import { run } from 'svelte/legacy';

  import { onMount } from 'svelte';
  import { getProductsWithCache } from './cacheUtils.js';
  import '$lib/components/gridtiles/style.css'

  let products = $state([]);
  let error = $state(null);
  let container = $state();
  let lastTile = $state();
  let observer = $state();
  const endpoints = ['getProduct', 'getProduct2', 'getProduct3', 'getProduct4']; // Added 'getProduct' for initial fetch
  let currentEndpointIndex = 0;

  onMount(async () => {
    try {
      await fetchInitialProducts();
      setupIntersectionObserver();
    } catch (err) {
      error = err.message;
    }
  });

  async function fetchInitialProducts() {
    const initialProducts = await getProductsWithCache(endpoints[currentEndpointIndex], fetchProductsFromServer);
    products = initialProducts;
    currentEndpointIndex++;
  }

  async function fetchMoreProducts() {
    if (currentEndpointIndex >= endpoints.length) {
      return false;
    }
    const currentEndpoint = endpoints[currentEndpointIndex];
    const newProducts = await getProductsWithCache(currentEndpoint, fetchProductsFromServer);
    
    // Filter out duplicates before adding new products
    const uniqueNewProducts = newProducts.filter(newProduct =>
      !products.some(existingProduct => existingProduct.id === newProduct.id)
    );
    products = [...products, ...uniqueNewProducts];
    currentEndpointIndex++;
    return uniqueNewProducts.length > 0;
  }

  async function fetchProductsFromServer(endpoint) {
    const response = await fetch(`./${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from ${endpoint}`);
    }
    return response.json();
  }
  
  function setupIntersectionObserver() {
    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    if (lastTile) {
      observer.observe(lastTile);
    }
  }
  
  async function handleIntersection(entries) {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        try {
          const moreDataFetched = await fetchMoreProducts();
          if (moreDataFetched) {
            setupIntersectionObserver();
          } else {
            observer.disconnect();
          }
        } catch (err) {
          error = err.message;
        }
      }
    }
  }
  
  run(() => {
    if (products.length > 0) {
      lastTile = container?.querySelector('.tile:last-child');
      if (lastTile && observer) {
        observer.observe(lastTile);
      }
    }
  });
  
  // Function to generate a unique key for each product
  function getUniqueKey(product) {
    return product.id;
  }
  </script>
  
  <div class="container" bind:this={container}>
    {#if error}
      <p>Error: {error}</p>
    {:else if products.length === 0}
      <p>Loading...</p>
    {:else}
      {#each products as product (getUniqueKey(product))}
        <div class="tile">
          <a href={"/"+ product.id} rel="noopener noreferrer">
            <div class="image-container">
              <img src={product.img} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
          </a>
        </div>
      {/each}
    {/if}
  </div> 
