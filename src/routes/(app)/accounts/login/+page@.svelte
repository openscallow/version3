<script lang='ts'>
/**
 * Created by: Gautam mer (CEO)
 * Created at: 01/01/2026
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 01/01/2026
 * Last change: initialize
*/
import '@styles';
import Input  from '$lib/components/svelte/Input.svelte';
import Button from '$lib/components/shared/Button.svelte';
import { Customer } from '$lib/utils/Customer';

let password = $state()
let mobileNumber = $state();
let mobileValidationMessage = $state();
let passwordValidationMessage = $state();

async function validateCustomerInfo(){
    if(!mobileNumber || mobileNumber.toString().length !== 10) {
        mobileValidationMessage = 'Please type a phone number with 10 digits.';
        return;
    } else {
        mobileValidationMessage = '';
    }

    if(!password) {
        passwordValidationMessage = 'Please type password';
        return;
    } else {
        passwordValidationMessage = '';
    }

    try {
        let response = await fetch('/api/accounts/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password, mobileNumber})
        })

        if (response.ok) {
            let {hasAccount, message, customerID, customerReferrerCode, CCB} = await response.json()

            if (hasAccount && message === 'found customer with credentials') {
                let customer = new Customer();
                customer.setData = {
                    i: customerID, 
                    r: customerReferrerCode, 
                    cc: {
                        B: CCB,
                        U: Date.now()
                    }
                }
            }

            window.location.href = '/';
        }
    } catch (error) {
        throw new Error('Hit the error while fetching customer information');
    }
}
</script>
<svelte:head>
  <title>Callow</title>
  <meta name="description" content="Log in to Callow to manage stationery orders, track deliveries, and access affordable student stationery online." />
  <meta property="og:title" content="Callow Login – Online Stationery Store" />
  <meta property="og:description" content="Log in to your Callow account to manage stationery orders, track deliveries, and access affordable student school supplies online." />
  <meta property="og:image" content="https://callow.in/stationerywhatsapp.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Callow.in" />
  <meta property="og:url" content="https://www.callow.in/accounts/login" />

  <link rel="canonical" href="https://www.callow.in/signUp" />
</svelte:head>
<main>
    <div class="container">
        <header>
            <h1>Login continue to Callow</h1>
        </header>
        <Input type="number" message={mobileValidationMessage} lable="Mobile" bind:value={mobileNumber}/>
        <Input type="text" message={passwordValidationMessage} lable="Password" bind:value={password}/>
        <Button buttonName="Next" backgroundColor ="var(--color-auth-cta-bg)" activeColor = "var(--color-auth-cta-active)" onclick={validateCustomerInfo}/>
        <a class="forgot_password" href="./password/reset">Forgot password?</a>
    </div>
</main>

<style>
    main {
        display: grid; 
        width: 100%;
        min-height: 100vh;
        background-color: #01263a;
        justify-content: center;
    }

    .container {
        padding: 1.2rem;
        padding-top: 3rem;
    }

    .container header {
        margin-bottom: 1rem;
    }

    .container header h1 {
        color: white;
        font-weight: 300;
        font-family: var(--font-family-auth);
    }
    .forgot_password{
        color: var(--color-auth-hyperlink);
        display: block;
        text-align: center;
        margin-top: 1.5rem;
        text-decoration: underline;
        font-family: var(--font-family-auth);
    }
</style>