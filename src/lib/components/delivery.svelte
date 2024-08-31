<script>
  import { ChevronRight } from 'lucide-svelte';

  export let shippingAddress = '';
  export let items = 1;
  export let currentPrice = 0;
  export let previousPrice = 0;
  let subtotal = currentPrice * items;
  let delivery = 0;
  let orderTotal = subtotal + delivery;
  export let savings = (previousPrice - currentPrice)*items;
  let savingsPercentage = 100-(Math.floor((currentPrice/previousPrice)*100));

  function place() {
    window.location.href = '../experiment2'
  }
</script>

<div class="order-summary">
  <h2>Order now</h2>
  
  <div class="shipping-info">
    <p>Shipping to: <span style="font-weight: bold;color:red;">{shippingAddress}</span></p>
  </div>
  
  <div class="order-details">
    <div class="detail-row">
      <span>Subtotal ({items} item):</span>
      <span>₹{subtotal}</span>
    </div>
    <div class="detail-row">
      <span>Delivery:</span>
      <span>₹{delivery}</span>
    </div>
    <div class="detail-row total">
      <span>Order Total:</span>
      <span>₹{orderTotal}</span>
    </div>
  </div>
  
  <div class="savings">
    <p>Your Savings: ₹ {savings.toFixed(2)} ({savingsPercentage}%)</p>
    <ul>
      <li>Item discount</li>
    </ul>
  </div>
  
  <div class="payment-method">
    <h3>Pay with</h3>
    <div class="method-row">
      <span>Pay on delivery (Cash/Card)</span>
      <ChevronRight size={20} />
    </div>
  </div>
  
 
  
  <div class="delivery-address">
    <h3>Deliver to</h3>
    <div class="address-row">
      <div>
        <p></p>
        <p class="address-details"></p>
      </div>
      <ChevronRight size={20} />
    </div>
  </div>
  
  <button class="place-order-button" on:click={place}>Place your order</button>
</div>

<style>
  .order-summary {
    /* min-width: 400px; */
    max-width: 600px;
    margin: 1rem auto;
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  h3 {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .shipping-info {
    margin-bottom: 16px;
    color: #666;
  }

  .order-details {
    border-top: 1px solid #e0e0e0;
    padding-top: 16px;
    margin-bottom: 16px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .total {
    font-weight: bold;
  }

  .total span:last-child {
    color: #e53e3e;
  }

  .savings {
    background-color: #fffbeb;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .savings p {
    color: #e53e3e;
    font-weight: bold;
  }

  .savings ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  .payment-method, .delivery-address {
    margin-bottom: 16px;
  }

  .method-row, .address-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    padding: 12px;
    border-radius: 4px;
  }

  .address-details {
    color: #666;
  }

  .place-order-button {
    width: 100%;
    background-color: #fbbf24;
    color: black;
    padding: 12px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
</style>