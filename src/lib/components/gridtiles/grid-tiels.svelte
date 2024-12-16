<script>

  import { onMount } from 'svelte';
  import { getProductsWithCache } from './cacheUtils.js';
  import '$lib/components/gridtiles/style.css'

  let products = $state([]);
  let error = $state(null);
  let container = $state();
  let lastTile = $state();
  let productFetcher = fetchProduct(); 

  let observer = $state()
  const endpoints = ['getProduct', 'getProduct2', 'getProduct3', 'getProduct4, getProduct5'];
  
  async function handleIntersection(entries) {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        productFetcher.next()
      }
    }
  }
 
  $effect(()=>{
    if (products.length > 0) {
      lastTile = container?.querySelector('.tile:last-child');
      if (lastTile && observer) {
        observer.observe(lastTile);
      }
    }
  })

  // Function to generate a unique key for each product
  function getUniqueKey(product) {
    return product.id;
  }

  onMount(() => {
    setupObserver()
    productFetcher.next()
  })

  function setupObserver() {
    observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    })
  }

  async function* fetchProduct() {
    for (const endpoint of endpoints) {
        const result = await getProductsWithCache(endpoint);
        if (result.error) {
            error = result.error;
            break;
        }
        products = [...products, ...result];
        yield { products };
    }
    observer.disconnect();
    console.log('All endpoints processed.');
  }
  </script>
  
  <div class="container" bind:this={container}>
    {#if error}
    <p aria-live="polite">{error ? `Error: ${error}` : 'Loading...'}</p>
    {:else}
      {#each products as product (getUniqueKey(product))}
        <div class="tile">
          <a href={"/"+ product.id} rel="noopener noreferrer">
            <div class="image-container">
              <img loading="lazy" src={product.img} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
          </a>
        </div>
      {/each}
    {/if}
  </div> 