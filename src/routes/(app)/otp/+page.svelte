<script>
  import '@tailwind'
  import './style.css'
  import uuid from '$lib/utils/uuid.js'
  import logtail from '$config/logtail.client';

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
        createNewCustomer()
      }else{
        alert('wrong otp')
      }
      console.log('Verifying OTP:', otpInputs.join(''),xyz);
    }

    async function createNewCustomer(){
      let customer_id = uuid({parts : 4})
      let customer_name = sessionStorage.getItem('name')
      let customer_mobile = sessionStorage.getItem('mobile')
      let customer_password = sessionStorage.getItem('password')
      let customer_referral_code = uuid()
      let customer_referred_by = sessionStorage.getItem('referred_id') || null

      try {
        const response = await fetch('/otp/api',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ customer_id, customer_name, customer_mobile, customer_password, customer_referral_code, customer_referred_by})
          
        })

        if(response.ok){
          if(typeof window !== 'undefined' && window.sessionStorage){
            logtail.info('New Customer created', {
              customer_name,
            })
            logtail.flush()
            localStorage.setItem('customer_correlated', JSON.stringify({i:customer_id, r:customer_referral_code}))
            sessionStorage.getItem('userData') ?  window.location.href = '/order' : window.location.href = '/'
            
          }
        }
        
      } catch (error) {
        logtail.info(error, {
          customer_name,
          customer_mobile
        })
        logtail.flush()
        console.log(error)
      }
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