<script>
    import '../../app.css'
    import '@tailwind'
    import usercheck from './check_user.js'

    let password = $state('')
    let validationMessage = $state('')
    let mobile = $state('')
    function formValid() {
    let isValid = true;

    if (password.length < 8 || password.length > 20) {
      validationMessage = "Password must be between 8 and 20 characters";
      isValid = false;
    } else {
      validationMessage = "";
    }

    if (mobile.length > 0  && mobile.length < 11) {
      validationMessage = "";
    } else {
      validationMessage = "Mobile number must contain 10 digits";
      isValid = false;
    }

    return isValid;
  }
 
   async function handleSubmit() {
      if (formValid()) {
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('mobile', mobile);

        if( await usercheck() ){
          let modal = document.getElementById("my_modal_2")
          modal.showModal()

          setTimeout(()=>{
            window.location.href = `./`
          }, 2000)
        }
        else{
          let modal = document.getElementById("my_modal_2")
          let content = document.getElementById("content")
          content.innerText = "password or mobile number is incorrect"
          modal.showModal()
        }
      }
    }

    function passwordForgot(){
      window.location.href = `./login/password_reset`;
    }

  </script>
  
  <div class="login-page">
    <div class="form">
      <form class="login-form" onsubmit={handleSubmit}>
        <h2>LOGIN IN YOUR ACCOUNT</h2>
        
        <input
              type="text"
              required
              show
              placeholder="Password"
              bind:value={password}
              autocomplete="off"
        />

        <input
              type="Mobile"
              required
              placeholder="Mobile"
              bind:value={mobile}  
              autocomplete="off"
            />
        <span id="vaild-pass" class="text-red-500">{validationMessage}</span>
        <button  id="submit" type="submit" class="outline-none bg-[#1a202c] w-full border-0 mt-2 rounded-md px-4 py-3 text-white text-sm transition-all duration-400 ease-in-out cursor-pointer hover:bg-black hover:text-white focus:bg-black focus:text-white active:bg-black active:text-white">SIGN IN</button>

        <button class="btn btn-link"  id="forgot" onclick={passwordForgot}>Forgot password</button>
      </form>
    </div>
  </div>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box" id="content">
      <h3 class="text-lg font-bold">You logged in</h3>
      <p class="py-4">redirecting you to home page keep shoping <span class="text-blue-700">3 second</span></p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

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
      margin: 10px 0;
      font-size: 14px;
    }  
  </style>