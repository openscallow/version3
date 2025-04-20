<script lang='ts'>
    import { Check, ChevronsRight } from 'lucide-svelte';

    // props
    let { currentStep = 0, hasPromoCode = false} = $props();

</script>

<div class="stepper">
    <ul class="stepper-list">
        <li class="stepper-item">
            <a href="#blank">
                <Check class="icon" size={18} strokeWidth={2.5} />
                <span>Address</span>
            </a>
        </li>
        <li class="stepper-right-pointer">
            <ChevronsRight size={16} />
        </li>
        <li class="stepper-item">
            <a href="#blank">
                <Check class="icon" size={18} strokeWidth={2.5} />
                <span>Promo code</span>
            </a>
        </li>
        <li class="stepper-right-pointer">
            <ChevronsRight size={16} />
        </li>
        <li class="stepper-item">
            <a href="#blank">
                <Check class="icon inactive" size={18} strokeWidth={2.5} />
                <span>Order Summary</span>
            </a>
        </li>
    </ul>
</div>

<style>
    .stepper {
        width: 100%;
        padding: 1rem;
        display: flex; 
        align-items: center;
        justify-content: flex-start;
        border: 1px solid black;
        border-radius: 5px;
        overflow-x: auto; /* Allow horizontal scrolling on very small screens */
    }

    .stepper-list {
        display: flex;
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 0;
        align-items: center;
        flex-wrap: nowrap; /* Prevent wrapping */
        min-width: max-content; /* Ensure content doesn't compress too much */
    }

    .stepper-item {
        display: flex;
        align-items: center;
    }

    .stepper-item a {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        text-decoration: none;
        color: inherit;
    }

    .stepper-right-pointer {
        display: flex;
        align-items: center;
        color: #888;
    }

    /* Icon styling */
    :global(.icon) {
        border: 1px solid green;
        border-radius: 50%;
        padding: 3px;
    }

    :global(.icon.inactive) {
        border-color: grey;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
        .stepper {
            padding: 0.8rem 0.5rem;
            border-radius: 3px;
        }
        
        .stepper-list {
            gap: 0.5rem;
        }
        
        .stepper-item a {
            font-size: 14px;
            gap: 0.25rem;
        }

        :global(.icon) {
            padding: 2px;
        }
    }

    @media (max-width: 480px) {
        .stepper-item a span {
            font-size: 10px;
        }
        
        .stepper-list {
            gap: 0.3rem;
        }
    }
</style>