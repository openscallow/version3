<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 11/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 11/12/2025
 * Last change: initialize
 * 
*/

import Avtar from "$lib/components/shared/Avtar.svelte";
import Location from "$lib/components/shared/Location.svelte";
import OrderCard from "$lib/components/features/profile/OrderCard.svelte";
</script>

<div class="profile-container">
    <Avtar width="4rem" height="4rem" actionIndicatorWidth="2rem" actionIndicatorHeight="2rem"/>
    <div class="user-info">
        <h2>Gautam mer</h2>
        <Location locationName="veer bhamasha"/>
    </div>
</div>

<div class="your-orders-container">
    <h2>Your Orders</h2>
    <OrderCard /> <br>
    <OrderCard /> <br>
    <OrderCard />
</div>

<style>
    .profile-container {
        width: 100%;
        padding: 0.5rem;
        display: flex;
        gap:1rem;
    }

    .your-orders-container {
        padding: 0.5rem;
    }

    .your-orders-container > h2 {
        color: black;
        font-size: 1.2rem;
        font-weight: 900;
    }
</style>

