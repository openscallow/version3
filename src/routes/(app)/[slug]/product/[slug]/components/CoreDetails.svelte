<script>
    import {ChevronRight, X} from 'lucide-svelte';
    import './CoreDetails.css';

    let { attributes } = $props()

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
        {#each attributes.slice(0, 4) as attribute}
            <div>
                <span class="label">{attribute[0]}</span>
                <span class="value">{attribute[1]}</span>
            </div>
        {/each}
    </div>
</div>

<div class="dialog-container" bind:this={dialogBox}>
    <div class="dialog-box">
        <div class="core-details-body">
            {#each attributes as attribute}
                <div>
                    <span class="label">{attribute[0]}</span>
                    <span class="value">{attribute[1]}</span>
                </div>
            {/each}
        </div>
        
        <button onclick={()=> closeDialog()}><X /></button>
    </div>
</div>





