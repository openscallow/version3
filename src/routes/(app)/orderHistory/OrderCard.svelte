<script>
    import { getProductImageSrc } from '$lib/components/ts/getProductImageSrc';
    import { handelCancel } from './handelCancel';
    import { getDeliveryWindow } from './getDeliveryWindow';

    let {
        productId,
        productName,  
        total, 
        instituteName, 
        discount, 
        qunatity,
        order_id
    } = $props()

    let unOrderList; //ul
    let collapsible; //button

    function collapse(unOrderList){
        if(unOrderList.style.maxHeight){
            collapsible.style.borderTopWidth = '0px';
            collapsible.innerText = 'Read more';
            unOrderList.style.maxHeight = null;
            unOrderList.classList.remove('expanded');
        }else{
            collapsible.style.borderTopWidth = '1px';
            collapsible.innerText = 'Read less';
            unOrderList.classList.add('expanded');
            unOrderList.style.maxHeight = unOrderList.scrollHeight + 'px';
        }
    }
</script>

<div class="product-card">
    <div class="product-summary">
        <figure>
            {#await getProductImageSrc(productId)}
                <p>fetching product imag...</p>
            {:then value}
                <img src={value} alt="product short description">
            {:catch error}
                <p>Something went wrong: {error.message}</p>
            {/await} 
        </figure>
        <div class="info">
            <h2>{productName}</h2>
            <p><b>total: ₹{total}</b></p>   
        </div>
    </div>
    <div class="product-actions">
        <ul bind:this={unOrderList}>
            <li>school: {instituteName}</li>
            <li>mrp: ₹{Number(discount) + Number(total)}.00</li>
            <li>discount: ₹{discount}</li>
            <li>quantity: {qunatity}</li>
            <li>delivery: 
                {#await getDeliveryWindow(instituteName)}
                    <span>Loading...</span>
                {:then deliveryWindow}
                    <span>{deliveryWindow.slot[0]}</span> -
                    <span>{deliveryWindow.slot[1]}</span>
                {:catch error}
                    <span>Error loading delivery window</span>
                {/await}
            </li>
            <li><button onclick={() => handelCancel(order_id)}>cancel</button></li>
        </ul>
        <button type="button" class="collapsible" onclick={()=> collapse(unOrderList)} bind:this={collapsible}>Read more</button>
    </div>
</div>

<style>
    .product-card{
        border-width: 1px;
        border-radius: 3px;
        border-color: black;
        background-color: white;
    }

    .product-summary{
        padding: 1rem;
        display: flex;
        gap: 1rem;
    }

    .product-summary figure{
        flex: 1;
    }

    figure img{
        width: 200px;
    }

    .product-summary .info{
        flex: 2;
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
        justify-content: center;
    }

    .info h2{
        font-size: 1rem;
    }

    .product-actions{
        border-top-width: 1px;
        border-top-color: black;
    }
    
    .product-actions ul{
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.3s ease-out, margin 0.3s ease-out;
        margin: 0rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    ul.expanded {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    ul li:nth-child(1){
        margin-top: 1rem;
    }

    ul li:nth-child(5) {
        margin-bottom: 1rem;
    }

    ul li:nth-child(6) {
        border-top-style: dashed;
        border-top-width: 1px;
        border-top-color: black;
        color: rgba(255, 27, 27, 0.801);
    }

    .collapsible{
        width: 100%;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        color: white;
        border-top-color: black;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        background: linear-gradient(152deg,rgba(235, 221, 33, 1) 21%, rgba(237, 83, 83, 1) 96%);
    }
</style>