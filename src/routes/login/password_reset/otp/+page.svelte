<script>
    import '@tailwind'
    import './style.css'
    import uuid from '$lib/utils/uuid.js'
  
      let otpInputs = $state(['', '', '', '']);
    
      function digitValidate(event, index) {
        otpInputs[index] = event.target.value.replace(/[^0-9]/g, '');
      }
    
      function tabChange(index) {
        const inputs = document.querySelectorAll('input');
        if (otpInputs[index] !== '' && index < 3) {
          inputs[index + 1].focus();
        } else if (otpInputs[index] === '' && index > 0) {
          inputs[index - 1].focus();
        }
      }
    
      function verifyOTP() { 
      
        let xyz = sessionStorage.getItem('otp')
        
        if (xyz === otpInputs.join('')){
          const button = document.getElementsByClassName('verify-btn')
          button[0].disabled = true
          window.location.href = `./newPassword`
        }else{
          alert('wrong otp')
        }
        console.log('Verifying OTP:', otpInputs.join(''),xyz);
      }
  
   
    </script>
    
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="otp-card">
            <h2 class="title">Verify OTP</h2>
            
            <form class="otp-form">
              {#each otpInputs as _, index}
                <input
                  class="otp-input"
                  type="text"
                  bind:value={otpInputs[index]}
                  oninput={(e) => digitValidate(e, index)}
                  onkeyup={() => tabChange(index)}
                  maxlength="1"
                >
              {/each}
            </form>
            <hr>
            <button class='verify-btn' onclick={verifyOTP}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>