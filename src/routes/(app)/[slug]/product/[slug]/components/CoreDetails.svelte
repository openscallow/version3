<script>
    import {ChevronRight, X} from 'lucide-svelte';
    import './CoreDetails.css'

    let dialogBox;

    function closeDialog() {
        dialogBox.style.display = 'none'
    }

    function openDialog() {
        dialogBox.style.display = 'block'
    }
</script>

<div class="core-details-container">
    <div class="core-details-header">
        <h2 style="color: black;">core details</h2>
        <ChevronRight style="cursor: pointer; color: black;" onclick={()=> openDialog()}/>
    </div>
    <div class="core-details-body">
        <div>
            <span class="label">Brand</span>
            <span class="value">Doms</span>
        </div>
        <div>
            <span class="label">Pack</span>
            <span class="value">1 pcs</span>
        </div>
        <div>
            <span class="label">Extra item</span>
            <span class="value">sharpener</span>
        </div>
        <div>
            <span class="label">Brand</span>
            <span class="value">Doms</span>
        </div>
    </div>
</div>

<div class="dialog-container" bind:this={dialogBox}>
    <div class="dialog-box">
        <div class="core-details-body">
            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>
            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>
            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>
            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>

            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>
            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>

            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>
            <div>
                <span class="label">Brand</span>
                <span class="value">Doms</span>
            </div>
        </div>
        
        <button onclick={()=> closeDialog()}><X /></button>
    </div>
</div>





