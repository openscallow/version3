<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    
    let query = $page.url.searchParams.get('query') || '';
    let results = JSON.parse($page.url.searchParams.get('results') || '[]');

   onMount(()=>{
    document.addEventListener("DOMContentLoaded", () => {
    // Wait a short time to ensure everything is fully loaded
    setTimeout(() => {
      location.reload(); // Reload the page
    }, 2000); // Adjust the delay (in milliseconds) if necessary
  });

   })
    </script>
    
    <h1>Search Results for : {query}</h1>
    <div class="container">
    {#if results.length > 0}
      
        {#each results as result}
        <div class="tile">
          <a href={"/"+ result.id} rel="noopener noreferrer">
            <div class="image-container">
            <img src={result.img} alt={result.name} />
          </div>
            <h2>{result.name}</h2>
          </a>
        </div>
          
        {/each}
    
    {:else}
      <p>No results found.</p>
    {/if}
  </div>


    <style>
      h1{
        margin-top: 10px;
        margin-left: 35px;
        border-radius: 3px ;
        font-size: 1rem;
        width: fit-content;
        padding: 10px;
        color: white;
        background-color: #1a202c;
      }
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