<script>
    import '@tailwind'
    import { UserCheck, ClipboardCopy } from 'lucide-svelte'
    import { onMount } from 'svelte';

    let coin_balance = $state()
    let referrals = $state()
    let customer_referral_link = $state()
    onMount(async ()=>{
      if (localStorage.getItem('customer_correlated')) { 
      
        let customer_id = JSON.parse(localStorage.getItem('customer_correlated')).i
        let customer_referral_code = JSON.parse(localStorage.getItem('customer_correlated')).r
        customer_referral_link = `callow.in/signUp?ref=`+JSON.parse(localStorage.getItem('customer_correlated')).r
   
        
        try {
            const response = await fetch('/coins/api/customer-balance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id })  
                })

            let data  = await response.json()
            coin_balance = Math.round(data.total_coin_balance)
        }catch(error){
        console.log(error)
        }

        try {
          let response = await fetch('coins/api/referral-timeline',{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({customer_id})
          })

          let data = await response.json()
          referrals =data.data
        } catch (error) {
          console.log(error)
        }
      }
    })

    onMount(()=>{
      

    document.getElementById("copyButton").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(customer_referral_link);
            alert("Text copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    });
    })
</script>
  
  <div class="p-4">
    <div class="relative aspect-video w-full max-w-lg mx-auto rounded-lg overflow-hidden">
      <!-- Gradient Background -->
      <div
        class="absolute inset-0"
        style="background: linear-gradient(90deg, #1CB5E0 0%, #000851 100%);">
      </div>
  
      <!-- Image -->
      <img
        src="/coin.png"
        alt="coin"
        class="absolute inset-0 object-cover w-full h-full"
      />
  
      <!-- Overlay Content -->
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <h1 class="text-5xl font-bold text-white">{#if coin_balance}{coin_balance}{:else}0{/if} coins</h1>
      </div>
    </div>
  </div>

  <label class="input input-bordered flex items-center gap-2 mx-4">
    <input type="text" class="grow" bind:value={customer_referral_link}/>
    <ClipboardCopy id="copyButton" class="cursor-pointer"/>
  </label>
  
  <div class="history px-4">
    {#if referrals}
      {#each referrals as referral }
      <div class="collapse collapse-arrow bg-base-200 my-4 rounded-md text-blue-600/75 p-4 " style="background-color: rgb(219 234 254 );">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title text-xl font-medium flex gap-3"><UserCheck size={29}/><p><u>{referral.customer_name}</u> joined via your referral </p></div>
        <div class="collapse-content">
          <p>Date: {referral.created_at.split('T')[0]}</p>
          <p>Earn: 10 coins</p>
          <p>Status: {referral.status}</p>
        </div>
      </div>
      {/each}
    {/if}
  </div>