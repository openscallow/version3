<script lang="ts">
import { onMount } from "svelte";
import { Customer } from '$lib/utils/Customer';
import Card from "$lib/components/shared/Card.svelte";
import Button from '$lib/components/shared/Button.svelte';
import Drawer from "$lib/components/shared/Drawer.svelte";
import { qualifiedPromotionsByCustomerId, getEnrolledPromotionsByCustomerId, getEligiblePromotionsByCustomerId } from '$lib/services/promotion.service';
import { enrollPromotionByCustomerId } from '$lib/services/promotion.service';
import type { Promotion } from "$lib/services/promotion.service";
 
let elgigiblePromotions: Promotion[] = $state([]);
let enrolledPromotions: Promotion[] = $state([]);
let qualifiedPromotions: Promotion[] = $state([]);
let showDrawer = $state(false);
let showDrawer2 = $state(false);
let showDrawer3 = $state(false);
let drawerId: number = $state(0);
let termsLang: string = $state('Hindi')

let customer = new Customer();

function drawer(id: number) {
    showDrawer = true;
    drawerId = id;
}

function drawer2(id: number) {
    showDrawer2 = true;
    drawerId = id;
}

function drawer3(id: number) {
    showDrawer3 = true;
    drawerId = id;
}

onMount(async()=> {
    if(customer.ID){
        qualifiedPromotions = await qualifiedPromotionsByCustomerId(customer.ID);
        enrolledPromotions = await getEnrolledPromotionsByCustomerId(customer.ID);
        elgigiblePromotions = await getEligiblePromotionsByCustomerId(customer.ID);
    }
})
</script>
<Card padding="0.5rem" boxShadow="var(--box-shadow-1)" background="white"> 
    <h3 style="font-size:1.5rem;">Your offers and discount</h3> 
    {#await qualifiedPromotions}
        loading...
    {:then qualifiedPromotions} 
        {#if qualifiedPromotions}
            {#each qualifiedPromotions as promotion, index}
            <Card padding="0.5rem" boxShadow="var(--box-shadow-2)" background="white">
                <div class="wrapper">
                    <div class="information">
                        <div class="content">
                            <img src="https://assets.website-files.com/636404a7e8c6ff1674a11a14/6364071c9b19034c843f7d12_black.svg" width="30%" alt="logo">
                            <p style="font-size: 2rem;font-weight: bold;">Save {promotion.discount_value}{#if promotion.discount_type === 'percentage'}%{:else}ruppes{/if}</p>
                            <p style="color:gray; font-style:italic; font-size:0.9rem">"All rights reserved. Subject to change without notice </p>
                        </div>
                        <div class="visuals">
                            <img src="object.png" alt="">
                        </div>
                    </div>
                    <div class="interaction">
                        <Button variant='text' mode='link' width="fit-content" onclick={()=> drawer3(index)}>Terms and condition</Button>    
                    </div>
                </div>
            </Card>
            <span style="display: block; height:10px;"></span>
            {/each}
        {:else}
            you don't have any elgigiblePromotions
        {/if}
    {/await} 
    {#await enrolledPromotions}
        loading...
    {:then enrolledPromotions} 
        {#if enrolledPromotions}
            {#each enrolledPromotions as promotion, index}
            <Card padding="0.5rem" boxShadow="var(--box-shadow-2)" background="white">
                <div class="wrapper">
                    <div class="information">
                        <div class="content">
                            <img src="https://assets.website-files.com/636404a7e8c6ff1674a11a14/6364071c9b19034c843f7d12_black.svg" width="30%" alt="logo">
                            <p style="font-size: 2rem;font-weight: bold;">Save {promotion.discount_value}{#if promotion.discount_type === 'percentage'}%{:else}ruppes{/if}</p>
                            <p style="color:gray; font-style:italic; font-size:0.9rem">"All rights reserved. Subject to change without notice </p>
                        </div>
                        <div class="visuals">
                            <img src="object.png" alt="">
                        </div>
                    </div>
                    <div class="interaction">
                        <Button variant='text' mode='link' width="fit-content" onclick={()=> drawer2(index)}>Terms and condition</Button>
                        
                    </div>
                </div>
            </Card>
            <span style="display: block; height:10px;"></span>
            {/each}
        {:else}
            you don't have any elgigiblePromotions
        {/if}
    {/await} 
    {#await elgigiblePromotions}
        loading...
    {:then elgigiblePromotions} 
        {#if elgigiblePromotions}
            {#each elgigiblePromotions as promotion, index}
            <Card padding="0.5rem" boxShadow="var(--box-shadow-2)" background="white">
                <div class="wrapper">
                    <div class="information">
                        <div class="content">
                            <img src="https://assets.website-files.com/636404a7e8c6ff1674a11a14/6364071c9b19034c843f7d12_black.svg" width="30%" alt="logo">
                            <p style="font-size: 2rem;font-weight: bold;">Save {promotion.discount_value}{#if promotion.discount_type === 'percentage'}%{:else}ruppes{/if}</p>
                            <p style="color:gray; font-style:italic; font-size:0.9rem">"All rights reserved. Subject to change without notice </p>
                        </div>
                        <div class="visuals">
                            <img src="object.png" alt="">
                        </div>
                    </div>
                    <div class="interaction">
                        <Button variant='text' mode='link' width="fit-content" onclick={()=> drawer(index)}>Terms and condition</Button>
                        <Button variant='primary' width="fit-content" onclick={async (e)=> {
                            if(customer.ID){
                               await enrollPromotionByCustomerId(customer.ID, promotion.promotion_id)
                            }
                        }}>Enroll</Button>
                    </div>
                </div>
            </Card>
            <span style="display: block; height:10px;"></span>
            {/each}
        {:else}
            you don't have any elgigiblePromotions
        {/if}
    {/await} 
</Card>

<Drawer bind:isOpen={showDrawer}>
    <h2>Language: {termsLang} </h2>
    <p>{elgigiblePromotions[drawerId].descriptions.hi}</p>
    <Button variant='danger'mode='outline' width="fit-content" onclick={(e) => {showDrawer = false}}>close</Button>
</Drawer>

<Drawer bind:isOpen={showDrawer2}>
    <h2>Language: {termsLang} </h2>
    <p>{enrolledPromotions[drawerId].descriptions.hi}</p>
    <Button variant='danger'mode='outline' width="fit-content" onclick={(e) => {showDrawer2 = false}}>close</Button>
</Drawer>

<Drawer bind:isOpen={showDrawer3}>
    <h2>Language: {termsLang} </h2>
    <p>code: <b>{qualifiedPromotions[drawerId].code}</b></p>
    <p>{qualifiedPromotions[drawerId].descriptions.hi}</p>
    <Button variant='danger'mode='outline' width="fit-content" onclick={(e) => {showDrawer3 = false}}>close</Button>
</Drawer>
<style>

    .wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .information {
        flex: 2 1 0;
        display: flex;
    }

    .information .visuals {
        flex: 1 1 0;
    }

    .information .content {
        flex: 2 1 0;
    }

    .interaction {
        width: 100%;
        padding-top: 0.5rem;
        flex: 1 1 0;
        display: flex;
        justify-content: space-between;
        border-top: 1px dashed black;
    }
</style>