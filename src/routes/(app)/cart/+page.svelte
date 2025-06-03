<script>
    import { onMount } from 'svelte';
    import { getCartItems } from './getCartItems';
    import { deleteItem } from './deleteItem'
    import './cart.css';

    let products = $state()
    let subtotal = $state()
    let callowCoins = $state()
    let totalItems = $state()

    let isLoading = $state(true)

    onMount(async()=>{
        products = await getCartItems()
        subtotal = products.reduce((accumulator, currentObj) => accumulator + currentObj.currentPrice, 0)
        callowCoins = products.reduce((accumulator, currentObj) => accumulator + currentObj.coin_rewards.tier1, 0)
        totalItems = products.reduce((accumulator, currentObj) => accumulator + currentObj.quantity, 0)
        console.log('page svelte', products)
    })

    // Calculate discount percentage
    function getDiscountPercentage(mrp, currentPrice) {
        return Math.round(((mrp - currentPrice) / mrp) * 100);
    }


    // function deleteItem(index) {
    //     products = products.filter((_, i) => i !== index);
    // }

    function proceedToBuy() {
        alert(`Proceeding to checkout with ${totalItems} items worth ₹${subtotal}`);
    }
</script>
<!-- {#if isLoading} -->
    <div class="overlay">
        <div class="spinner">dfddfdfgdfdfgdfgd</div>
    </div>
<!-- {/if} -->

<div class="cart-container">
    <div class="wrapper">
        <div class="cart-header">
            <h1>Subtotal: ₹{subtotal}</h1>
            <h1 style="font-size: 1rem;">Earn callow coins: ₹{callowCoins}</h1>
            <button class="proceed-btn" onclick={proceedToBuy}>
                Proceed to buy ({totalItems} items)
            </button>
        </div>

        <div class="items-wrapper">
            {#each products as product, index}
                <div class="item">
                    <div class="descriptive-info">
                        <div class="image-container">
                            <img src={product.images[0]} alt="Product">
                        </div>
                        <div class="text-container">
                            <h3>{product.productName}</h3> 
                            <div class="price-info">
                                <span class="discount">-{getDiscountPercentage(product.mrp, product.currentPrice)}%</span>
                                <span class="current-price">₹{product.currentPrice}</span>
                                <span class="mrp">M.R.P: ₹{product.mrp}</span>
                            </div>
                        </div>
                    </div>
                    <div class="action">
                        <div class="quantity-controls">
                            <button class="quantity-btn"  readonly>−</button>
                            <input type="number" class="quantity-input" bind:value={product.quantity} readonly>
                            <button class="quantity-btn" readonly>+</button>
                        </div>
                        <button class="delete-btn" onclick={() => deleteItem(product.cart_item_id, product.cart_id, products, index)}>Delete</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>



<style>
    :global(*) {
        box-sizing: border-box;
    }
</style>