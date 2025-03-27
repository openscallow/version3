<script lang="ts">
    import './style.css';
    import { Search } from "lucide-svelte";
    let query = $state('')

    function fireQuery(){
        window.location.href = `/search/result?k=${query}`
    }


</script>
<div class="wrapper">
    <input type="text" bind:value={query} onkeydown={(e) => e.key === 'Enter' && fireQuery()}>
    <button class="wrapper_search_icon" onclick={fireQuery}>
        <Search class="search_icon"/>
    </button>   
</div>

<div class="category">
    <h2>Popular</h2>
    <div class="category_list">
        <div class="category_item"><a href="/search/result?k=Cello gripper pens">Cello gripper pens</a></div>
        <div class="category_item"><a href="/search/result?k=STD 12 SCIENCE">STD 12</a></div>
        <div class="category_item">Category 2</div>
        <div class="category_item">Category 3</div>
        <div class="category_item">Category 4</div>
        <div class="category_item">Category 5</div>
    </div>
</div>

