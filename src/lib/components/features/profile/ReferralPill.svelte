<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 20/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 20/12/2025
 * Last change: initialize
 * 
*/

import { Users } from 'lucide-svelte';
</script>

<div class="referral-pill__container">
    <button onclick={()=> window.location.href="/coins"}>
        <Users color="white"/>
        <div><span>Get 10 Callow coins</span> Refer a friend in your school or class</div>
    </button>
</div>

<style>
    .referral-pill__container {
        padding: 0.2rem;
        padding-inline: 0.5rem;
        
    }

    .referral-pill__container button {
        width: 100%;
        padding-inline: 1rem;
        display: flex;
        gap:10px;
        align-items: center;
        flex-direction: row;
        border-radius: var(--radius-lg);
        background-color: var(--color-secondary-transparent);
    }

    .referral-pill__container button div {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: start;
        font-size: 0.8rem;
    }

    .referral-pill__container button div span {
        font-size: 1rem;
    }
</style>