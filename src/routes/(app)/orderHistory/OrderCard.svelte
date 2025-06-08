<script>
    // let {
    //     image, 
    //     productName, 
    //     brand, 
    //     total, 
    //     instituteName, 
    //     mrp, 
    //     discount, 
    //     qunatity
    // } = $props()

    let unOrderList; //ul
    let collapsible; //button

    function collapse(unOrderList){
        if(unOrderList.style.maxHeight){
            collapsible.style.borderTopWidth = '0px';
            collapsible.innerText = 'Read more';
            unOrderList.style.maxHeight = null;
            unOrderList.style.padding = '0rem';
        }else{
            collapsible.style.borderTopWidth = '1px';
            collapsible.innerText = 'Read less';
            unOrderList.style.padding = '1rem';
            unOrderList.style.maxHeight = unOrderList.scrollHeight + 'px';
        }
    }
</script>

<div class="product-card">
    <div class="product-summary">
        <figure>
            <img src="https://rukminim2.flixcart.com/image/416/416/kfvfwy80/calculator/q/u/d/deli-39231b-original-imafw8ryytmanhgt.jpeg" alt="product short description">
        </figure>
        <div class="info">
            <h2>Deli 39231B deli calulator Basic Calculator (12 Digit)</h2>
            <p><b>total: ₹300.00</b></p>   
        </div>
    </div>
    <div class="product-actions">
        <ul bind:this={unOrderList}>
            <li>school: Gitanjali School</li>
            <li>mrp: ₹20.00</li>
            <li>discount: ₹40.00</li>
            <li>quantity: 1</li>
            <li>delivery: 07:50 AM - 08:00 AM</li>
        </ul>
        <button type="button" class="collapsible" onclick={()=> collapse(unOrderList)} bind:this={collapsible}>Read more</button>
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
    }
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
        transition: max-height 0.3s ease-out;
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