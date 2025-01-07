<script lang="ts">
  import { onMount } from 'svelte';
  import '../../app.css';
  import './navbar.css';
  import '@tailwind';
  import { House, ShoppingBag, HandCoins, LogIn, User } from 'lucide-svelte';

  // State variables
  let isSidebarOpen : boolean= $state(false);
  let hasAccount : boolean = $state(false);

  // Lifecycle method
  onMount(() => {
    hasAccount = Boolean(localStorage.getItem('customer_correlated'));
  });
</script>

<!-- Navigation Links -->
{#snippet navigationLinks()}
  <a href="./" class="flex"><House size={20}/> <span class="ml-2">Home</span></a>
  {#if hasAccount}
    <a href="./orderHistory" class="flex"><ShoppingBag size={20}/> <span class="ml-2"> Orders</span></a>
    <a href="./coins" class="flex"><HandCoins size={20}/> <span class="ml-2">Coins</span></a>
  {/if}
  <a href="/blog">Blog</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
  {#if !hasAccount}
    <a href="./signUp"><User size={20}/> <span class="ml-2">Sign Up</span></a>
    <a href="./login"><LogIn size={20}/> <span class="ml-2">login</span></a>
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
  <div class="container">
    {@render svglogo()}
    <div class="nav-links">
      {@render navigationLinks()}
    </div>
    <form class="search-form">
      <input
        type="search"
        placeholder="Search..."
        onclick={()=> window.location.href = "./search" }
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