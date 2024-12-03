<script>
    import '@tailwind';
    import './style.css';
  

    let mobile = $state(''); // Reactive state for mobile number
    let validationMessage = $state(''); // Reactive state for validation messages
  
    // Validate mobile number (assuming minimum length requirement)
    function formvalid() {
      if (mobile.trim().length < 10) {
        validationMessage = "Minimum 10 characters required";
        return false;
      } else {
        validationMessage = "";
        return true;
      }
    }
  
    // Handle form submission
    function handleSubmit(event) {
      event.preventDefault(); // Prevent default form submission behavior
      if (formvalid()) {
        sessionStorage.setItem('mobile', mobile);
       
        window.location.href = `./password_reset/resetOtp?${mobile}`
      }
    }
  </script>
  
  <div class="login-page">
    <div class="form">
      <form class="login-form" on:submit={handleSubmit}>
        <h2>VERIFY MOBILE NUMBER</h2>
        <input
          type="Mobile" 
          required
          placeholder="Mobile"
          bind:value={mobile}
          autocomplete="off"
        />
        <span id="vaild-pass">{validationMessage}</span>
        <button
          id="submit"
          type="submit"
          class="outline-none bg-[#1a202c] w-full border-0 mt-2 rounded-md px-4 py-3 text-white text-sm transition-all duration-400 ease-in-out cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white active:bg-black active:text-white">
          OTP
        </button>
      </form>
    </div>
  </div>
  