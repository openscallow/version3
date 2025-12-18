<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 12/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 12/12/2025
 * Last change: initialize
 * 
*/
import { Pencil } from 'lucide-svelte';

let {imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS63vYE47ZzdjITgxvrLFJiD_hpoWj2TJmR4g&s", width, height, actionIndicator=true, actionIndicatorWidth, actionIndicatorHeight} = $props()

</script> 

<div class="avtar-container" style:width style:height>
    <img src={imageSrc} alt="avtart">
    {#if actionIndicator}
    <div class="indicator-container" style:width={actionIndicatorWidth} style:height={actionIndicatorHeight}>
        <div class="indicator">
            <Pencil size={15}/>
        </div>
    </div>
    {/if}
</div>


<style>
    .avtar-container {
        padding: 0.1rem;
        border-radius: var(--radius-md);
        position: relative; 
    }
    .avtar-container img {
        border-radius: var(--radius-md);
        object-fit:scale-down;
    }

    .avtar-container .indicator-container {
        padding: 3px;
        cursor: pointer;
        position: absolute;
        right: -0.5rem;
        bottom: -0.5rem;
        background-color: var(--color-bg-1);
        border-radius: 50%;
    }

    .indicator {
        display: grid;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 50%;
    }
</style>
