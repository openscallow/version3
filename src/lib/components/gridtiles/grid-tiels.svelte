<script>

  import { onMount } from 'svelte';
  import { getProductsWithCache } from './cacheUtils.js';
  import '$lib/components/gridtiles/style.css'
  import RecentDrops from '$lib/components/recentDrops.svelte';
  import Trending from '$lib/components/trending.svelte';
  import MostPurchased from '$lib/components/mostPurchased.svelte';

  </script>
  <RecentDrops/>


