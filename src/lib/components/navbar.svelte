<script lang="ts">
  import {fetchNotifications} from '$lib/utils/fetchNotifications'
  import {customerId} from '$lib/utils/customerCorrelated'
  import { onMount } from 'svelte';
  import '../../app.css';
  import '@tailwind';
  import './navbar.css';
  import { House, ShoppingBag, HandCoins, LogIn, User, BellDot, ShoppingCart } from 'lucide-svelte';

  // State variables
  let isSidebarOpen = $state(false);
  let hasAccount = $state(false);
  let notifications: any = $state([0]); // temporary placing signle element so Ui can't throw errors such as reading 'length'

  // Lifecycle method
  onMount(async() => {
    hasAccount = Boolean(localStorage.getItem('customer_correlated'));
    notifications = await getNotifications(customerId());
  });
  
  async function getNotifications(customerId: string) {
    if (!customerId) return [0] // temporary placing signle element so Ui can't throw errors such as reading 'length'
    try {
      const notifications = await fetchNotifications({
        baseUrl: '/api/notifications',
        customerId: customerId,
        status: 'unread',
      });
      return notifications; 
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  }
</script>

<!-- Navigation Links -->
{#snippet navigationLinks()}
  <a href="/" class="flex"><House size={20}/> <span class="ml-2">Home</span></a>
  {#if hasAccount}
    <a href="/orderHistory" class="flex"><ShoppingBag size={20}/> <span class="ml-2"> Orders</span></a>
    <a href="/coins" class="flex"><HandCoins size={20}/> <span class="ml-2">Coins</span></a>
    {#if notifications.length > 0}
      <div class="indicator">
        <span class="indicator-item badge bg-red-500 text-white">{notifications.length}</span>
        <a href="/notification" class="flex"><BellDot size={20} color="yellow"/> <span class="ml-2">Notification</span></a>
      </div>
      
    {:else}
      <a href="/notification" class="flex"><BellDot size={20}/> <span class="ml-2">Notification</span></a>
    {/if}
  {/if}
  <a href="/blog">Blog</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
  <a href="/privacy">Privacy</a>
  {#if !hasAccount}
    <a href="/signUp" class="flex"><User size={20}/> <span class="ml-2">Sign Up</span></a>
    <a href="/login" class="flex"><LogIn size={20}/> <span class="ml-2">login</span></a>
  {/if}
{/snippet}

<!-- Logo -->
{#snippet svglogo()}
<div class="logo">
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="10" height="10" x="2" y="2" rx="2" fill="#4ade80" />
    <rect width="10" height="10" x="12" y="2" rx="2" fill="#4ade80" />
    <rect width="10" height="10" x="2" y="12" rx="2" fill="#4ade80" />
    <rect width="10" height="10" x="12" y="12" rx="2" fill="#4ade80" />
  </svg>
</div>
{/snippet}

<!-- Navbar -->
<nav class="navbar">
  <div class="containerforlinks">
    {@render svglogo()}
    <div class="nav-links">
      {@render navigationLinks()}
      <div class="indicator">
        <span class="indicator-item badge bg-red-500 text-white">{notifications.length}</span>
        <a href="/notification" class="flex"><ShoppingCart size={20} color="yellow"/> <span class="ml-2">Kart</span></a>
      </div>
    </div>
    <form class="search-form">
      <input
        type="search"
        placeholder="Search..."
        onclick={()=> window.location.href = "/search" }
      />
    </form>
    <button class="menu-toggle" onclick={()=> {isSidebarOpen = !isSidebarOpen}}>☰</button>
  </div>
</nav>

<!-- Sidebar -->
<div class="sidebar {isSidebarOpen ? 'open' : ''}">
  <div class="sidebar-header">
    {@render svglogo()}
    <button class="sidebar-close" onclick={()=> isSidebarOpen = false}>&times;</button>
  </div>
  <div class="sidebar-nav">
    {@render navigationLinks()}
  </div>
</div>

<!-- Overlay -->
<button class="overlay {isSidebarOpen ? 'show' : ''}" onclick={()=> isSidebarOpen = false} aria-label="Close sidebar"></button>