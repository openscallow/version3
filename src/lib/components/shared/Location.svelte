<script>
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

import { MapPin, ChevronDown } from 'lucide-svelte';

let {locationName} = $props()
</script>

<div class="location-container">
    <MapPin size={18}/>
    <span class="location-name">{locationName}</span>
    <ChevronDown size={18} color="darkcyan" onclick={()=> window.location.href="/adderss"} />
</div>


<style>

    .location-container {
        color: #333;
        display: inline-flex; 
        align-items: center;
        gap: 6px;
        padding: 4px 8px; 
        border-radius: 9999px;
        font-size: 0.95rem; 
        font-weight: 500;
        background-color: #f0f4f8;
        background-color: #f0f4f8; 
        border: 1px solid #e0e6ec;
    }
</style>

