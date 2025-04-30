<script lang="ts">
    import '@tailwind' 
    import type { PageProps } from './$types';
    import { onMount } from 'svelte';
    import { customerId } from '$lib/components/ts/customer_correlated.svelte'

    let k : string = $state('')

    onMount(()=>{
        const params = new URLSearchParams(window.location.search);
        k = params.get("k") || '';
        const customer_id = customerId()
        const timestamp = new Date().toISOString();
        let moreInfo = getBrowserInfo()

        
        console.log({searchQuery: k, customer_id, timestamp, ...moreInfo})

        insertLog({searchQuery: k, customer_id, timestamp, ...moreInfo})
    })

    async function insertLog(logInfo){
      try {
        let response = await fetch('/api/searchLog',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logInfo)
            }
        );
        if(response.ok){
          console.log('work')
        }
      } catch (error) {
        console.log(`error from result ${error}`)
      }
    }

    function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  let browserName = "Unknown";
  let fullVersion = "Unknown";

  if (/edg/i.test(userAgent)) {
    browserName = "Microsoft Edge";
    fullVersion = userAgent.match(/edg\/([\d.]+)/i)?.[1];
  } else if (/chrome/i.test(userAgent)) {
    browserName = "Google Chrome";
    fullVersion = userAgent.match(/chrome\/([\d.]+)/i)?.[1];
  } else if (/safari/i.test(userAgent)) {
    browserName = "Safari";
    fullVersion = userAgent.match(/version\/([\d.]+)/i)?.[1];
  } else if (/firefox/i.test(userAgent)) {
    browserName = "Mozilla Firefox";
    fullVersion = userAgent.match(/firefox\/([\d.]+)/i)?.[1];
  } else if (/msie|trident/i.test(userAgent)) {
    browserName = "Internet Explorer";
    fullVersion = userAgent.match(/(msie\s|rv:)([\d.]+)/i)?.[2];
  }

  return {
    platform: platform,
    browser: browserName,
    version: fullVersion
  };
}
    
    
    let { data }: PageProps = $props(); 
    console.log(data)
    let products = Object.values(data)
    console.log(products)
   
</script>
<h3 class="text-xl font-bold ml-4 text-gray-800">Search result: {k}</h3>
<div class="grid gap-4 p-4 grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(100px,200px))]">
    {#if products.length > 0}
      {#each products as product}
      <div class="relative flex flex-col items-center bg-white rounded-lg transition-transform duration-300 ease-in-out shadow-sm aspect-[1/1.2] border border-black overflow-hidden p-1">
        <a class="no-underline text-inherit text-center flex flex-col w-full h-full" href={"/"+ product.productName.replaceAll(" ","-").replaceAll(".", "-") + "/product/" + product._id} rel="noopener noreferrer">
          <div class="flex-1 flex items-center justify-center overflow-hidden w-full h-0 relative bg-white">
            <img class="absolute top-0 left-0 w-full h-full object-contain" loading="lazy" src={product.images[0]} alt={product.productName} />
          </div>
          <h2 class="text-base my-2 max-w-full overflow-hidden text-ellipsis line-clamp-2 leading-[1.2em] h-[2.4em]">{product.productName}</h2>
          <div class="flex rounded-sm overflow-hidden relative border border-gray-900">
            <div class="py-[2px] text-white bg-red-500 flex-grow">
              ₹{product.currentPrice}
            </div>
            <div class="py-[2px] text-black bg-yellow-400 flex-grow">
              <del>MRP ₹{product.mrp} </del>
            </div>
            <div class="shimmer"></div>
          </div>
          {#if product.stockAvailability < 1}
              <div class="absolute top-1 w-3/4 left-1/2 -translate-x-1/2 fit-content text-white  rounded-full px-2 bg-black">Sold Out</div>
          {/if}
        </a>
      </div>
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
</div>

<style>
  .shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg);
    animation: shimmer 2.5s infinite ease-in-out;
  } 

  @keyframes shimmer {
    0% {
      transform: translateX(-150%) skewX(-20deg);
    }
    50% {
      transform: translateX(150%) skewX(-20deg);
    }
    100% {
      transform: translateX(150%) skewX(-20deg);
    }
  }   
</style>

