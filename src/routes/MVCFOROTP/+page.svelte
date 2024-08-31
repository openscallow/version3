<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    const mobile = $page.url.search.substring(1);

    console.log (mobile)
    let otp = '';
    let message = '';
    
    // Function to generate a random 4-digit number
    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    
    // Function to send OTP via SMS
    async function sendOTP(otp) {
        const apiKey = 'Y3f8PIlhmNXutAwTs2yqvKbCEcO4G50SMoWiVek6j7ZHUadF1Ru0GpFV7SvHtWsw5nZzDYIxB3MCRKXL'; // Ensure your API key is valid
        const numbers = mobile;  // Replace with the actual number
        const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&route=otp&variables_values=${otp}&flash=0&numbers=${numbers}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Network response was not ok: ${response.status} - ${response.statusText} - ${errorDetails}`);
            }
            const data = await response.json();
            message = 'OTP sent successfully';
            console.log('OTP sent successfully:', data);
            window.location.href = '../otp';
        } catch (error) {
            message = 'Error sending OTP: ' + error.message;
            
            console.error('Error sending OTP:', error);
        }
    }
    
    // Function to save OTP in session storage
    function saveOTP(otp) {
        sessionStorage.setItem('otp', otp);
        
    }
    
    // Main function to execute all steps
    function handleOTP() {
        otp = generateOTP();
        saveOTP(otp);
        sendOTP(otp);
        
        console.log('Generated OTP:', otp);
    }
    
    // Call the main function when the component mounts
    onMount(() => {
        handleOTP();
    });
</script>
    

    

 