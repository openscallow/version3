<script>
    import { Info } from 'lucide-svelte';
    let schools = [ 
        "AKSHARJYOTI HIGHER SECONDARY SCHOOL", 
        "ANGLO URDU HIGH SCHOOL", 
        "ANKUR HIGH SCHOOL", 
        "ANKUR VIDHYABHAVAN(H.S.)", 
        "ASHADEEP UCCHTAR MADHYAMIK SHALA", 
        "ASHADEEP VIDHYALAY", 
        "ASPIRE PUBLIC SCHOOL", 
        "B.H.KALSARIYA UCHCHATAR MADH. SHALA", 
        "BOGHRA AND AGRAWAL HIGHER SECONDARY SCHOOL", 
        "C. S. VIDYA BHARTI ENGLISH SCHOOL" 
    ];

    function storeUserAddress() {
        // Get the input element with class 'address'
        const addressInput = document.querySelector('.address');
        
        // Check if the element exists
        if (addressInput) {
            // Get the value from the input
            const address = addressInput.value.trim();
            
            // Store the address in localStorage if it's not empty
            if (address) {
                localStorage.setItem('userAddress', address);
                console.log('Address stored successfully');
                
                // Optionally, you can call checkAddressAndRoute() here to immediately
                // handle routing based on the newly stored address
                window.location.href = '../MVC';
            } else {
                console.log('Address is empty, not stored');
            }
        } else {
            console.log('Address input element not found');
        }
    }


</script>

<div id="containner">
    <h3>Enter your school name </h3>
    <input list="school" class="address"/>
    <datalist id="school">
        {#each schools as school}
            <option>{school}</option>
        {/each}window.location.href = '../order';
    </datalist>
    
    <span style="display: flex; align-items: center; margin-top:5px;">
        <Info style="margin-right: 8px;" /> 
        <span>you can change this information whenever you want</span>
      </span>
    <button on:click={storeUserAddress}>save</button>
</div>

<style>
    #containner{
        width:100%;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    h3{
        margin-top: 10px;
    }
 
    input{
        margin-top: 10px;
        border-radius: 0.25rem;
        border: 1px solid black;
        width: calc(100vw - 2rem);
        padding: 0.5rem;
        font-size: 1rem;
    }
    button{
        width: calc(100vw - 2rem);
        margin-top: 20px;
        background-color: #1a202c;
        color: white;
        padding: 12px;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
    }
</style>
