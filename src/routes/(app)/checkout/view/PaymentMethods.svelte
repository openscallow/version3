<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: initial
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 22/11/2025
 * Last change: file locatin $lib/components/svelte/ -> checkout/view and handlePaymentMethodChange() incorporedted
 * 
*/
import { customerCallowCoins } from '$lib/components/ts/customer_correlated.svelte';
import { updatePledgeCoins } from '../model/pledgeCoins.svelte';
import { updatePaymentMethod } from '../model/paymentMethod.svelte';
import { getTotalAmount, updateTotalAmount, computeUnpledgedTotal } from '../model/totalAmount.svelte';

let totalAmount = $state(getTotalAmount());
const callowCoins = customerCallowCoins()?.B;

function handlePaymentMethodChange(isCashAndCoins: boolean) {
    if (isCashAndCoins) {
        if(!callowCoins) return null;
        if (callowCoins > totalAmount.value) {
            updatePledgeCoins(totalAmount.value)
            updatePaymentMethod(2)
            updateTotalAmount(0)
        } else {
            updatePledgeCoins(callowCoins)
            updatePaymentMethod(2)
            updateTotalAmount(totalAmount.value - callowCoins)
        }
    } else {
        updatePaymentMethod(1)
        updatePledgeCoins(0)
        computeUnpledgedTotal()
    }
}
</script>
<div class="paymentOpt-section">
    <h2 class="section-title">Payment Methods</h2>
    <div class="payment-option one">
        <input type="radio" name="payment" id="cash" value="cash" checked onchange={()=>{
            handlePaymentMethodChange(false)
            }}> 
        <label for="cash">
            <div class="option-content">
              <span class="option-content-title">Cash</span>
              <p class="option-content-description">Make payments conveniently using cash only</p>
            </div>
        </label>
    </div>

    <div class="payment-option two">
        <input type="radio" name="payment" id="cash-coins" value="cash-coins" onchange={()=>{handlePaymentMethodChange(true)
    
        }}>
        <label for="cash-coins">
            <div class="option-content">
              <span class="option-content-title">Cash + coins</span>
              <p class="option-content-description">Callow Coin and cash for flexible payment options <a href="./checkout/coinTerms" class="terms-link">terms*</a></p>
            </div>
        </label>   
    </div>
</div>

<style>
    .paymentOpt-section {
        width: 100%;
        padding: 0.5rem;
    }
    .paymentOpt-section .section-title {
        font-size:1.5rem;
    }

    .paymentOpt-section .payment-option{
        display: flex;
        margin: 0.5rem 0rem;
        padding: 0.5rem;
        flex-direction: row-reverse;
        justify-content: start;
    }

    .payment-option input{
        display: none;
    }

    .payment-option input, .payment-option label{
        cursor: pointer;
    }

    .payment-option:has(input) {
        border: 1px solid grey;
        border-radius: 3px;
    }

    .payment-option:has(input:checked) {
        border: 1px solid black;
        border-radius: 3px;
        background-color: #f0f0f0;
    }

    .option-content-title{
        font-size: 1.2rem;
        
    }

    .option-content-description{
        font-size: 0.9rem;
        color: #888;
    }

    /* Responsive styles */
    @media (max-width: 480px) {
        .paymentOpt-section .section-title {
            font-size:1.1rem;
        }
    }
</style>