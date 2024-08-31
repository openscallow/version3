<script>
  import { Menu, Search } from "lucide-svelte";
 import Fuse from 'fuse.js';
 import { onMount } from 'svelte';
 import { goto } from '$app/navigation';
 import {productDatabase} from '$lib/json/product.js'

 let query = "";
 let searchResults = [];
 let fuse;
 let error = "";

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
    // Instead of sending a POST request, we'll navigate to the search page with query parameters
    const searchParams = new URLSearchParams({
      query: query,
      results: JSON.stringify(searchResults.map(result => ({
        name: result.item.name,
        company: result.item.company,
        id: result.item.id,
        img: result.item.img
      })))
    });
    
    goto(`/searchPage?${searchParams.toString()}`);
  } else {
    error = 'No results found. Please try a different search term.';
  }
 }
 </script>
 
 <div class="container">
 <div class="search-bar">
 <input
 type="text"
 bind:value={query}
 on:input={handleSearch}
 placeholder="Search products..."
 >
 <button class="search-button" on:click={handleSearchClick}>
 <Search class="icon"/>
 </button>
 </div>
 
 {#if error}
 <p class="error-message">{error}</p>
 {/if}
 
 {#if searchResults.length > 0}
 <ul class="results-list">
  {#each searchResults as result}
  <a href={result.item.id}>
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
 
 <style>
     .container {
    z-index: 2;
    background-color: #f0f4f8;
    position: absolute;
    top: 0;
    min-width: 100vw;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search-bar {
    display: flex;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 80%;
    max-width: 600px;
    transition: all 0.3s ease;
    margin-bottom: 20px;
  }

  .search-bar:focus-within {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  input {
    flex-grow: 1;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    outline: none;
  }

  .search-button {
    background-color: #4a90e2;
    border: none;
    color: white;
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .search-button:hover {
    background-color: #3a7bc8;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .results-list {
    list-style-type: none;
    padding: 0;
    width: 80%;
    max-width: 600px;
  }

  .result-item {
    background-color: white;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
  }

  .result-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .product-name {
    font-weight: bold;
    color: #333;
  }

  .company-name {
    color: #666;
    font-size: 0.9em;
  }

  .no-results {
    color: #666;
    font-style: italic;
  }
 </style>