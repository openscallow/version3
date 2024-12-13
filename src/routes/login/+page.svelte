<script>
  // Importing required modules and styles
  import '@tailwind';
  import usercheck from './check_user.js';
  import './style.css';

  // State variables
  let password = $state(''); // User's password input
  let validationMessage = $state(''); // Validation message to show errors
  let mobile = $state(''); // User's mobile input

  /**
   * Validates the form inputs (password and mobile number).
   * @returns {boolean} - Returns true if the form inputs are valid, false otherwise.
   */
  function formValid() {
    let isValid = true;

    // Validate password length
    if (password.length < 8 || password.length > 20) {
      validationMessage = "Password must be between 8 and 20 characters";
      console.warn("Password validation failed: length not within range.");
      isValid = false;
    } else {
      validationMessage = "";
    }

    // Validate mobile number (must be exactly 10 digits)
    if (mobile.length === 10) {
      validationMessage = "";
    } else {
      validationMessage = "Mobile number must contain 10 digits";
      console.warn("Mobile number validation failed: incorrect length.");
      isValid = false;
    }

    return isValid;
  }

  /**
   * Handles form submission and user authentication.
   */
  async function handleSubmit() {
    console.log("Form submission started.");
    if (formValid()) {
      console.log("Form validation passed.");
      
      // Save credentials to session storage
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('mobile', mobile);
      console.log("Credentials saved to session storage.");

      // Check user authentication
      const isUserValid = await usercheck();
      let modal = document.getElementById("my_modal_2");
      let content = document.getElementById("content");

      if (isUserValid) {
        console.log("User authenticated successfully.");
        content.innerHTML = `
          <h3 class="text-lg font-bold">You logged in</h3>
          <p class="py-4">Redirecting you to the home page. Keep shopping <span class="text-blue-700">3 seconds</span>.</p>`;
        modal.showModal();

        // Redirect to home page after 3 seconds
        setTimeout(() => {
          console.log("Redirecting to the home page.");
          window.location.href = './';
        }, 3000);
      } else {
        console.warn("Authentication failed: Incorrect mobile number or password.");
        content.innerText = "Password or mobile number is incorrect";
        modal.showModal();
      }
    } else {
      console.error("Form validation failed. Submission aborted.");
    }
  }

  /**
   * Redirects the user to the password reset page.
   */
  function passwordForgot() {
    console.log("Redirecting to password reset page.");
    window.location.href = './login/password_reset';
  }
</script>

<!-- HTML Structure -->
<div class="login-page">
  <div class="form">
    <form class="login-form" onsubmit={handleSubmit}>
      <h2>LOGIN IN YOUR ACCOUNT</h2>

      <!-- Password Input -->
      <input
        type="text"
        required
        show
        placeholder="Password"
        bind:value={password}
        autocomplete="off"
      />

      <!-- Mobile Number Input -->
      <input
        type="Mobile"
        required
        placeholder="Mobile"
        bind:value={mobile}
        autocomplete="off"
      />

      <!-- Validation Message -->
      <span id="valid-pass" class="text-red-500">{validationMessage}</span>

      <!-- Submit Button -->
      <button
        id="submit"
        type="submit"
        class="outline-none bg-[#1a202c] w-full border-0 mt-2 rounded-md px-4 py-3 text-white text-sm transition-all duration-400 ease-in-out cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white active:bg-black active:text-white">
        SIGN IN
      </button>

      <!-- Forgot Password Button -->
      <button class="btn btn-link" id="forgot" onclick={passwordForgot}>
        Forgot password
      </button>
    </form>
  </div>
</div>

<!-- Modal for Feedback -->
<dialog id="my_modal_2" class="modal">
  <div class="modal-box" id="content">
    <!-- Default Content (will be updated dynamically) -->
    <h3 class="text-lg font-bold">You logged in</h3>
    <p class="py-4">Redirecting you to the home page. Keep shopping <span class="text-blue-700">3 seconds</span>.</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>Close</button>
  </form>
</dialog>
