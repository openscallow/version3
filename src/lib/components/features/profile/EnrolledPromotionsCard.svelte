<script lang='ts'>
import { CircleX } from 'lucide-svelte';
import { getDialogContext } from '$lib/dialog.svelte';
import Card from "$lib/components/shared/Card.svelte";
import Button from '$lib/components/shared/Button.svelte';
import Drawer from "$lib/components/shared/Drawer.svelte";
import type { Promotion } from "$lib/services/promotion.service";

interface Props{
    enrolledPromotions: Promotion[]
}

const dialog = getDialogContext();
let { enrolledPromotions }: Props = $props();
let drawerId: number = $state(0);
let termsLang: string = $state('Hindi')

</script>
{#each enrolledPromotions as promotion, index}
    <Card padding="0.5rem" boxShadow="var(--box-shadow-2)" background="linear-gradient(135deg, #ffffff, #bfdbfe)">
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
                <Button variant='text' mode='link' width="fit-content" onclick={() => dialog.open(myModalContent)}>Terms and condition</Button>    
            </div>
        </div>
    </Card>
    <span style="display: block; height:10px;"></span>
{/each}

{#snippet myModalContent()}
	<button class="close-button" onclick={() => dialog.close()}><CircleX /></button>
	<div class="lang-container">
		<span>language: </span>
		<select name="lang" id="lang">
			<option value="Hindi">Hindi</option>
			<option value="hindi" disabled>Gujarati</option>
		</select>
	</div>
	
	<ul class="terms">
        {#each enrolledPromotions[drawerId].descriptions.hi as term}
            <li>{term}</li>
        {/each}
	</ul>

	<style>
		.close-button{
			position: absolute;
			top: 5px;
			right: 5px;
		}

		.lang-container {
			color: white;
			width: fit-content;
			padding: 5px 10px;
			margin-bottom: 1rem;
			border-radius: var(--radius-sm);
			background-color: var(--color-primary);
		}

		.lang-container select {
			background-color: transparent;
		}
		
		.terms {
			list-style: none; 
			padding-left: 0;
		}
		
		.terms li {
			position: relative;
			padding-left: 25px;
		}
		
		.terms li::before {
			content: "🛡️";         
			position: absolute;
			left: 0;
			top: 0;
			font-size: 16px;
		}	
	</style>
{/snippet}

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