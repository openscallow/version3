<script>
  import '@tailwind';
  import { onMount } from 'svelte';
  import OrderCard from './OrderCard.svelte';

  let isLoading = $state(true);
  let orders = $state([]);
  let orderProducts = $state({});

  // Function to fetch delivery window
  async function getDeliveryWindow(schoolName) {
    console.log('🚚 Fetching delivery window for:', schoolName);
    try {
      const response = await fetch('/orderHistory/getDeliveryWindow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolName }),
      });

      if (response.ok) {
        const data = await response.json();
        return data
      } else {
        throw new Error('Failed to fetch delivery window');
      }
    } catch (error) {
      console.log('❌ Delivery window error:', error);
      console.log(`No record found for school: ${schoolName}`);
      return null;
    }
  }

  // Debug function to log product info
  function logProductInfo(order) {
    console.log('🔍 Order:', order);
    console.log('📦 Product ID from order:', order.items_count[0]);
    const product = Object.values(orderProducts).find(p => p._id === order.items_count[0]);
    console.log('🎁 Product data:', product);
    console.log('🎁 All Products:', orderProducts);
    return product;
  }

  // Function to fetch product details
  async function fetchProductDetails(productIds) {
    console.log('🎁 Fetching details for products:', productIds);
    try {
      const response = await fetch('/api/getProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds }),
      });

      if (response.ok) {
        const products = await response.json();
        console.log('✅ Raw products response:', products);
        
        // Simply use the products as they are, no need for reformatting
        console.log('🔄 Products:', products);
        return products;
      }
      throw new Error('Failed to fetch products');
    } catch (error) {
      console.error('❌ Product fetch error:', error);
      return {};
    }
  }

  // Fetch order history on mount
  onMount(async () => {
    const customer_correlated = JSON.parse(localStorage.getItem('customer_correlated'));
    console.log('👤 Customer data:', customer_correlated);
    
    let i = customer_correlated?.i;

    if (i) {
      try {
        isLoading = true;
        const response = await fetch('/orderHistory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ i }),
        });

        if (response.ok) {
          let received_datam = await response.json();
          console.log('📦 Raw order data:', received_datam);
          
          let { data } = received_datam;
          orders = data;
          
          // Extract and clean product IDs
          const productIds = [...new Set(orders.map(order => {
            const id = order.items_count[0];
            console.log(`🏷️ Processing order ID: ${order.order_id}, Product ID: ${id}`);
            return id;
          }))];
          
          console.log('🏷️ Unique product IDs to fetch:', productIds);
          orderProducts = await fetchProductDetails(productIds);
        
          console.log('🎁 00All Products:', orderProducts);
          
        }
      } catch (error) {
        console.error('❌ Order fetch error:', error);
      } finally {
        isLoading = false;
      }
    }
  });

  // Cancel order
  async function handelCancel(order_id) {
    console.log('❌ Cancelling order:', order_id);
    try {
      let response = await fetch('/orderHistory/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id }),
      });

      if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  }
</script>
<div class="main">
  <OrderCard />
</div>

<style>
  .main{
    padding: 1rem;
  }
</style>

<main>
  {#if isLoading}
    <div class="flex justify-center items-center min-h-screen">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
  {:else}
    {#each orders as order}
      {@const product = logProductInfo(order)}
      <div class="card card-side shadow-sm mx-4 my-4 rounded-md p-4 bg-white">
        {#if product}
          <figure class="aspect-[3/4] w-[200px] object-scale-down">
            <img 
              src={product.images?.[0] || '/placeholder-image.jpg'}
              alt={product.productName || 'Product'} />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {product.productName || 'Product Name Unavailable'}
            </h2>
            <div class="flex gap-2 text-sm text-gray-600">
              {#if product.brand}<span class="badge badge-outline">{product.brand}</span>{/if}
              {#if product.category}<span class="badge badge-outline">{product.category}</span>{/if}
            </div>
            <p class="product-total">Total: ₹{order.total_amount}</p>
            <div class="collapse collapse-arrow bg-white w-full">
              <input type="checkbox" name="my-accordion-2" />
              <div class="collapse-title text-xl font-medium"></div>
              <div class="collapse-content">
                <p class="product-details my-2">School/College: {order.institute_name}</p>
                {#if order.discount_amount}
                  <div class="flex gap-2 items-center">
                    <p class="product-details my-2">MRP: <span class="line-through">₹{product.mrp}</span></p>
                    <p class="product-details my-2">Discount: ₹{order.discount_amount}</p>
                  </div>
                {/if}
                <p>Delivery: 
                  {#await getDeliveryWindow(order.institute_name)}
                    <span>Loading...</span>
                  {:then deliveryWindow}
                    {#if deliveryWindow}
                      <span>{deliveryWindow.slot[0]}</span> -
                      <span>{deliveryWindow.slot[1]}</span>
                    {:else}
                      <span>No delivery window found</span>
                    {/if}
                  {:catch error}
                    <span>Error loading delivery window</span>
                  {/await}
                </p>
                <p class="product-details text-gray-500 my-2">Quantity: {parseInt(order.items_count[1])}</p>
                <div class="card-actions">
                  <button onclick={() => handelCancel(order.order_id)} class="btn btn-outline btn-error">Cancel order</button>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <div class="w-full p-4 text-center text-gray-500">
            <p>Product ID: {order.items_count[0]}</p>
            <p>Product information unavailable</p>
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</main>
