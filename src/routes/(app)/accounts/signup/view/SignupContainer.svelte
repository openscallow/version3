<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 07/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 07/12/2025
 * Last change: initialize
 * 
 * @TODO : use function to set information into sessionStorage and make it external because in future we have to make it something else
*/
import { page } from '$app/state';
import logtail from '$config/logtail.client';
import Input  from '$lib/components/svelte/Input.svelte';
import Button from '$lib/components/svelte/Button.svelte';
import { validateMobileNumber } from '../controller/mobileController';

let customerName = $state();
let mobileNumber = $state();
let mobileValidationMessage = $state();
let buttonName = $state('Next');
let referredId = page.url.searchParams.get('ref')
console.log(referredId)

async function validateCustomerInfo() {
    buttonName = 'Loading ...';

    if (!customerName || !mobileNumber) {
        buttonName = 'Next';
        return
    };

    // @ts-ignore
    let mobileResult = await validateMobileNumber(mobileNumber);
    if(!mobileResult.success) {
        buttonName = 'Next';
        mobileValidationMessage = mobileResult.message;
        return;
    }
    
    // logtail.info('New signup initiated.', {customerName, mobileNumber});
    // logtail.flush();

    sessionStorage.setItem('name', `${customerName}`);
    sessionStorage.setItem('mobile', `${mobileNumber}`);
    sessionStorage.setItem('referred_id', `${referredId}`);

    window.location.href = `./signup/otp?${mobileNumber}`;
}

</script>

<div class="container">
    <header>
        <h1>Create your account</h1>
    </header>
    <Input lable="Name" bind:value={customerName}/>
    <Input type="number" message={mobileValidationMessage} lable="Mobile" bind:value={mobileNumber}/>
    <span class="sms-info">You may receive WhatsApp and SMS notifications from us from us login purpose</span>
    <Button name={buttonName} action={validateCustomerInfo}/>
    <a href="/login"> I already have an account</a>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

    .container {
        max-width: 400px;
        padding: 1.2rem;
        padding-top: 3rem;
        font-family: "Roboto Condensed", sans-serif;
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

    a {
        color:rgb(69, 69, 255);
        width: 100%;
        display: block;
        text-align: center;
        margin-top: 1.5rem;
        text-decoration: underline;
        font-family: inherit;
        font-weight: 300;
    }
</style>



