<script>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: initial
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 22/11/2025
 * Last change: file locatin $lib/components/svelte/ -> checkout/view
 * 
*/
import { getSubTotal } from '../model/subTotal';
import { getDiscount } from '../model/discount';
import { getTotalAmount} from '../model/totalAmount.svelte';
import { institute_name } from '$lib/components/ts/getInstituteName';
import { getPledgeCoins } from '../model/pledgeCoins.svelte';
import { placeOrder } from '../model/placeOrder';

let subTotal = $state(getSubTotal());
let discount = $state(getDiscount());
let totalAmount = $state(getTotalAmount());



</script>
<div class="paymentDetail-section">
    <h2 class="section-title">Payment Details</h2>
    <label for="school">School / College</label> <br>
    <input type="text" id="school" name="school" value={institute_name} readonly>
    <ul>
        <li><span>Subtotal</span><span>₹{subTotal}</span></li>
        <li><span>Discount</span><span>-₹{discount}</span></li>
        <li><span>Shipping</span><span>Free</span></li>
        {#if getPledgeCoins() > 0}
        <li><span>Used Coin</span><span>-cc {getPledgeCoins()}</span></li>
        {/if}
    </ul>
    <div class="totalAmount">
        <span>Total </span>
        <span>₹{totalAmount.value} </span>
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