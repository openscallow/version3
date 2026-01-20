<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 11/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 11/12/2025
 * Last change: profile pill intigrated
 * 
*/
import { Customer } from '$lib/utils/Customer'
import Avtar from "$lib/components/shared/Avtar.svelte";
import Button from '$lib/components/shared/Button.svelte';
import Location from "$lib/components/shared/Location.svelte";
import OrderCard from "$lib/components/features/profile/OrderCard.svelte";
import ReferralPill from '$lib/components/features/profile/ReferralPill.svelte';
import { getCustomerOrders } from '$lib/components/ts/getCustomerOrders';
import PromotionTasks from '$lib/components/features/profile/PromotionTasks.svelte';


let customer = new Customer();

async function customerOrders() {
    if(!customer.exists) throw new Error('customer not exists');

    if(customer.id) {
        let orders = await getCustomerOrders(customer.id, 'All');
        return orders;
    } else {
        throw new Error('customer ID is missing')
    }
}

async function customerInfo() {
    try {
        let response =  await fetch('/api/customerInfoById', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({customer_id: customer.id})
        })


        if(response.ok){
            let {info} = await response.json()
            console.log(info)
            return info
        }
        else{
            console.log(response)
        }
    } catch (error) {
        
    }
}

</script>
<div class="container">
    {#await customerInfo()}
    <div class="loading-container">
        <p>Loading ...</p>
    </div>
{:then information} 
    <div class="profile-container">
        {#if information.customer_picture}
            <Avtar width="4rem" height="4rem" actionIndicatorWidth="2rem" actionIndicatorHeight="2rem"/>
        {:else}
            <Avtar width="4rem" height="4rem" actionIndicatorWidth="2rem" actionIndicatorHeight="2rem"/>
        {/if}
        <div class="user-info">
            <h2>{information.customer_name}</h2>
            <Location locationName="School name goes here..."/>
        </div>
    </div>  
    <ReferralPill />
{:catch error}
f
{/await}

{#await customerOrders()}
    <div class="loading-container">
        <p>Loading ...</p>
    </div>
{:then orders}
    <div class="your-orders-container">
        <h2>Your Orders</h2>
        {#each orders as order}
            {#if order.status !== "Canceled"}
                <OrderCard productId={order.items_count[0]} orderId={order.order_id} cratedAt={order.created_at} instituteName={order.institute_name }/>
            {/if}
        {/each}
    </div>
	
{:catch error}
    {#if error.message === 'customer not exists'}
        <div class="suggestion-container">
            <p style="color:red;">You don't have account please create an account or login first</p> <br>
            <Button variant="primary" mode="solid" size="lg" radius="999px"  onclick={(e)=> {window.location.href="/accounts/login"}}>Login</Button>
            <span>--- OR ---</span>
            <Button variant="primary" mode="solid" size="lg" radius="999px"  onclick={(e)=> {window.location.href="/accounts/signup"}}>sign up</Button>
        </div> 
    {:else}
    <p>{error.message}</p>
    {/if}
{/await}

<PromotionTasks />
</div>



<style>
    .container {
        width: 100%;
        padding: 1rem;
    }

    .loading-container {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .suggestion-container {
        width: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .profile-container {
        width: 100%;
        padding: 0.5rem;
        display: flex;
        gap:1rem;
    }

    .your-orders-container {
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .your-orders-container > h2 {
        color: black;
        font-size: 1.2rem;
        font-weight: 900;
    }
</style>