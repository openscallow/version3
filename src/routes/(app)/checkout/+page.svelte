<script>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: initial file
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 24/10/2025
 * Last change: initializeTotalAmount() incorporated on onMount and remove old redundant code
 * 
*/

import { onMount } from 'svelte';
import CheckoutStepper from '$lib/components/svelte/CheckoutStepper.svelte';
import PaymentMethods from './view/PaymentMethods.svelte';
import PaymentDetails from './view/PaymentDetails.svelte';
import userRedirct from './utility/userRedirect';
import addPotentialCustomer from './utility/addPotentialCustomer'
import { preloadCode } from '$app/navigation';

onMount(()=>{
    userRedirct()
    addPotentialCustomer()
    preloadCode('/checkout/success');
    })
</script>

<div class="wrapper">
    <CheckoutStepper />
    <div class="Order-section">
        <h1 class="section-title">Order Summary</h1>
        <p class="section-subtitle">Check your items. And select a suitable payment method.</p>
        <div class="container">
            <PaymentMethods />
            <PaymentDetails />
        </div>
    </div>
</div>

<style>
    .wrapper {
        width: 100%;
        padding: 1rem;
    }

    .Order-section {
        width: 100%;
        padding-top: 1rem;
    }

    .Order-section .section-title {
        text-align: left;
        font-size: 2rem;
    }

    .Order-section .container {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 3fr 4fr;
        gap: 1rem;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
        /* .payment-section {
            width: 100%;
        } */

        .Order-section .container {
            margin-top: 2rem;
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }

    @media (max-width: 480px) {
        .Order-section .section-title {
            text-align: left;
            font-size: 1.5rem;
        }

        .Order-section .section-subtitle {
            font-size: 0.9rem;
        }
    }

</style>