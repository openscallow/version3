<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 10/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 24/12/2025
 * Last change: State indicator Button component and global style incorporated
 * 
*/
import '@styles';
import { createCustomer } from './createCustomer'
import Input  from '$lib/components/svelte/Input.svelte';
import Button from '$lib/components/shared/Button.svelte';

let passwordValue: string = $state('');

let buttonName = $state('Next');
let passwordValidationMessage = $state();


async function validatePassword() {
  buttonName = 'Loading ...';

  if(passwordValue.length < 8 || passwordValue.length > 20) {
    buttonName = 'Next';
    passwordValidationMessage = "Password must be between 8 and 20 characters";
  } else {
    passwordValidationMessage = "";
    sessionStorage.setItem('password', passwordValue);
    await createCustomer()
  }
}

</script>

<main>
    <div class="container">
        <header>
            <h1>Create your password</h1>
        </header>
        <Input type="text" message={passwordValidationMessage} lable="Password" bind:value={passwordValue}/>
        <span class="sms-info">Your password must contain at least 8 characters, including one uppercase letter, one lowercase letter</span>
        <Button buttonName="Submit" backgroundColor ="var(--color-auth-cta-bg)" activeColor = "var(--color-auth-cta-active)" onclick={validatePassword}/>
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
</style>