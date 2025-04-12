<script>
    import { onMount } from "svelte";
    import '@tailwind'

    let productId = $state()
    let customerId = $state()
    onMount(()=>{
        productId = window.location.pathname.split("/")[3]
        customerId = JSON.parse(localStorage.getItem('customer_correlated')).i
        
        console.log("di")
        registerInquiry()
        console.log("fu")
    })

    async function registerInquiry() {
        try{
            let response = await fetch('/api/registerInquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    customerId: customerId
                })
            })

            if(response.ok){
                window.location= '/'
            }
        }catch(error){
            console.log(error)
        }
    }
</script>

<div class=" bg-gradient-to-br flex items-center justify-center p-6">
  <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-8 transition-all duration-300 hover:shadow-xl">
    <div class="text-center mb-8">
      <div class="inline-block bg-indigo-100 p-3 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-3">Thank You for Your Inquiry</h2>
      <p class="text-gray-600 mb-6">Your product inquiry has been successfully registered. Our team is processing your request.</p>
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
    </div>
    <div class="border-t border-gray-200 pt-6">
      <p class="text-sm text-gray-500 text-center">We'll be in touch with you shortly.</p>
    </div>
  </div>
</div>

<style>
    .spinner-container {
        margin: 30px auto;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(99, 102, 241, 0.2);
        border-radius: 50%;
        border-top-color: #6366f1;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>