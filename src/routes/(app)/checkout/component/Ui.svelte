<script>
  import '@tailwind';
  import { onMount } from 'svelte';
  import userRedirect from '../utility/userRedirect';
  
  // State management
  let subtotal = $state(100);
  let total_amount = $state(0);
  let discount_amount = $state(0);
  let promo_code = $state(null);
  let promo_code_val = $state(null);
  let payment_method = $state(1); // Default to cash (1)
  let used_coin = $state(null);
  let coin_balance = $state(null);
  let loading = $state(false);
  
  // Customer and pending_order data
  let customer_correlated;
  let pending_order;
  let customer_id;
  let institute_name = $state('');
  let items_count;
  let assignment_id = $state(null);
  
  // Initialize data on component mount
  onMount(() => {
      userRedirect();
      initializeCheckoutData();
      applyPromoCodeIfAvailable();
  });
  
  function initializeCheckoutData() {
      customer_correlated = JSON.parse(localStorage.getItem('customer_correlated') || '{}');
      pending_order = JSON.parse(sessionStorage.getItem('pending_order') || '{}');
      
      if (pending_order && pending_order.actualPrice && pending_order.quantity) {
          subtotal = parseInt(pending_order.actualPrice) * parseInt(pending_order.quantity);
          discount_amount = (parseInt(pending_order.actualPrice) - parseInt(pending_order.currentPrice)) * parseInt(pending_order.quantity);
          total_amount = subtotal - discount_amount;
      }
      
      customer_id = customer_correlated?.i;
      institute_name = localStorage.getItem('institute_name') || '';
      console.log(institute_name);
      console.log(pending_order)
      if (pending_order?.id && pending_order?.quantity) {
        console.log("pending_order ID:", pending_order.id);
        console.log("pending_order Quantity:", pending_order.quantity);
          items_count = [pending_order.id, pending_order.quantity];
          console.log("Items count:", items_count);
      }
  }
  
  function applyPromoCodeIfAvailable() {
      const hasDiscountPercentage = sessionStorage.getItem('discount_percentage');
      const hasDiscountAmount = sessionStorage.getItem('discountamount');
      
      if (hasDiscountPercentage || hasDiscountAmount) {
          promo_code = sessionStorage.getItem('coupon');
          assignment_id = sessionStorage.getItem('assignment_id');
          
          if (hasDiscountPercentage) {
              const percentageDiscount = sessionStorage.getItem('discount_percentage');
              promo_code_val = percentageDiscount;
              total_amount = Math.floor(subtotal - (subtotal * (promo_code_val / 100)) - discount_amount);
              promo_code_val = `${Math.floor(promo_code_val)}%`;
          } else {
              const amountDiscount = sessionStorage.getItem('discountamount');
              promo_code_val = amountDiscount;
              total_amount = Math.floor(subtotal - parseInt(promo_code_val) - discount_amount);
              promo_code_val = `₹${promo_code_val}`;
          }
      }
  }
  
  function handlePaymentMethodChange() {
      const isCashAndCoins = document.getElementById('radio_2').checked;
      
      if (isCashAndCoins && customer_correlated?.cc) {
          coin_balance = customer_correlated.cc.B;
          
          if (coin_balance > total_amount) {
              used_coin = total_amount;
              coin_balance = coin_balance - used_coin;
              total_amount = 0;
          } else {
              used_coin = coin_balance;
              total_amount = total_amount - used_coin;
          }
      } else {
          // Reset coin usage if cash only
          used_coin = null;
          coin_balance = null;
          recalculateTotalWithoutCoins();
      }
      
      payment_method = isCashAndCoins ? 2 : 1;
  }
  
  function recalculateTotalWithoutCoins() {
      if (sessionStorage.getItem('discount_percentage') || sessionStorage.getItem('discountamount')) {
          applyPromoCodeIfAvailable();
      } else {
          promo_code = null;
          promo_code_val = null;
          total_amount = subtotal - discount_amount;
      }
  }
  
  async function placeOrder() {
      const orderButton = document.getElementById('order-button');
      orderButton.disabled = true;
      loading = true;
      console.log("Placing order with the following details:", {
          customer_id,
          institute_name,
          items_count,
          discount_amount,
          promo_code,
          total_amount,
          payment_method,
          used_coin
      });
      try {
          const response = await fetch('./checkout/component', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  customer_id,
                  institute_name,
                  items_count,
                  discount_amount,
                  promo_code,
                  total_amount,
                  payment_method,
                  used_coin
              })
          });
          
          if (response.status === 200) {
              handleSuccessfulOrder();
          }
      } catch (error) {
          console.error("Order placement failed:", error);
          loading = false;
          orderButton.disabled = false;
      }
  }
  
  function handleSuccessfulOrder() {
      // Update coin balance if coins were used
      if (used_coin && customer_correlated?.cc) {
          const newBalance = customer_correlated.cc.B - used_coin;
          customer_correlated.cc.B = newBalance;
          customer_correlated.cc.U = Date.now();
          localStorage.setItem('customer_correlated', JSON.stringify(customer_correlated));
      }
      
      // Clear pending_order from session
      sessionStorage.removeItem('pending_order');
      
      // Handle promo code usage
      if (promo_code && promo_code !== 'WELCOME50') {
          updateCouponUsage();
      } else {
          handleWelcome50Coupon();
      }
  }
  
  function handleWelcome50Coupon() {
      if (promo_code === 'WELCOME50') {
          document.cookie = "WELCOME50=true; max-age=3600; path=/";
      }
      
      // Clear coupon data and redirect
      clearCouponData();
      window.location.href = '/';
  }
  
  function clearCouponData() {
      sessionStorage.removeItem('discountamount');
      sessionStorage.removeItem('discount_percentage');
      sessionStorage.removeItem('coupon');
  }
  
  async function updateCouponUsage() {
      try {
          const response = await fetch('/api/couponUsageUpdate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ assignment_id })
          });
          
          if (response.status === 200) {
              clearCouponData();
              window.location.href = '/';
          }
      } catch (error) {
          console.error("Failed to update coupon usage:", error);
      }
  }
