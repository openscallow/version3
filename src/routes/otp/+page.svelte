<script>
    let otpInputs = ['', '', '', ''];
  
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
      // Implement your OTP verification logic here
      let xyz = sessionStorage.getItem('otp');
      if (xyz === otpInputs.join('')){
        let user =sessionStorage.getItem('name');
        let mobile =sessionStorage.getItem('mobile');
        localStorage.setItem('user', user);
        localStorage.setItem('mobile', mobile);
        // window.open('./experiment');
        window.location.href = '../experiment';
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
                on:input={(e) => digitValidate(e, index)}
                on:keyup={() => tabChange(index)}
                maxlength="1"
              >
            {/each}
          </form>
          <hr>
          <button class='verify-btn' on:click={verifyOTP}>
            Verify
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    :global(body) {
      background: #eee;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .row {
      display: flex;
      justify-content: center;
    }
    .col-md-4 {
      width: 100%;
      max-width: 400px;
    }
    .otp-card {
      background: white;
      box-shadow: 0px 3px 6px 0px #cacaca;
      padding: 20px;
      border-radius: 4px;
      text-align: center;
      margin-top: 50px;
    }
    .title {
      font-weight: 600;
      margin-top: 20px;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .otp-form {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .otp-input {
      display: inline-block;
      width: 50px;
      height: 50px;
      text-align: center;
      font-size: 24px;
      margin: 0 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    hr {
      margin: 20px 0;
      border: none;
      border-top: 1px solid #eee;
    }
    .verify-btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      border-radius: 4px;
    }
    .verify-btn:hover {
      background-color: #0056b3;
    }
  </style>