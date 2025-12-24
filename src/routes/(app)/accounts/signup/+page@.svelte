<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: initial
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 10/12/2025
 * Last change: global style imported;
 * 
*/
import '@styles';
import SignupContainer from './view/SignupContainer.svelte';

</script>

<svelte:head>
  <title>Sign Up to Callow | Buy Stationery & Earn Rewards</title>
  
  <meta name="description" content="Create your free account on Callow.in. Discover a wide range of office and student stationery, and earn up to ₹400 when you join. Shop smart today." />

  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="https://www.callow.in/signUp" />

  <meta property="og:title" content="Join Callow: The Student Stationery Store" />
  <meta property="og:description" content="Sign up today to shop for notebooks, pens, and essentials. Students can earn up to ₹400 in rewards just by joining!" />
  <meta property="og:image" content="https://callow.in/stationerywhatsapp.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Callow.in" />
  <meta property="og:url" content="https://www.callow.in/accounts/signup" />
  
  <meta name="twitter:card" content="summary_large_image">
</svelte:head>


<main>
  <SignupContainer />
</main>

<style>
  :global(body){
    margin: 0;
  }
  
  main { 
    display: grid; 
    width: 100%;
    min-height: 100vh;
    background-color: #01263a;
    justify-content: center;
    }
</style>