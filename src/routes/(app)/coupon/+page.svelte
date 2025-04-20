<script>
    import '@tailwind';
    import { onMount } from 'svelte';
    import CheckoutStepper from '$lib/components/svelte/CheckoutStepper.svelte';

let coupon;
let code_discount;
let message;
let btnsummary;
let btnApply;

function resetSessionAndButtons() {
    sessionStorage.removeItem("discount_percentage");
    sessionStorage.removeItem("discountamount");
    sessionStorage.removeItem("coupon");
    if (btnsummary) btnsummary.disabled = false;
    if (btnApply) btnApply.disabled = false;
    message = "Coupon is invalid or an error occurred.";
}

onMount(() => {
    // Consider using bind:this for safer element binding
    btnsummary = document.getElementById('btnsummary');
    btnApply = document.getElementById('btnApply');
});

async function redeemCoupon() {
        let customer_correlated = JSON.parse(localStorage.getItem('customer_correlated') || '{}');
        let i = customer_correlated?.i;
        coupon = document.getElementById('couponCode').value;
        if (!i) {
            resetSessionAndButtons();
            return false;
        }

        if(!coupon){
            resetSessionAndButtons();
            return false;
        }

        if (document.cookie.split(';').some(item => item.trim().startsWith('WELCOME50='))) {
            console.log('The cookie "WELCOME50" is already set');
            resetSessionAndButtons();
            return false;
        }

        sessionStorage.setItem('coupon', coupon)

        try {
            let response = await fetch('./coupon/api/eligible', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ i, coupon })
            });

            if (response.ok) {
                let {is_eligible, discount_amount, discount_percentage, assignment_id} = await response.json();
                if(is_eligible){
                    // Used ternary operator 
                    code_discount = discount_percentage ?  `${discount_percentage}%` : `₹${discount_amount}`;

                    sessionStorage.setItem('discountamount', discount_amount)
                    sessionStorage.setItem('assignment_id', assignment_id)
                    sessionStorage.setItem('discount_percentage', discount_percentage)

                }
                else{
                    resetSessionAndButtons();
                }
                btnsummary.disabled = false;
                btnApply.disabled = false;
            } else {
                resetSessionAndButtons();
            }
        } catch (error) {
            console.error("Error during coupon redemption:", error);
            resetSessionAndButtons();
        }  
}
</script>
<div class="wrapper">
  <CheckoutStepper />
</div>


<div class="lg:flex lg:flex-row">
  <div class="w-full flex flex-1 flex-col justify-center lg:justify-start items-center p-4  lg:pt-0">
    <div class="bg-white w-full rounded-md ">
        <h2 class="pb-4 border-b-2 p-4">Apply coupons</h2>
        <div class="join w-full p-4">
            <input id="couponCode" class="input input-bordered join-item w-full" type="text" placeholder="Apply your coupons here"/>
            <div class="h-full w-4 join-item"></div>
            <button id="btnApply" class="btn join-item bg-blue-500 w-1/4"  onclick={()=>{
              btnsummary.disabled = true
              btnApply.disabled = true
              redeemCoupon()}}>Apply</button>
        </div>
        {#if message}
        <span class="text-red-500 ml-4 pb-4 text-lg">-invalid coupon code</span>
        {/if}
    </div>
</div>

<div class=" flex flex-col flex-1 justify-center items-center px-4">
    <div class="bg-white w-full rounded-md ">
        <h2 class="pb-4 border-b-2 p-4">Checkout</h2>
       
        <div class="flex items-center justify-between px-4 py-2">
            <p class="text-sm font-medium text-gray-900">Code discount</p>
            <p class="font-semibold text-red-700">{code_discount}</p>
        </div>
    </div>
    <button id="btnsummary" class="btn mt-4 w-full bg-neutral text-white"><a href="/checkout" class="w-full visited:text-white">Order summary</a></button>
</div>
</div>

<style>
  .wrapper {
        width: 100%;
        padding: 1rem;
    }
</style>