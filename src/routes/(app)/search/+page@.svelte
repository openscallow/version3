<script lang="ts">
    import './style.css';
    import { Search } from "lucide-svelte";
    
    let query = $state('');
    
    function fireQuery() {
      window.location.href = `/search/result?k=${encodeURIComponent(query.trim())}`;
    }
    
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        fireQuery();
      }
    }
  </script>
  
  <div class="container">
    <div class="search-wrapper">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Search for items..." 
          bind:value={query} 
          onkeydown={handleKeyDown}
          aria-label="Search input"
        >
        <button 
          class="search-button" 
          onclick={fireQuery}
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  
    <div class="categories-container">
      <section class="category-section">
        <h2>Popular Searches</h2>
        <div class="tag-container">
          <a href="/search/result?k=Cello gripper pens" class="tag">Cello gripper pens</a>
          <a href="/search/result?k=pencil" class="tag">Pencil</a>
          <a href="/search/result?k=sport" class="tag">Sport</a>
        </div>
      </section>
      
      <section class="category-section">
        <h2>Class Categories</h2>
        
        <div class="class-groups">
          <div class="class-group">
            <h3>High School (11-12)</h3>
            <div class="tag-container">
              <a href="/search/result?k=STD 12 SCIENCE" class="tag">12th Science</a>
              <a href="/search/result?k=STD 12 COMMERCE" class="tag">12th Commerce</a>
              <a href="/search/result?k=STD 12 ARTS" class="tag">12th Arts</a>
              <a href="/search/result?k=STD 11 SCIENCE" class="tag">11th Science</a>
              <a href="/search/result?k=STD 11 COMMERCE" class="tag">11th Commerce</a>
              <a href="/search/result?k=STD 11 ARTS" class="tag">11th Arts</a>
            </div>
          </div>
          
          <div class="class-group">
            <h3>Middle School (6-10)</h3>
            <div class="tag-container">
              <a href="/search/result?k=STD 10" class="tag">10th</a>
              <a href="/search/result?k=STD 9" class="tag">9th</a>
              <a href="/search/result?k=STD 8" class="tag">8th</a>
              <a href="/search/result?k=STD 7" class="tag">7th</a>
              <a href="/search/result?k=STD 6" class="tag">6th</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  