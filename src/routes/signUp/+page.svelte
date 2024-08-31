<script>
  import '../../app.css';

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
      // Here you can add your sign-up logic
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

<div class="signup-page">
  <div class="form">
    <form class="signup-form" on:submit|preventDefault={handleSubmit}>
      <h2>CREATE YOUR ACCOUNT</h2>

      <div class="input-group">
        <input 
          type="text" 
          required 
          placeholder="Username" 
          bind:value={username} 
          autocomplete="off" 
        />
      </div>

      <div class="input-group">
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

      <div class="input-group">
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
          <img
            src={showPassword
              ? "https://static.thenounproject.com/png/777494-200.png"
              : "https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png"}
            alt="Toggle password visibility"
            on:click={toggleShowPassword}
          />
        </div>
        {#if validationMessage}
          <span class="validation-message">{validationMessage}</span>
        {/if}
      </div>

      <button type="submit">SIGN UP</button>
      <p class="message">Already have an account? <a href="../login">Sign In</a></p>
    </form>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;0,500;0,600;0,700;1,100;1,200;1,300&display=swap');

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }

  .signup-page {
    padding-inline: 10px;
    margin-top: 40px;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .form {
    position: relative;
    filter: drop-shadow(0.5px 0.5px 1px var(--primary-color));
    border-radius: 5px;
    width: 360px;
    background-color: #ffffff;
    padding: 40px;
  }

  .input-group {
    margin-bottom: 20px;
  }

  .password-input {
    position: relative;
  }

  .form img {
    position: absolute;
    height: 20px;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .form input {
    outline: 0;
    background: #f2f2f2;
    border-radius: 4px;
    width: 100%;
    border: 0;
    padding: 15px;
    font-size: 14px;
  }

  .form input:focus {
    box-shadow: 0 0 5px 0 var(--primary-color);
  }

  .validation-message {
    color: red;
    font-size: 12px;
    display: block;
    margin-top: 5px;
  }

  .form button {
    outline: 0;
    background: var(--primary-color);
    width: 100%;
    border: 0;
    border-radius: 3px;
    padding: 15px;
    color: #FFFFFF;
    font-size: 15px;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
  }

  .form button:hover,
  .form button:active,
  .form button:focus {
    background: black;
    color: #fff;
  }

  .message {
    margin-top: 15px;
    text-align: center;
  }

  .form .message a {
    font-size: 14px;
    color: var(--primary-color);
    text-decoration: none;
  }
</style>