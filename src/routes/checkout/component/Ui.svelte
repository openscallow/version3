<script>
    import '@tailwind'
    import { onMount } from 'svelte';
    import userRedirect from '../utility/userRedirect'
     // variable check
     onMount(()=>{
        userRedirect()   
    }) 
    let subtotal = $state(100)
    let customer_correlated 
    let product 
    // data collection for submit 
    let customer_id
    let institute_name = $state()
    let items_count
    let total_amount = $state()
    let discount_amount = $state()
    let promo_code = $state(null)
    let promo_code_val = $state(null)
    let payment_method = $state()
    let assignment_id = $state()
    let loading = $state(false)

    onMount(()=>{
      customer_correlated = JSON.parse(localStorage.getItem('customer_correlated'))
      product = JSON.parse(sessionStorage.getItem('product'))
      subtotal =parseInt(product.actualPrice) * parseInt(product.quantity)
      customer_id = customer_correlated.i
      institute_name = localStorage.getItem('institute_name')
      items_count = [product.id, product.quantity];
      discount_amount =(parseInt(product.actualPrice) - parseInt(product.currentPrice)) * parseInt(product.quantity)
      payment_method = (document.getElementById('radio_1').checked ? 1 : 2)
      total_amount = subtotal - discount_amount
      
    })
    onMount(()=>{
      if(sessionStorage.getItem('discount_percentage') || sessionStorage.getItem('discountamount')){
        promo_code = sessionStorage.getItem('coupon')
        assignment_id = sessionStorage.getItem('assignment_id')
        if (sessionStorage.getItem('discount_percentage')){
          promo_code_val = sessionStorage.getItem('discount_percentage')
          total_amount = Math.floor(subtotal  - (subtotal * (promo_code_val/100)) - discount_amount)
          promo_code_val = `${Math.floor(promo_code_val)}%`
          console.log(customer_id,institute_name,items_count,discount_amount,promo_code,total_amount, payment_method)
        }else{
          promo_code_val = sessionStorage.getItem('discountamount')
          total_amount = Math.floor(total_amount - promo_code_val - discount_amount)
          console.log(customer_id,institute_name,items_count,discount_amount,promo_code_val,total_amount, payment_method)
          promo_code_val = `₹${promo_code_val}`
        }
      }
    })

    async function listOrder() {
      let btn = document.getElementById('btn')
      btn.disabled = true;
      loading = true
      payment_method = (document.getElementById('radio_1').checked ? 1 : 2)
      try {
        let response = await fetch('./checkout/component',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({customer_id,institute_name,items_count,discount_amount,promo_code,total_amount, payment_method})
        })

        if(response.status === 200){
          if(promo_code && promo_code !== 'WELCOME50'){
            updateCoponUsage()
          }
          else{
            if(promo_code === 'WELCOME50'){
              document.cookie = "WELCOME50=true; max-age=3600; path=/";
              console.log('The cookie "WELCOME50" is set');
            }
            sessionStorage.removeItem('discountamount')
            sessionStorage.removeItem('discount_percentage')
            sessionStorage.removeItem('coupon')
            window.location.href = '/'
          }
        }
        let data = await response.text()
        console.log(data)
      } catch (error) {
        console.log("something went wrong")
      }
    }

    function updateCoponUsage(){
      fetch('/api/couponUsageUpdate',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({assignment_id})
      }).then(res => {
        if(res.status === 200){
          sessionStorage.removeItem('discountamount')
          sessionStorage.removeItem('discount_percentage')
          sessionStorage.removeItem('coupon')
          window.location.href = '/'
        }
      })
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
          {#if promo_code_val}
          <li class="flex items-center space-x-3 text-left sm:space-x-4">
            <a class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" aria-label="Go to address" href="/coupon"
              ><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
            ></a>
            <span class="font-semibold text-gray-900">Cooupon code</span>
          </li>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {:else}
          <li class="flex items-center space-x-3 text-left sm:space-x-4">
            <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/coupon">2</a>
            <span class="font-semibold text-gray-900">Cooupon code</span>
          </li>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {/if}   
          <li class="flex items-center space-x-3 text-left sm:space-x-4">
            <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="/checkout">3</a>
            <span class="font-semibold text-gray-500">Order Summary</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div class="px-4 pt-8">
      <p class="text-xl font-medium">Order Summary</p>
      <p class="text-gray-400">Check your items. And select a suitable payment method.</p>
      
      <p class="mt-8 text-lg font-medium">Payment Methods</p>
      <form class="mt-5 grid gap-6">
        <div class="relative">
          <input class="peer hidden" id="radio_1" type="radio" name="radio" checked/>
          <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
            <div class="ml-5">
              <span class="mt-2 font-semibold">Cash</span>
              <p class="text-slate-500 text-sm leading-6">Make payments conveniently using cash only</p>
            </div>
          </label>
        </div>
        <div class="relative">
          <input class="peer hidden" id="radio_2" type="radio" name="radio"/>
          <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
            <div class="ml-5">
              <span class="mt-2 font-semibold">Cash + Coins</span>
              <p class="text-slate-500 text-sm leading-6">Callow Coin and cash for flexible payment options <a href="http://" target="_blank"  class="text-blue-500" rel="noopener noreferrer">terms*</a></p>
            </div>
          </label>
        </div>
      </form>
    </div>
    <div class="mt-10  px-8 pt-8 lg:mt-0">
      <p class="text-xl font-medium">Payment Details</p>
      <p class="text-gray-400">Finish your order with a quick click on the checkout button!</p>
      <div class="">
        <label for="email" class="mt-4 mb-2 block text-sm font-medium">school / college</label>
        <div class="relative">
          <input type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={institute_name} readonly  />
          <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        </div>
  
        <!-- Total -->
        <div class="mt-6 border-t border-b py-2">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Subtotal</p>
            <p class="font-semibold text-gray-700">₹{subtotal}</p>
          </div>
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">discount</p>
            <p class="font-semibold text-green-700">- ₹{discount_amount}</p>
          </div>
          {#if promo_code_val}
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">promo code </p>
            <p class="font-semibold text-green-700">- {promo_code_val}</p>
          </div>
          {/if}
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Shipping</p>
            <p class="font-semibold text-green-700">Free</p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Total</p>
          <p class="text-2xl font-semibold text-gray-900">₹{total_amount}</p>
        </div>
      </div>
      <button id="btn" onclick={()=>{listOrder()}} class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
        {#if loading}
        <span class="loading loading-spinner loading-md"></span>
        {/if}
        Place Order</button>
    </div>
  </div>