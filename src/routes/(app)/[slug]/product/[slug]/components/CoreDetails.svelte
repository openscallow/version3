<script>
    import {ChevronRight, X} from 'lucide-svelte';
    import './CoreDetails.css'

    let dialogBox;

    function closeDialog() {
        dialogBox.style.display = 'none'
    }

    function openDialog() {
        dialogBox.style.display = 'block'
        // dialogBox.style.minWidth = '50%'
    }
</script>

<div class="core-details-container">
    <div class="core-details-header">
        <h2>core details</h2>
        <ChevronRight style="cursor: pointer; " onclick={()=> openDialog()}/>
    </div>
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





