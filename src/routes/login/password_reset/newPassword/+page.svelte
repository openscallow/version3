<script>
    import '@tailwind';
    import './style.css';
  
    let isLoading = $state(false)
    let newPassword = $state(''); // Reactive state for mobile number
    let validationMessage = $state(''); // Reactive state for validation messages
  
    // Validate mobile number (assuming minimum length requirement)
    function formvalid() {
      if (newPassword.length < 8) {
        validationMessage = "Minimum 8 characters required";
        return false;
      } else {
        validationMessage = "";
        return true;
      }
    }
  
    // Handle form submission
    async function handleSubmit(event) {
      event.preventDefault(); // Prevent default form submission behavior
      if (formvalid()) {
        isLoading = true
        let mobile = sessionStorage.getItem('mobile')
        let response = await fetch('/login/password_reset/newPassword', {
          method:'POST',
          headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile, newPassword }),
        })

        if(response.ok){
          let data =  await response.json()
          let customer = data.updatedCustomer
          let customer_correlated = {
            i:customer.customer_id,
            r:customer.customer_referral_code
          }

          localStorage.setItem("customer_correlated", JSON.stringify(customer_correlated));

          let modal = document.getElementById("my_modal_2")
          modal.showModal()

          setTimeout(()=>{
            window.location.href = `/`
          }, 2000)
          
        }else{
          alert("something went wrong please try again")
          window.location.href = `/`
        }
        
     
      }
    }
  </script>
  
  <div class="login-page">
    <div class="form">
      <form class="login-form" onsubmit={handleSubmit}>
        <h2>ENTER NEW PASSWORD</h2>
        <input
          type="text" 
          required
          placeholder="password"
          bind:value={newPassword}
          autocomplete="off"
        />
        <span id="vaild-pass" class="text-red-500">{validationMessage}</span>
        <button
          id="submit"
          type="submit"
          class="outline-none bg-[#1a202c] w-full border-0 mt-2 rounded-md px-4 py-3 text-white text-sm transition-all duration-400 ease-in-out cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white active:bg-black active:text-white">
          {#if !isLoading}
              SIGN UP
              {:else}
              <span class="loading loading-ring loading-sm"></span>
              {/if}
        </button>
      </form>
    </div>
  </div>

  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">You logged in</h3>
      <p class="py-4">redirecting you to home page keep shoping <span class="text-blue-700">3 second</span></p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>