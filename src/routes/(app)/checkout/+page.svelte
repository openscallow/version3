<script>
    // import Ui from './component/Ui.svelte'
    import CheckoutStepper from '$lib/components/svelte/CheckoutStepper.svelte';
    import PaymentMethods from '$lib/components/svelte/PaymentMethods.svelte';
    import PaymentDetails from '$lib/components/svelte/PaymentDetails.svelte';
    import userRedirct from './utility/userRedirect';
    import addPotentialCustomer from './utility/addPotentialCustomer'
    
    
    import { 
        initializeCheckoutData, 
        applyPromoCodeIfAvailable 
    } from '$lib/components/ts/checkoutStateVariables.svelte';
    import { onMount } from 'svelte';

    let disabled = true;
    onMount(()=>{
        userRedirct()

        // active placeOrder button after 2 second
        setTimeout(()=>{
            disabled = false
        }, 2000)

        addPotentialCustomer()


        initializeCheckoutData()
        applyPromoCodeIfAvailable()
    })
</script>
<div class="wrapper">
    <CheckoutStepper />
    <div class="Order-section">
        <h1 class="section-title">Order Summary</h1>
        <p class="section-subtitle">Check your items. And select a suitable payment method.</p>

        <div class="container">
            <PaymentMethods />
            <PaymentDetails {disabled}/>
        </div>

    </div>
</div>

<!-- <Ui/> -->

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


