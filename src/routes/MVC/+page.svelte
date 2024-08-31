<script>

  function checkAddressAndRoute() {
    // Get the user's address from local storage
    const userAddress = localStorage.getItem('userAddress');
    const userData = localStorage.getItem('mobile');
    
    // Check if the addreprodcutObj =JSON.parse(sessionStorage.getItem("userData"));ss is present in local storage
    if (!userAddress) {
      //redirect to the address page
        window.location.href = '../adderss';
      
    }else if(!userData){
      window.location.href = '../login';
    }else {
      //redirect to the order
      window.location.href = '../order';
    }
  }
  
  // Call the function when the page loads
  checkAddressAndRoute();
</script>