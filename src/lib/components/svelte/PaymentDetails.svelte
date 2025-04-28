<script>
    import { 
        get_institute_name,
        get_subtotal,
        get_discount_amount,
        get_used_coin,
        get_total_amount,
        placeOrder
    } from '$lib/components/ts/checkoutStateVariables.svelte';

    
</script>

<div class="paymentDetail-section">
    <h2 class="section-title">Payment Details</h2>

    <label for="school">School / College</label> <br>
    <input type="text" id="school" name="school" value={get_institute_name()} readonly>

    <ul>
        <li><span>Subtotal</span><span>₹{get_subtotal()}</span></li>
        <li><span>Discount</span><span>-₹{get_discount_amount()}</span></li>
        <li><span>Shipping</span><span>Free</span></li>
        {#if get_used_coin()}
        <li><span>Used Coin</span><span>-cc {get_used_coin()}</span></li>
        {/if}
    </ul>

    <div class="totalAmount">
        <span>Total </span>
        <span>₹{get_total_amount()} </span>
    </div>

    <button onclick={(event)=> placeOrder(event)}>Place Order</button>
</div>

<style>
    .paymentDetail-section .section-title {
        font-size:1.5rem;
    }
    ul {
        margin-top: 1rem;
        padding: 1rem;
        border: 1px solid black;
        border-left: none;
        border-right: none;
    }

    ul li{
        display: flex;
        justify-content: space-between;
    }

    .totalAmount{
        margin-top: 0.1rem;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 3px;
    }
    button {
        width: 100%;
        border-radius: 3px;
        color: white;
        padding: 0.5rem;
        background-color: #111827;
    }
</style>