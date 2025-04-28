<script lang='ts'>
    import { 
        get_total_amount,
        handlePaymentMethodChange 
    } from '$lib/components/ts/checkoutStateVariables.svelte';
   

</script>
<div class="paymentOpt-section">
    <h2 class="section-title">Payment Methods</h2>
    <div class="payment-option one">
        <input type="radio" name="payment" id="cash" value="cash" checked onchange={()=>handlePaymentMethodChange(false)}> 
        <label for="cash">
            <div class="option-content">
              <span class="option-content-title">Cash</span>
              <p class="option-content-description">Make payments conveniently using cash only</p>
            </div>
        </label>
    </div>

    <div class="payment-option two">
        <input type="radio" name="payment" id="cash-coins" value="cash-coins" onchange={()=>handlePaymentMethodChange(true)}>
        <label for="cash-coins">
            <div class="option-content">
              <span class="option-content-title">Cash + coins</span>
              <p class="option-content-description">Callow Coin and cash for flexible payment options <a href="#" class="terms-link">terms*</a></p>
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