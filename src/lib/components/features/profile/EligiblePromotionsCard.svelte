<script lang='ts'>
import Card from "$lib/components/shared/Card.svelte";
import Button from '$lib/components/shared/Button.svelte';
import Drawer from "$lib/components/shared/Drawer.svelte";
import { enrollPromotionByCustomerId } from '$lib/services/promotion.service';
import type { Promotion } from "$lib/services/promotion.service";

interface Props{
    elgigiblePromotions: Promotion[],
    customerId: string | null
}

let { elgigiblePromotions, customerId }: Props = $props();
let showDrawer = $state(false);
let drawerId: number = $state(0);
let termsLang: string = $state('Hindi')

function drawer(id: number) {
    showDrawer = true;
    drawerId = id;
}
</script>
{#each elgigiblePromotions as promotion, index}
    <Card padding="0.5rem" boxShadow="var(--box-shadow-2)" background=" linear-gradient(135deg, #ffffff, #d1d5db)">
        <div class="wrapper">
            <div class="information">
                <div class="content">
                    <img src="https://assets.website-files.com/636404a7e8c6ff1674a11a14/6364071c9b19034c843f7d12_black.svg" width="30%" alt="logo">
                    <p style="font-size: 2rem;font-weight: bold;">Save {promotion.discount_value}{#if promotion.discount_type === 'percentage'}%{:else}ruppes{/if}</p>
                    <p style="color:gray; font-style:italic; font-size:0.9rem">"All rights reserved. Subject to change without notice </p>
                </div>
                <div class="visuals">
                    <img src="object.png" alt="gift">
                </div>
            </div>
            <div class="interaction">
                <Button variant='text' mode='link' width="fit-content" onclick={()=> drawer(index)}>Terms and condition</Button> 
                <Button variant='primary' width="fit-content" onclick={async (e)=> {
                            if(customerId){
                               await enrollPromotionByCustomerId(customerId, promotion.promotion_id)
                            }
                }}>Enroll</Button>   
            </div>
        </div>
    </Card>
    <span style="display: block; height:10px;"></span>
{/each}

<Drawer bind:isOpen={showDrawer}>
    <h2>Language: {termsLang} </h2>
    <p>code: <b>{elgigiblePromotions[drawerId].code}</b></p>
    <p>{elgigiblePromotions[drawerId].descriptions.hi}</p>
    <Button variant='danger'mode='outline' width="fit-content" onclick={(e) => {showDrawer = false}}>close</Button>
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