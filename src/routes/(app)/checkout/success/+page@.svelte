<script lang="ts">
/**
 * Created by: Gautam mer (CEO)
 * Created at: 06/01/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 06/01/2025
 * Last change: initialize
 * 
*/
import '@styles';
import { CircleCheck } from 'lucide-svelte';
import Button from '$lib/components/shared/Button.svelte';


function redirect(path: string) {
    window.location.href = path
}

</script>
<div class="container">
    <div class="wrapper">
        <div class="icon-wrapper">
            <div class="icon">
                <CircleCheck size={120} strokeWidth={1} color="#40e440" class="x"/>
            </div>  
            <h1>Order Confirmed!</h1>
        </div> 
        <p class="subtitle">Thank you for your purchase. We'll send a confirmation whatsApp message shortly.</p>
        <Button variant="success" mode="outline" onclick={(e)=> redirect('/')}>Go to Home</Button>
    </div>
</div>

<style>
    .container {
        width: 100%;
        max-height: 100vh;
        display: grid;
        justify-content: center;
    }
    
    .wrapper {
        max-width: 600px;
        min-height: 100vh;
        height: 100%;
        padding: 1rem;
        position: relative;
        display: flex;
        gap: 40px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
    }

    .wrapper .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:40px;
    }

    .wrapper .icon-wrapper .icon{
        animation: scaleIn 0.5s ease-out;
    }

    @keyframes scaleIn {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .wrapper h1 {
        font-family: var(--font-family-button);
    }

    .wrapper p {
        font-family: var(--font-family-button);
    }
</style>