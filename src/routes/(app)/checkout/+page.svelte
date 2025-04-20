<script>
    import Ui from './component/Ui.svelte'
    import CheckoutStepper from '$lib/components/svelte/CheckoutStepper.svelte';
    import PaymentMethods from '$lib/components/svelte/PaymentMethods.svelte';
    
    
    
</script>
<div class="wrapper">
    <CheckoutStepper />
    <div class="Order-section">
        <h1 class="section-title">Order Summary</h1>
        <p class="section-subtitle">Check your items. And select a suitable payment method.</p>

        <div class="container">
            <PaymentMethods />
        </div>

    </div>
</div>

<Ui/>

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
        font-size: 1.5rem;
    }

    /* Responsive styles */
    /* @media (max-width: 768px) {
        .payment-section {
            width: 100%;
        }
    } */

    /* @media (max-width: 480px) {
        .payment-section {
            width: 100%;
        }
    } */

</style>


