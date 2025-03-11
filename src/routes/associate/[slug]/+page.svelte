<script>
  import '@tailwind';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { fetchProductById } from '$lib/utils/fetchProductById';
  

  const url = $page.url.href;
  let updatedUrl = url.replace(/%20/g, ' ');
  let institute_name = updatedUrl.split('/').pop();
  let complete_order = $state([]);
  let orders = $state();
  let productInfo = $state();

  async function retrievePending(institute_name) {
      try {
          let response = await fetch('/associate/[slug]', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ institute_name })
          });

          if (response.ok) {
              let data = await response.json();
              orders = data.data;
              productInfo = await fetchProductById(orders.map(order => order.items_count[0])); // argument is extracting productIds 
          } else {
              console.error(response);
          }
      } catch (error) {
          console.error(error);
      }
  }

  retrievePending(institute_name);

  onMount(() => {
      let button = document.getElementById("fnCall");
      let pressTimer;

      button.addEventListener('click', () => {
          pressTimer = setTimeout(() => {
              let modal = document.getElementById("my_modal_5");
              modal.showModal();
          }, 1000);
      });

      button.addEventListener('touchend', () => {
          clearTimeout(pressTimer); 
      });

      button.addEventListener('touchend', () => {
          clearTimeout(pressTimer);
      });
  });


  async function updateOrder() {
    try {
      const uniqueOrders = Array.from(new Set(complete_order))
      console.log(uniqueOrders[0])
      let response = await fetch('/associate/[slug]/update', {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({uniqueOrders})
      })
    } catch (error) {
      console.error(error)
    }
  }
</script>

{#if orders && productInfo}
<div class="overflow-x-auto">
  <table class="table">
      <!-- head -->
      <thead>
          <tr>
              <th></th>
              <th class="text-black">Name</th>
              <th class="text-black">Product</th>
              <th class="text-black">Total</th>
          </tr>
      </thead>
      <tbody>
          {#each orders as order}
          <tr>
              <th>
                  <label>
                      <input type="checkbox" class="checkbox" onchange={() => { complete_order.push(order.order_id) 
                        console.log(order.order_id)
                      }} />
                  </label>
              </th>
              <td>
                  <div class="flex items-center gap-3">
                      <div class="avatar">
                          <div class="mask mask-squircle h-12 w-12">
                              <div class="skeleton h-32 w-32"></div>
                          </div>
                      </div>
                      <div>
                          <div class="font-bold">{order.customer_name}</div>
                      </div>
                  </div>
              </td>
              <td>
                {#if productInfo[order.items_count[0]]}
                {productInfo[order.items_count[0]].productName}
                {/if}
                  
                  <br />
                  <span class="badge badge-ghost badge-sm">items : {order.items_count[1]}</span>
              </td>
              <td>{order.total_amount}</td>
          </tr>
          {/each}
      </tbody>
  </table>
</div>
{/if}

<button id="fnCall" class="btn">DONE</button>




<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn" onclick={() => { updateOrder()}}>Everything ok</button>
      </form>
    </div>
  </div>
</dialog>