<script>
import { Search } from "lucide-svelte";
import Fuse from 'fuse.js';
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import {productDatabase} from '$lib/json/product.js'
import '@tailwind'
import './style.css'

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
 
 <label class="input input-bordered flex items-center gap-2 mb-2 md:w-1/2 w-full ">
  <input type="text" class="grow" placeholder="Search Callow.in" bind:value={query} on:input={handleSearch}/>
  <button on:click={handleSearchClick}><Search class="h-4 w-4 opacity-70"/></button> 
 </label>
 
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