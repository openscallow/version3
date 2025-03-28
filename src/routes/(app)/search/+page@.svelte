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
        <div class="category_item"><a class="outline-none" href="/search/result?k=Cello gripper pens">Cello gripper pens</a></div>
        <div class="category_item"><a class="outline-none" href="/search/result?k=pencil ">Pencil </a></div>
    </div>
    <br>
    <h2>Class wise</h2>
    <ul class="std">
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 12 SCIENCE">STD 12 SCIENCE</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 12 COMMERCE">STD 12 COMMERCE</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 12 ARTS">STD 12 ARTS</a></li>
        <br>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 11 SCIENCE">STD 11 SCIENCE</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 11 COMMERCE">STD 11 COMMERCE</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 11 ARTS">STD 11 ARTS</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 10">STD 10</a></li>
        <br>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 9">STD 9</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 8">STD 8</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 7">STD 7</a></li>
        <li class="category_item"><a class="outline-none" href="/search/result?k=STD 6">STD 6</a></li>
    </ul>
</div>

