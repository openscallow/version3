<script>
    import '@tailwind';
import { onMount } from 'svelte';

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
    if (await isCoupon()) {
        let customer_correlated = JSON.parse(localStorage.getItem('customer_correlated') || '{}');
        let i = customer_correlated?.i;
        if (!i) {
            resetSessionAndButtons();
            return false;
        }

        try {
            let response = await fetch('./coupon/api/eligible', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ i, coupon })
            });

            if (response.ok) {
                if (sessionStorage.getItem('discount_percentage')) {
                    code_discount = `${sessionStorage.getItem('discount_percentage')}%`;
                } else if (sessionStorage.getItem('discountamount')) {
                    code_discount = `₹${sessionStorage.getItem('discountamount')}`;
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
    } else {
        resetSessionAndButtons();
    }
}

async function isCoupon() {
    coupon = document.getElementById('couponCode')?.value;

    try {
        let response = await fetch('./coupon/api/validate-coupon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coupon })
        });

        if (response.ok) {
            let { discountamount, discount_percentage } = await response.json();
            if (discount_percentage) {
                sessionStorage.setItem("discount_percentage", discount_percentage);
            } else {
                sessionStorage.setItem("discountamount", discountamount);
            }
            sessionStorage.setItem('coupon', coupon);
            return true;
        } else {
            resetSessionAndButtons();
            return false;
        }
    } catch (error) {
        console.error("Error during coupon validation:", error);
        resetSessionAndButtons();
        return false;
    }
}
</script>
<div class="m-2 flex flex-col items-center border-b bg-white/40 backdrop-blur-md shadow-sm  py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <div class=" py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <div class="relative">
        <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
          <li class="flex items-center space-x-3 text-left sm:space-x-4">
            <a class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" aria-label="Go to address" href="/adderss"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
            ></a>
            <span class="font-semibold text-gray-900">Adderss</span>
          </li>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          
          <li class="flex items-center space-x-3 text-left sm:space-x-4">
            <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/coupon">2</a>
            <span class="font-semibold text-gray-900">Cooupon code</span>
          </li>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <li class="flex items-center space-x-3 text-left sm:space-x-4">
            <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="/checkout">3</a>
            <span class="font-semibold text-gray-500">Order Summary</span>
          </li>
        </ul>
      </div>
    </div>
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