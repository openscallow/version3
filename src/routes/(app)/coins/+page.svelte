<script>
    import '@tailwind'
    import { UserCheck, ClipboardCopy } from 'lucide-svelte'
    import { onMount } from 'svelte';

    let coin_balance = $state(0)
    let referrals = $state()
    let customer_referral_link = $state()
    onMount(async ()=>{
      if (localStorage.getItem('customer_correlated')) { 

        let customer_correlated = JSON.parse(localStorage.getItem('customer_correlated'))
        let customer_id = customer_correlated.i
        let customer_referral_code = customer_correlated.r
        customer_referral_link = `callow.in/signUp?ref=`+customer_referral_code
   
        
        try {
            const response = await fetch('/coins/api/customer-balance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer_id })  
                })

            let data  = await response.json()
            coin_balance = Math.round(data.total_coin_balance)
            console.log("we are upto the update")
            setCoinBalance(customer_correlated, coin_balance)
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

    /**
     * Updates the coin balance in local storage with timestamp validation
     * @param {number} coin_balance - The new coin balance to be stored
     * @description Checks if coin balance exists and was updated within last hour (3600000ms)
     * If balance exists but hasn't been updated in last hour, or if no balance exists,
     * updates storage with new balance and current timestamp
     */
    function setCoinBalance(customer_correlated, coin_balance){
      if(customer_correlated.cc){
        let lastUpdated = Date.now() - customer_correlated.cc.U;
        if(lastUpdated > 3600000 ){
          customer_correlated.cc.U = Date.now()
          customer_correlated.cc.B = coin_balance
          localStorage.setItem('customer_correlated', JSON.stringify(customer_correlated))
        }else{
          return
        }
      }else{
        customer_correlated.cc = {B: coin_balance, U: Date.now()}
        localStorage.setItem('customer_correlated', JSON.stringify(customer_correlated))
      }
    }

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
      {#each referrals as transaction }
      <div class="collapse collapse-arrow bg-base-200 my-4 rounded-md text-blue-600/75 p-4" style:background-color={transaction.transaction_type === "EARN" ? "rgb(219 234 254)" : "rgba(255, 0, 0, 0.5)"} 
      style:color={transaction.transaction_type === "EARN" ? "inherited" : "black"}>
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title text-xl font-medium flex gap-3"><UserCheck size={29}/><p><u>{transaction.customer_name}</u> {#if transaction.source === "REFERRAL"} Referral {:else if transaction.source === "PROFILE_UPDATE"} Profile update {:else} Purchase {/if} </p></div>
        <div class="collapse-content">
          <p>Date: {transaction.created_at.split('T')[0]}</p>
          <p>{transaction.transaction_type}: {transaction.coin_balance}</p>
          <p>Status: {transaction.status}</p>
        </div>
      </div>
      {/each}
    {/if}
  </div>