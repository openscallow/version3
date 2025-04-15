<script>
    import { onMount } from 'svelte';
    import customerTier from './customerTier.js';
  
    let { coin_rewards, prouctQuantity} = $props();
    let permittedCoin = $state(0)
    let coin = $derived(permittedCoin * prouctQuantity);

    onMount(async ()=>{
        let customerTierValue = await customerTier();
        // console.log(typeof(customerTierValue));

        switch(customerTierValue) {
            case "1":
                permittedCoin = coin_rewards.tier1;
                break;
            case "2":
                permittedCoin = coin_rewards.tier2;
                break;
            case "3":
                permittedCoin = coin_rewards.tier3;
                break;

            default:
                permittedCoin = coin_rewards.tier1;
                break;
        }

        
    })
    
</script>
{#if coin > 0}
    <div>Get {coin} callow coins</div>
{/if}
<style>
div {
    place-self: center;
    max-width: 23em;
    padding: 1rem 0.5rem;
    font: 1.25em ubuntu, sans-serif;
    background-image: linear-gradient(90deg, #4285F4, #DB4437);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>