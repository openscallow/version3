<script>
  import { onMount } from 'svelte';
  
  let products = [];
  let error = null;
  let container;
  let lastTile;
  let observer;
  const endpoints = ['getProduct2', 'getProduct3', 'getProduct4']; // Add more as needed
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
    const response = await fetch('./getProduct');
    if (!response.ok) {
      throw new Error('Failed to fetch initial JSON data');
    }
    const initialProducts = await response.json();
    products = initialProducts;
  }
  
  async function fetchMoreProducts() {
    if (currentEndpointIndex >= endpoints.length) {
      return false;
    }
    const currentEndpoint = endpoints[currentEndpointIndex];
    const response = await fetch(`./${currentEndpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON data from ${currentEndpoint}`);
    }
    const newProducts = await response.json();
    
    // Filter out duplicates before adding new products
    const uniqueNewProducts = newProducts.filter(newProduct => 
      !products.some(existingProduct => existingProduct.id === newProduct.id)
    );
    
    products = [...products, ...uniqueNewProducts];
    currentEndpointIndex++;
    return uniqueNewProducts.length > 0;
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
  
  $: if (products.length > 0) {
    lastTile = container?.querySelector('.tile:last-child');
    if (lastTile && observer) {
      observer.observe(lastTile);
    }
  }
  
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
<style>
  .container {
    display: grid;
    gap: 1rem;
    margin: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    aspect-ratio: 1 / 1.2;  /* Slightly taller to accommodate text */
  }
  
  .tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .tile a {
    text-decoration: none;
    color: inherit;
    text-align: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  
  .image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 80%;  /* Reduced to leave space for text */
    position: relative;
  }
  
  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .tile h2 {
    font-size: 1rem;
    margin: 0.5rem 0 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.2em;
    height: 2.4em;
  }
  </style>