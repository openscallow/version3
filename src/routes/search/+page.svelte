<script>
  import { Search } from "lucide-svelte";
  import Fuse from 'fuse.js';
  import { onMount } from 'svelte';
  import { productDatabase } from '$lib/json/product.js' //this may should go into mongodb
  import '@tailwind'
  import './style.css'
  
  let query = $state("");
  let searchResults = $state([]);
  let fuse;
  let error = $state("");
  
  function convertProductDatabaseToArray(productDatabase) {
    return Object.values(productDatabase).map(product => {
      return {
        img: product.img,
        company: product.company,
        name: product.name,
        description: product.description,
        currentPrice: product.currentPrice,
        previousPrice: product.previousPrice,
        id: product.id
      };
    });
  }
  
  let items = convertProductDatabaseToArray(productDatabase);
  
  onMount(() => {
    const options = {
      keys: ['name', 'company', 'description'],
      threshold: 0.3
    };
    fuse = new Fuse(items, options);
  });
  
  function handleSearch() {
    if (query.length > 0) {
      searchResults = fuse.search(query);
    } else {
      searchResults = [];
    }
  }
  
  function handleSearchClick() {
    handleSearch();
    error = "";
  
    if (searchResults.length > 0) {
      // Store both the search query and the results in sessionStorage
      sessionStorage.setItem('searchQuery', query);
      sessionStorage.setItem('searchResults', JSON.stringify(searchResults.map(result => ({
        name: result.item.name,
        company: result.item.company,
        id: result.item.id,
        img: result.item.img
      }))));
      window.location.href='/searchPage'
    } else {
      error = 'No results found. Please try a different search term.';
    }
  }
  </script>
  
  <div class="">
    <label class="input input-bordered flex items-center gap-2 mb-2 md:w-1/2 w-full">
      <input type="text" class="grow" placeholder="Search Callow.in" bind:value={query} oninput={handleSearch} />
      <button onclick={handleSearchClick}><Search class="h-4 w-4 opacity-70" /></button>
    </label>
  
    {#if error}
      <p class="error-message">{error}</p>
    {/if}
  
    {#if searchResults.length > 0}
      <ul class="results-list">
        {#each searchResults as result}
          <a href={"/"+ result.item.name.replaceAll(" ","-").replaceAll(".", "-") + "/product/" + result.item.id}>
            <li class="result-item">
              <span class="product-name">{result.item.name}</span>
              <span class="company-name">{result.item.company}</span>
            </li>
          </a>
        {/each}
      </ul>
    {:else if query.length > 0}
      <p class="no-results">No results found</p>
    {/if}
  </div>
  