</script>

<div class="m-2 flex flex-col items-center border-b bg-white/40 backdrop-blur-md shadow-sm py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
  <div class="py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <div class="relative">
          <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <!-- Address Step -->
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                  <a class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" 
                     aria-label="Go to address" href="/adderss">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                  </a>
                  <span class="font-semibold text-gray-900">Address</span>
              </li>
              
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              
              <!-- Coupon Step -->
              {#if promo_code_val}
                  <li class="flex items-center space-x-3 text-left sm:space-x-4">
                      <a class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" 
                         aria-label="Go to coupon" href="/coupon">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                      </a>
                      <span class="font-semibold text-gray-900">Coupon code</span>
                  </li>
              {:else}
                  <li class="flex items-center space-x-3 text-left sm:space-x-4">
                      <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="/coupon">2</a>
                      <span class="font-semibold text-gray-900">Coupon code</span>
                  </li>
              {/if}
              
              <svg xmlns="http://www.w3.org/2000/svg" class={promo_code_val ? "h-4 w-4 text-gray-700" : "h-4 w-4 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              
              <!-- Order Summary Step -->
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                  <a class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="/checkout">3</a>
                  <span class="font-semibold text-gray-500">Order Summary</span>
              </li>
          </ul>
      </div>
  </div>
</div>

<div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <!-- Payment Methods Section -->
  <div class="px-4 pt-8">
      <p class="text-xl font-medium">Order Summary</p>
      <p class="text-gray-400">Check your items. And select a suitable payment method.</p>
      
      <p class="mt-8 text-lg font-medium">Payment Methods</p>
      <form class="mt-5 grid gap-6">
          <!-- Cash Only Option -->
          <div class="relative">
              <input class="peer hidden" id="radio_1" type="radio" name="radio" checked onchange={handlePaymentMethodChange} />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                  <div class="ml-5">
                      <span class="mt-2 font-semibold">Cash</span>
                      <p class="text-slate-500 text-sm leading-6">Make payments conveniently using cash only</p>
                  </div>
              </label>
          </div>
          
          <!-- Cash + Coins Option -->
          <div class="relative">
              <input class="peer hidden" id="radio_2" type="radio" name="radio" onchange={handlePaymentMethodChange} />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                  <div class="ml-5">
                      <span class="mt-2 font-semibold">Cash + Coins</span>
                      <p class="text-slate-500 text-sm leading-6">Callow Coin and cash for flexible payment options <a href="#" target="_blank" class="text-blue-500" rel="noopener noreferrer">terms*</a></p>
                  </div>
              </label>
          </div>
      </form>
  </div>
  
  <!-- Payment Details Section -->
  <div class="mt-10 px-8 pt-8 lg:mt-0">
      <p class="text-xl font-medium">Payment Details</p>
      <p class="text-gray-400">Finish your order with a quick click on the checkout button!</p>
      
      <div>
          <!-- Institute Input -->
          <label for="institute" class="mt-4 mb-2 block text-sm font-medium">School / College</label>
          <div class="relative">
              <input 
                  type="text" 
                  id="institute" 
                  name="institute" 
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
                  value={institute_name} 
                  readonly
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
              </div>
          </div>
          
          <!-- Order Summary -->
          <div class="mt-6 border-t border-b py-2">
              <!-- Subtotal -->
              <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Subtotal</p>
                  <p class="font-semibold text-gray-700">₹{subtotal}</p>
              </div>
              
              <!-- Discount -->
              <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Discount</p>
                  <p class="font-semibold text-green-700">- ₹{discount_amount}</p>
              </div>
              
              <!-- Promo Code (if applied) -->
              {#if promo_code_val}
                  <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900">Promo code</p>
                      <p class="font-semibold text-green-700">- {promo_code_val}</p>
                  </div>
              {/if}
              
              <!-- Shipping -->
              <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Shipping</p>
                  <p class="font-semibold text-green-700">Free</p>
              </div>
          </div>
          
          <!-- Coin Usage (if applied) -->
          {#if used_coin}
              <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Used Coin</p>
                  <p class="font-semibold text-green-700">- CC {used_coin}</p>
              </div>
          {/if}
          
          <!-- Total -->
          <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">₹{total_amount}</p>
          </div>
      </div>
      
      <!-- Order Button -->
      <button 
          id="order-button" 
          onclick={placeOrder}
          class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
      >
          {#if loading}
              <span class="loading loading-spinner loading-md"></span>
          {/if}
          Place Order
      </button>
  </div>
</div>