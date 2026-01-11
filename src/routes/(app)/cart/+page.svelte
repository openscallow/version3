<script>
//----------------------------------------------------------------------------------------------------------
// Created by: Created by: Gautam mer (CEO)
// Created at: Initial
//
// Last edit by: Gautam mer (CEO)
// Edited at: 09/01/2026
// Last change: refactoring whole cart
//----------------------------------------------------------------------------------------------------------

import { onMount } from 'svelte';
import Card from '$lib/components/shared/Card.svelte';
import Button from '$lib/components/shared/Button.svelte';

    import { getCartItems } from './getCartItems';
    import { deleteItem } from './deleteItem'
    import { proceedToBuyWithCart } from './proceedToBuyWithCart'
    import './cart.css';

    let products = $state()
    let subtotal = $state()
    let callowCoins = $state()
    let totalItems = $state()
    let mrp = $state()


    onMount(async()=>{
        products = await getCartItems()
        subtotal = products.reduce((accumulator, currentObj) => accumulator + currentObj.currentPrice, 0)
        callowCoins = products.reduce((accumulator, currentObj) => accumulator + currentObj.coin_rewards.tier1, 0)
        totalItems = products.reduce((accumulator, currentObj) => accumulator + currentObj.quantity, 0)
        mrp = products.reduce((accumulator, currentObj) => accumulator + currentObj.mrp, 0)
        // console.log('page svelte', products)
    })

    // Calculate discount percentage
    function getDiscountPercentage(mrp, currentPrice) {
        return Math.round(((mrp - currentPrice) / mrp) * 100);
    }

    function get() {
        return new Promise(resolve => setTimeout(resolve, 5000));
    }

    
</script>

<div class="cart-container">
    
    <div class="wrapper">
           
        <div class="cart-header">
            <h1>Subtotal: ₹{subtotal}</h1>
            <h1 style="font-size: 1rem;">Earn callow coins: ₹{callowCoins}</h1>
            <button class="proceed-btn" onclick={()=> proceedToBuyWithCart(totalItems, subtotal, callowCoins, mrp)}>
                Proceed to buy ({totalItems} items)
            </button>
        </div>

        <div class="items-wrapper">

            {#each products as product, index}
            <Card padding="0.2rem">
                <div class="item-container">
                    <div class="image-container">
                        <img src={product.images[0]} alt="text">
                    </div>
                    <div class="content">
                        <h3>{product.productname}</h3>
                        <p>₹{product.currentPrice}.00</p>
                        <div class="action">
                            <div class="quantity-controls">
                                <button class="quantity-btn"  readonly>−</button>
                                <input type="number" class="quantity-input" value=1 readonly>
                                <button class="quantity-btn" readonly>+</button>
                            </div>
                            <Button variant='danger' mode='text' width="content-fit" onclick={() => deleteItem(product.cart_item_id, product.cart_id, products, index)}>Delete</Button>
                        </div>
                    </div>
                </div> 
            </Card>
            {/each}
        </div>
    </div>
</div>



<style>
    .item-container {
        width: 100%;
        display: flex;
    }

    .image-container {
        width: 35%;
    }

    .content {
        width: 65%;
        padding: 0px 10px;
    }

    .content h3 {
        display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;  
		line-clamp: 1;
        overflow: hidden;
        font-weight: 400;
        font-family: var(--font-family-heading);
    }

    .content p {
        font-weight: 900;
        font-family: var(--font-family-heading);
    }
    
</style>