<script>
  import { onMount } from "svelte";

  let data = { users: [] };
  let error = null;

  let name="payal"
  let mobile = 8469660342
  let address = "403 javahar society"
  let product = "barbie doll"
  let status = "pendding"
  let index = 8
          
  onMount(async () => {
    try {
      const res = await fetch('/fakeapi/xz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({ name, mobile, address, product, status, index })
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      data = await res.json();
    } catch (err) {
      error = err.message;
    }
  });
</script>
{data}
<h1>Users List</h1>
{#if error}
  <p>Error: {error}</p>
{:else if data.users.length > 0}
  <ul>
    {#each data.users as user}
      <li>{user.name}</li>
    {/each}
  </ul>
{:else}
  <p>Loading...</p>
{/if}