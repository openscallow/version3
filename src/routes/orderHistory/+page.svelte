<script>
  import '@tailwind'
  import { onMount } from 'svelte'
  import {productDatabase} from '$lib/json/product.js'
  import deliverySchedule from './deliverySchedule.js';  // Default import




// Preprocess the schedule to create a hash table of valid schools
const validSchools = Object.values(deliverySchedule).reduce((schools, day) => {
    Object.keys(day).forEach((school) => {
        schools[school] = true; // Mark school as valid
    });
    return schools;
}, {});

function getDayName(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
}

function isTimeBeforeSlot(dateString, slotStart) {
    const currentTime = new Date(dateString);

    // Helper to parse time string
    function parseTime(time) {
        const [timePart, period] = time.split(" ");
        let [hour, minute] = timePart.split(":").map(Number);
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
        return hour * 60 + minute;
    }

    const currentTimeInMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();
    const slotStartInMinutes = parseTime(slotStart);
    return currentTimeInMinutes < slotStartInMinutes - 120;
}

function availableSlots(dateString, schoolName) {
    // Check if the school exists in the schedule
    if (!validSchools[schoolName]) {
        return `Error: School "${schoolName}" does not exist in the delivery schedule.`;
    }

    const dayName = getDayName(dateString);
    const slots = deliverySchedule[dayName]?.[schoolName];

    if (!slots) {
        return nextAvailableSlot(dateString, schoolName);
    }

    if (isTimeBeforeSlot(dateString, slots.start)) {
        return formatSlot(dayName, slots);
    } else {
        return nextAvailableSlot(dateString, schoolName);
    }
}

function nextAvailableSlot(dateString, schoolName) {
    const currentDate = new Date(dateString);

    // Loop through the next 7 days to prevent infinite recursion
    for (let i = 1; i <= 7; i++) {
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        const nextDayName = getDayName(currentDate.toISOString());
        const nextSlots = deliverySchedule[nextDayName]?.[schoolName];

        if (nextSlots) {
            return formatSlot(nextDayName, nextSlots);
        }
    }

    // If no slot is found after 7 days
    return `No available slots for school "${schoolName}" in the next 7 days.`;
}

// Helper function to format the slot
function formatSlot(dayName, slots) {
    return `${dayName} : ${slots.start} : ${slots.end}`;
}

// original code
let orders = $state([]);
  onMount(async () => {
      const customer_correlated = JSON.parse(localStorage.getItem('customer_correlated'))
      let i = customer_correlated.i
      if (i) {
        try {
          const response = await fetch('/orderHistory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ i }),
          });

          if (response.ok) {
            let received_datam= await response.json();
            let { data } = received_datam
            orders = data
          } else {
            console.error('Failed to fetch orders');
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    
  });


  async function handelCancel(order_id) {
    console.log(order_id)
    try {
      let response = await fetch('/orderHistory/cancelOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({order_id})
      })

      if (response.ok) {
        
          location.reload()
      }
    } catch (error) {
      console.error("something went wrong :", error)
    }
}
</script>

<main>
  {#each orders as order}
    <div class="card card-side shadow-sm mx-4 my-4 rounded-md p-4 bg-white">
      <figure class="aspect-[3/4] w-[200px] object-scale-down">
        <img 
          src={productDatabase[parseInt(order.items_count[0])].img}
          alt="Movie" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{productDatabase[parseInt(order.items_count[0])].name}</h2>
        <p class="product-total">Total: {order.total_amount} rupees</p>
        <div class="collapse collapse-arrow bg-white w-full">
          <input type="checkbox" name="my-accordion-2" />
          <div class="collapse-title text-xl font-medium"></div>
          <div class="collapse-content ">
            <!-- <p class="product-details my-2">order_id: {order.order_id}</p> -->
            <p class="product-details my-2">School/College: {order.institute_name}</p>
            {#if order.discount_amount}
            <p class="product-details my-2">discount: ₹{order.discount_amount}</p>
            {/if} 
            {#if availableSlots(order.created_at, order.institute_name)}
            <p>Delivery: {availableSlots(order.created_at, order.institute_name)}</p>
            {/if} 
    
            <p class="product-details text-gray-500 my-2">Items: {parseInt(order.items_count[1])}</p>
            <div class="card-actions ">
              <button onclick={()=>{handelCancel(order.order_id)}} class="btn btn-outline btn-error">Cancel order</button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  {/each}
</main>