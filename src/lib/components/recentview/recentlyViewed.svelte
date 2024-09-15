<script>
    import { recentlyViewed} from '$lib/stores/recentlyViewed.js';
    import '$lib/components/gridtiles/style.css';
  </script>
  
  
    
    {#if $recentlyViewed.length > 0}
    <h2 style="margin-left: 2rem;margin-top:1rem;color:black;font-size:2rem;">#recently-viewed</h2>
    <div class="recently-viewed container">
        {#each $recentlyViewed as item}
        <div class="tile">
          <a href={"/"+ item.id} rel="noopener noreferrer">
            <div class="image-container">
            <img src={item.image} alt={item.name} />
          </div>
            <h2>{item.name}</h2>
           
</a>
        </div>
        {/each}
      </div>
      <br>
    {:else}
      <p>No recently viewed items</p>
    {/if}

