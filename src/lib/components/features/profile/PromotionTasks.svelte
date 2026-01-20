<script lang="ts">
import { onMount } from "svelte";
import { Customer } from '$lib/utils/Customer';
import Card from "$lib/components/shared/Card.svelte";
import QualifiedPromotionsCard from "$lib/components/features/profile/QualifiedPromotionsCard.svelte";
import EnrolledPromotionsCard from "$lib/components/features/profile/EnrolledPromotionsCard.svelte";
import EligiblePromotionsCard from "$lib/components/features/profile/EligiblePromotionsCard.svelte";
import { qualifiedPromotionsByCustomerId, getEnrolledPromotionsByCustomerId, getEligiblePromotionsByCustomerId } from '$lib/services/promotion.service';
import type { Promotion } from "$lib/services/promotion.service";
 
let elgigiblePromotions: Promotion[] = $state([]);
let enrolledPromotions: Promotion[] = $state([]);
let qualifiedPromotions: Promotion[] = $state([]);

let customer = new Customer();

onMount(async()=> {
    if(customer.ID){
        qualifiedPromotions = await qualifiedPromotionsByCustomerId(customer.ID);
        enrolledPromotions = await getEnrolledPromotionsByCustomerId(customer.ID);
        elgigiblePromotions = await getEligiblePromotionsByCustomerId(customer.ID);
    }
})
</script>
<div class="container">
    <h3 style="font-size:1.5rem;">Your offers and discount</h3> 
    {#await qualifiedPromotions}
        loading...
    {:then qualifiedPromotions} 
        {#if qualifiedPromotions}
            <QualifiedPromotionsCard {qualifiedPromotions} />
        {/if}
    {/await} 
    {#await enrolledPromotions}
        loading...
    {:then enrolledPromotions} 
        {#if enrolledPromotions}
            <EnrolledPromotionsCard {enrolledPromotions} />
        {/if}
    {/await} 
    {#await elgigiblePromotions}
        loading...
    {:then elgigiblePromotions} 
        {#if elgigiblePromotions}
            <EligiblePromotionsCard {elgigiblePromotions} customerId={customer.ID} />
        {/if}
    {/await} 
</div>
<style>
    .container {
        padding: 0.5rem;
    }
</style>