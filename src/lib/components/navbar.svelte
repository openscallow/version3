<script>
    import { onMount } from 'svelte';
    import '../../app.css'

    let isSidebarOpen = $state(false);
    let searchQuery = $state('');
    let hasAccount =$state('');
  
    onMount(() => {
      // Any additional setup logic can be added here
      hasAccount = localStorage.getItem('customer_correlated')|| null ;
    });
  
    function toggleSidebar() {
      isSidebarOpen = !isSidebarOpen;
    }
  
    function closeSidebar() {
      isSidebarOpen = false;
    }
  
    function handleSearchSubmit(event) {
      event.preventDefault();
      console.log('Search query:', searchQuery);
      // Implement search functionality here
    }

    function blankPage(){
      console.log("hois")
      window.location.href="./search"
    }
    console.log(hasAccount)
  </script>
  
  <style>

    .navbar {
      background-color: var(--primary-color);
      color: white;
      padding: 1rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo svg {
      width: 2rem;
      height: 2rem;
    }
    .nav-links {
      display: none;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      margin-left: 1rem;
    }
    .nav-links a.active {
      border-bottom: 2px solid #4ade80;
    }
    .search-form {
      flex-grow: 1;
      margin: 0 1rem;
    }
    .search-form input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: none;
    }
    .menu-toggle {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .sidebar {
      position: fixed;
      top: 0;
      left: -250px;
      width: 250px;
      height: 100%;
      background-color: var(--primary-color);
      color: white;
      transition: left 0.3s ease-in-out;
      z-index: 1000;
    }
    .sidebar.open {
      left: 0;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
    .sidebar-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
    .sidebar-nav a {
      color: white;
      text-decoration: none;
      margin-bottom: 1rem;
    }
    .sidebar-nav a.active {
      border-bottom: 2px solid #4ade80;
    }
    .overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
    .overlay.show {
      display: block;
    }
    @media (min-width: 768px) {
      .nav-links {
        display: flex;
      }
      .menu-toggle {
        display: none;
      }
      .search-form {
        max-width: 300px;
      }
    }
  </style>
  
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="10" x="2" y="2" rx="2" fill="#4ade80" />
          <rect width="10" height="10" x="12" y="2" rx="2" fill="#4ade80" />
          <rect width="10" height="10" x="2" y="12" rx="2" fill="#4ade80" />
          <rect width="10" height="10" x="12" y="12" rx="2" fill="#4ade80" />
        </svg>
      </div>
      <div class="nav-links">
        <a href="./" class="active">Home</a>
        {#if hasAccount}
        <a href="./orderHistory">Orders</a>
        <a href="./coins">Orders</a>
        {/if}
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        {#if !hasAccount}
        <a href="./signUp">signUp</a>
        <a href="./login">login</a>
        {/if}
      </div>
      <form class="search-form" onsubmit={handleSearchSubmit}>
        <input
          type="search"
          placeholder="Search..."
          bind:value={searchQuery}
          onclick={blankPage}
        />
      </form>
      <button class="menu-toggle" onclick={toggleSidebar}>☰</button>
    </div>
  </nav>
  
  <div class="sidebar {isSidebarOpen ? 'open' : ''}">
    <div class="sidebar-header">
      <div class="logo">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="10" x="2" y="2" rx="2" fill="#4ade80" />
          <rect width="10" height="10" x="12" y="2" rx="2" fill="#4ade80" />
          <rect width="10" height="10" x="2" y="12" rx="2" fill="#4ade80" />
          <rect width="10" height="10" x="12" y="12" rx="2" fill="#4ade80" />
        </svg>
      </div>
      <button class="sidebar-close" onclick={closeSidebar}>&times;</button>
    </div>
    <div class="sidebar-nav">
      <a href="./" class="active">Home</a>
      {#if hasAccount}
      <a href="./orderHistory">Orders</a>
      <a href="./coins">Orders</a>
      {/if}
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      {#if !hasAccount}
        <a href="./signUp">signUp</a>
        <a href="./login">login</a>
      {/if}
    </div>
  </div>
  
  <button class="overlay {isSidebarOpen ? 'show' : ''}" onclick={closeSidebar}></button>
