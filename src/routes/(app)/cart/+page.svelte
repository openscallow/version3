<script>
    import { onMount } from 'svelte';
    import { getCartItems } from './getCartItems';
    import './cart.css';

    let products = $state()

    onMount(async()=>{
        products = await getCartItems()
        console.log('page svelte', products)
    })
    //  products = [
    //     {
    //         name: "4 Compartments Plastic Pen, Pencil Holder | પેન હોલ્ડર",
    //         mrp: 186,
    //         currentPrice: 120,
    //         quantity: 2,
    //         img: "https://rukminim2.flixcart.com/image/1150/1350/k4k7f680/desk-organizer/e/c/h/1727c-pen-pencil-holder-elite-clear-colour-omega-original-imafng2vftcutpht.jpeg"
    //     },
    //     {
    //         name: "4 Compartments Plastic Pen, Pencil Holder | પેન હોલ્ડર",
    //         mrp: 186,
    //         currentPrice: 120,
    //         quantity: 2,
    //         img: "https://rukminim2.flixcart.com/image/1150/1350/k4k7f680/desk-organizer/e/c/h/1727c-pen-pencil-holder-elite-clear-colour-omega-original-imafng2vftcutpht.jpeg"
    //     },
    //     {
    //         name: "4 Compartments Plastic Pen, Pencil Holder | પેન હોલ્ડર",
    //         mrp: 186,
    //         currentPrice: 120,
    //         quantity: 2,
    //         img: "https://rukminim2.flixcart.com/image/1150/1350/k4k7f680/desk-organizer/e/c/h/1727c-pen-pencil-holder-elite-clear-colour-omega-original-imafng2vftcutpht.jpeg"
    //     }
    // ];

    // Calculate totals
    let totalItems = 5 //products.reduce((sum, product) => sum + product.quantity, 0);
    let subtotal = 0  // products.reduce((sum, product) => sum + (product.currentPrice * product.quantity), 0);

    // Calculate discount percentage
    function getDiscountPercentage(mrp, currentPrice) {
        return Math.round(((mrp - currentPrice) / mrp) * 100);
    }


    function deleteItem(index) {
        products = products.filter((_, i) => i !== index);
    }

    function proceedToBuy() {
        alert(`Proceeding to checkout with ${totalItems} items worth ₹${subtotal}`);
    }
</script>

<div class="cart-container">
    <div class="wrapper">
        <div class="cart-header">
            <h1>Subtotal: ₹{subtotal}</h1>
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
                        <button class="delete-btn" onclick={() => deleteItem(index)}>Delete</button>
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