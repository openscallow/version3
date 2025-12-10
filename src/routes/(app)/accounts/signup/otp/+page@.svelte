<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 09/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 09/12/2025
 * Last change: initialize
 * 
*/

import { onMount } from 'svelte';
import { page } from '$app/state';
import logtail from '$config/logtail.client';

const mobileNumber = page.url.search.substring(1)

// loading states
let isLoading = $state(true);
let hasError = $state(false);

//Save OTP to session storage
function saveOTP(OTP:number) {
    sessionStorage.setItem('OTP', `${OTP}`);
}

onMount(async ()=>{
    try {
        let response = await fetch('/api/sentOTP', {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({mobileNumber})
        })

        if(response.ok){
            let result = await response.json()
            saveOTP(result.OTP)
            window.location.href = `./otp/verify`;
        } else {
    
            let serverResponse = await response.json()
            logtail.error('response is not okey while dispatch OTP', {serverResponse});
            logtail.flush();

            hasError = true
            isLoading = false
        } 
    } catch (error) {
        logtail.error('get error is not okey while dispatch OTP', {error});
        logtail.flush();
        hasError = true
        isLoading = false
    }
})
</script>

<main>
    {#if isLoading}
        Loading ...
    {:else if hasError}
        <span style="color:red">Opps! Something went wrong on our side, <br> please try again later </span>
    {/if}
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

    :global(body){
        margin: 0;
    }

    main {
        width: 100%;
        height: 100vh;
        display: grid;
        align-items: center;
        justify-content: center;
        font-family: "Roboto Condensed", sans-serif;
    }
</style>