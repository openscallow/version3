<script>
  import '@tailwind';
  import { onMount } from 'svelte';
  import { productDatabase } from '$lib/json/product.js';
  import deliverySchedule from './deliverySchedule.js';

  // Array of schools
  let schools = [
    "Matrubhumi Vidhya Bhavan",
    "J.H.B Sardar High School",
    "Nagar Prathamik School",
    "Sulabh classes",
    "V.T Choksi English Medium School"
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  /**
   * Gets the delivery window for a school.
   * @param {string} schoolName - The name of the school.
   * @returns {string} - The delivery time slot or an error message.
   */
  function getDeliveryWindow(schoolName) {
    if (!schools.includes(schoolName)) return "School not found";

    let dayName = getDayName();
    let referenceTime = new Date();

    for (let i = 0; i < 7; i++) {
      const slots = deliverySchedule?.[dayName]?.[schoolName];

      if (slots && isTimeBeforeSlot(referenceTime, slots.start)) {
        return formatSlot(dayName, slots);
      } else {
        dayName = getNextDay(dayName);
        referenceTime = getNextDayStart(referenceTime);
      }
    }

    return "No available delivery slot found";
  }

  // Helper function to get the current day name
  function getDayName() {
    const now = new Date();
    return days[now.getDay()];
  }

  // Helper function to get the next day
  function getNextDay(dayName) {
    const index = days.indexOf(dayName);
    return days[(index + 1) % 7];
  }

  // Helper function to get the start of the next day
  function getNextDayStart(referenceTime) {
    const nextDay = new Date(referenceTime);
    nextDay.setDate(referenceTime.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    return nextDay;
  }

  // Helper function to check if the current time is before the slot start
  function isTimeBeforeSlot(dateString, slotStart) {
    const currentTime = new Date(dateString);

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

  // Helper function to format the slot
  function formatSlot(dayName, slots) {
    return `${dayName} : ${slots.start} : ${slots.end}`;
  }

  // State for orders
  let orders = $state([]);

  // Fetch order history on mount
  onMount(async () => {
    const customer_correlated = JSON.parse(localStorage.getItem('customer_correlated'));
    let i = customer_correlated.i;

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
          let received_datam = await response.json();
          let { data } = received_datam;
          orders = data;
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  });

  // Cancel order
  async function handelCancel(order_id) {
    console.log(order_id);
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
          <div class="collapse-content">
            <p class="product-details my-2">School/College: {order.institute_name}</p>
            {#if order.discount_amount}
            <p class="product-details my-2">Discount: ₹{order.discount_amount}</p>
            {/if}
            {#if getDeliveryWindow(order.institute_name)}
            <p>Delivery: {getDeliveryWindow(order.institute_name)}</p>
            {/if}
            <p class="product-details text-gray-500 my-2">Items: {parseInt(order.items_count[1])}</p>
            <div class="card-actions">
              <button onclick={() => handelCancel(order.order_id)} class="btn btn-outline btn-error">Cancel order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</main>