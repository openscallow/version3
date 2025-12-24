<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 09/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 24/12/2025
 * Last change: State indicator Button component and global style incorporated
 * 
*/

import '@styles';
import { onMount } from 'svelte';
import { MoveLeft } from 'lucide-svelte';
import logtail from '$config/logtail.client';
import Input  from '$lib/components/svelte/Input.svelte';
import Button from '$lib/components/shared/Button.svelte';

let otpValue = $state();
let otpCooldownOver = $state(false)
let otpCooldownTimer = $state(90)
let buttonName = $state('Next');
let otpValidationMessage = $state();
let mobileNumber = $state();

onMount(()=>{
  mobileNumber = sessionStorage.getItem('mobile')
  let timer = setInterval(()=>{
    if(otpCooldownTimer <= 0) {
      clearInterval(timer)
      otpCooldownOver = true
    } else { 
      otpCooldownTimer -= 1
    }
  }, 1000)
})

function verifyOTP() {
  buttonName = 'Loading ...';
  let OTP = sessionStorage.getItem('OTP');

  if(OTP === `${otpValue}`) {
    otpValidationMessage = null;
    let mobileNumber = sessionStorage.getItem('mobile');
    console.log(mobileNumber)
    logtail.info('number verified', {mobileNumber})
    logtail.flush();
    window.location.href = '../password';
  } else {
    buttonName = 'Next';
    otpValidationMessage = 'wrong otp'
  }
}


</script>

<main>
    <div class="container">
        <header>
            <a href="../"><MoveLeft /></a>
            <h1>Enter the confirmation code</h1>
        </header>
        <Input type="number" message={otpValidationMessage} lable="OTP" bind:value={otpValue}/>
        <span class="sms-info">To confirm your mobile number, enter the 4-digit code sent via SMS to +91 {mobileNumber}</span>
        <Button buttonName="Next" backgroundColor ="var(--color-auth-cta-bg)" activeColor = "var(--color-auth-cta-active)" onclick={verifyOTP}/>
          {#if otpCooldownOver}
            <button>resend OTP</button>
        {:else} 
            <p>you can resend otp after {otpCooldownTimer} time</p>
        {/if}
        
    </div>
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

  .container {
    max-width: 400px;
    padding: 1.2rem;
    padding-top: 3rem;
    font-family: "Roboto Condensed", sans-serif;
  }

  .container header > a {
    color: white;
  }

  .container header h1 {
    color: white;
    font-family: inherit;
    font-weight: 300;
  }

  .sms-info {
    display: block;
    color: white;
    font-family: inherit;
    font-weight: 300;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    margin-top: 2rem;
  }

  .container > button {
    all: unset;
    color:rgb(69, 69, 255);
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
    text-decoration: underline;
    font-family: inherit;
    font-weight: 500; 
  }

  .container > p {
    color:white;
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
    font-family: inherit;
    font-weight: 300; 
  }
</style>