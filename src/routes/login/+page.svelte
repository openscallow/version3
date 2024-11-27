<script>
    import '../../app.css';
    let username = $state('');
    let password = '';
    let showPassword = $state(false);
    let validationMessage = $state('');
    let mobile = $state('');
    
    function formvalid() {
      if (false) {
        validationMessage = "Minimum 8 characters";
        return false;
      } else {
        validationMessage = "";
        return true;
      }
    }
  
    function toggleShowPassword() {
      showPassword = !showPassword;
    }
  
    function handleSubmit() {
      if (formvalid()) {
        sessionStorage.setItem('name', username);
        sessionStorage.setItem('mobile', mobile);
     
        window.location.href = `./MVCFOROTP?${mobile}`;
      }
    }

  </script>
  
  <div class="login-page">
    <div class="form">
      <form class="login-form" onsubmit={handleSubmit}>
        <h2>CREAT YOUR ACCOUNT</h2>
        <input type="text" required placeholder="Username" bind:value={username} autocomplete="off" />
        <div class="password-input">
          {#if showPassword}
            <input
              type="text"
              required
              placeholder="Password"
              bind:value={username}
              oninput={formvalid}
              autocomplete="off"
            />
          {:else}
            <input
              type="Mobile"
              required
              placeholder="Mobile"
              bind:value={mobile}
              
              autocomplete="off"
            />
          {/if}
       
        </div>
        <span id="vaild-pass">{validationMessage}</span>
        <button type="submit">SIGN IN</button>
        <!-- <p class="message"><a href="#">Forgot your password?</a></p> -->
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
  
    
  
    .login-page {
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
      height: 420px;
      background-color: #ffffff;
      padding: 40px;
    }
  
    .password-input {
      position: relative;
    }
  

  
    .form input {
      outline: 0;
      background: #f2f2f2;
      border-radius: 4px;
      width: 100%;
      border: 0;
      margin: 15px 0;
      padding: 15px;
      font-size: 14px;
    }
  
    .form input:focus {
      box-shadow: 0 0 5px 0 var(--primary-color);
    }
  
    span {
      color: red;
      margin: 10px 0;
      font-size: 14px;
    }
  
    .form button {
      outline: 0;
      background: var(--primary-color);
      width: 100%;
      border: 0;
      margin-top: 10px;
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
  
  </style>