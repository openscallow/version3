<script>
    import { onMount } from 'svelte';
  
    let orders = $state([]);
    let isLoading = $state(true);
    let error = $state(null);
  
    onMount(async () => {
      try {
        const response = await fetch('/api3');
        if (response.ok) {
          orders = await response.json();
        } else {
          error = `Failed to fetch data: ${response.status} ${response.statusText}`;
        }
      } catch (err) {
        error = `Error: ${err.message}`;
      } finally {
        isLoading = false;
      }
    });
  </script>
  
  <h1>Orders</h1>
  
  {#if isLoading}
    <p>Loading orders...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if orders.length > 0}
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Product</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {#each orders as order (order.id)}
            <tr>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.mobile}</td>
              <td>{order.address}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p>No orders found.</p>
  {/if}
  
  <style>
    .error {
      color: red;
      font-weight: bold;
    }
  
    .table-container {
      overflow-x: auto;
      overflow-y: auto;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      overflow-x: auto;
      overflow-y: auto;
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
  
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  
    tr:hover {
      background-color: #f5f5f5;
    }
  </style>