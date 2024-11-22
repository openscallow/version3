<script>
  import '@tailwind'
  import '../../app.css';
  import { Eye, EyeOff } from 'lucide-svelte';
  import './style.css'

  let username = '';
  let mobileNumber = '';
  let password = '';
  let showPassword = false;
  let validationMessage = '';
  let mobileValidationMessage = '';

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

  function handleSubmit() {
    if (formValid()) {
      console.log("Form submitted successfully");
      sessionStorage.setItem('name', username);
      sessionStorage.setItem('mobile', mobileNumber);
     
      window.location.href = `./MVCFOROTP?${mobileNumber}`;
    }
  }

  function handleMobileInput(event) {
    // Remove any non-digit characters
    mobileNumber = event.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    mobileNumber = mobileNumber.slice(0, 10);
    formValid();
  }
</script>

<div class="px-2 mt-10 w-full flex items-center justify-center">
  <div class="form relative drop-shadow-[0.5px_0.5px_1px_var(--primary-color)] rounded-md w-90 bg-white p-10">
    <form class="signup-form" on:submit|preventDefault={handleSubmit}>
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
          on:input={handleMobileInput} 
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
              on:input={formValid}
              autocomplete="off"
            />
          {:else}
            <input
              type="password"
              required
              placeholder="Password"
              bind:value={password}
              on:input={formValid}
              autocomplete="off"
            />
          {/if}

          <button type="button" on:click={toggleShowPassword} class="cursor-pointer" aria-label="Toggle password visibility">
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

      <button type="submit" class="singup">SIGN UP</button>
      <p class="message">Already have an account? <a href="../login">Sign In</a></p>
    </form>
  </div>
</div>