<script>
  import { preventDefault } from 'svelte/legacy';
  import '@tailwind'
  import '../../../app.css';
  import { Eye, EyeOff } from 'lucide-svelte';
  import './style.css'
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import  checkUserAccount  from './accounts/user_exists_check';
  import logtail from '$config/logtail.client';
    import { customerId } from '$lib/utils/customerCorrelated';


  let isLoading = $state(false)
  let loadingButton
  let username = $state('')
  let mobileNumber = $state('')
  let password = $state('')
  let showPassword = $state(false)
  let validationMessage = $state('')
  let mobileValidationMessage = $state('')

  const referred_id = $page.url.searchParams.get('ref')

  function validateMobileNumber(number) {
    return number.length === 10;
  }

  function formValid() {
    let isValid = true;

    if (password.length < 8 || password.length > 20) {
      validationMessage = "Password must be between 8 and 20 characters";
      isValid = false;
    } else {
      validationMessage = "";
    }

    if (mobileNumber.length > 0 && !validateMobileNumber(mobileNumber)) {
      mobileValidationMessage = "Mobile number must contain 10 digits";
      isValid = false;
    } else {
      mobileValidationMessage = "";
    }

    return isValid;
  }

  function toggleShowPassword() {
    showPassword = !showPassword;
  }

  async function handleSubmit() {
    if (formValid()) {
      loadingButton.disabled = true
      isLoading = true

      console.log("Form submitted successfully");
      sessionStorage.setItem('name', username);
      sessionStorage.setItem('mobile', mobileNumber);
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('referred_id', referred_id);

      let userPresent = await checkUserAccount()
      console.log(userPresent)
      if(!userPresent){
        logtail.info('New signup initiated.', {
          username,
          mobileNumber,
        })
        logtail.flush()
        window.location.href = `./MVCFOROTP?${mobileNumber}`;
      }else{
        isLoading = false
        let modal = document.getElementById("my_modal_2")
        modal.showModal()

        setTimeout(()=>{
          window.location.href = `./login`;
        },3000)
      }
      
    }
  }

  function handleMobileInput(event) {
    // Remove any non-digit characters
    mobileNumber = event.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    mobileNumber = mobileNumber.slice(0, 10);
    formValid();
  }

  onMount(()=>{
    loadingButton = document.querySelector("#submitButton")
  
  })
</script>
<svelte:head>
  <title>Coins</title>
  <meta name="description" content="Students can Earn up to 400 rupee on callow" />
  <meta property="og:title" content="Join Callow Now" />
  <meta property="og:description" content="Discover a wide range of stationery items at Callow – from notebooks and pens to office essentials, all in one place." />
  <meta property="og:image" content="https://callow.in/stationerywhatsapp.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Callow.in" />
</svelte:head>
<div class="px-2 mt-10 w-full flex items-center justify-center">
  <div class="form relative drop-shadow-[0.5px_0.5px_1px_var(--primary-color)] rounded-md w-90 bg-white p-10">
    <form class="signup-form" onsubmit={preventDefault(handleSubmit)}>
      <h2>CREATE YOUR ACCOUNT</h2>

      <div class="mb-5">
        <input 
          type="text" 
          required 
          placeholder="Username" 
          bind:value={username} 
          autocomplete="off" 
        />
      </div>

      <div class="mb-5">
        <input 
          type="tel" 
          required 
          placeholder="Mobile Number" 
          bind:value={mobileNumber} 
          oninput={handleMobileInput} 
          autocomplete="off" 
        />
        {#if mobileValidationMessage}
          <span class="validation-message">{mobileValidationMessage}</span>
        {/if}
      </div>

      <div class="mb-5">
        <div class="password-input">
          {#if showPassword}
            <input
              type="text"
              required
              placeholder="Password"
              bind:value={password}
              oninput={formValid}
              autocomplete="off"
            />
          {:else}
            <input
              type="password"
              required
              placeholder="Password"
              bind:value={password}
              oninput={formValid}
              autocomplete="off"
            />
          {/if}

          <button type="button" onclick={toggleShowPassword} class="cursor-pointer" aria-label="Toggle password visibility">
            {#if showPassword}
            <Eye />
            {:else}
            <EyeOff />
            {/if}
          </button>
          
        </div>
        {#if validationMessage}
          <span class="validation-message">{validationMessage}</span>
        {/if}
      </div>

      <button type="submit" 
              id="submitButton"
              class="singup flex items-center justify-center disabled:bg-gray-700 disabled:cursor-not-allowed">
              {#if !isLoading}
              SIGN UP
              {:else}
              <span class="loading loading-ring loading-sm"></span>
              {/if}
      </button>
      <p class="message">Already have an account? <a href="../login">Sign In</a></p>
    </form>
  </div>
</div>

<!-- Open the modal using ID.showModal() method -->

<dialog id="my_modal_2" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Account Already exsist</h3>
    <p class="py-4">We glad that your mobile number is already linked with account thus we are redirecting you to login page in <span class="text-blue-700">3 second</span></p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>