<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import LoadingState from "$lib/components/loadingState.svelte";
    import logtail from '$config/logtail.client';

    // Constants
    const API_KEY = 'Y3f8PIlhmNXutAwTs2yqvKbCEcO4G50SMoWiVek6j7ZHUadF1Ru0GpFV7SvHtWsw5nZzDYIxB3MCRKXL';
    const OTP_LENGTH = 4;
    const OTP_MIN = 1000;
    const OTP_MAX = 9000;

    // Extract mobile number from URL query
    const mobile = $page.url.search.substring(1);
    
    // State variables
    let otp = '';
    let message = '';
    
    // Loading state properties
    let isLoading = true;
    let hasError = false;
    let loadingMessage = "Loading...";
    let errorMessage = "An error occurred.";
    let retryFunction = () => window.location.reload();
    
    /**
     * Generates a random 4-digit OTP
     * @returns {number} - 4-digit OTP
     */
    function generateOTP() {
        return Math.floor(OTP_MIN + Math.random() * OTP_MAX);
    }
    
    /**
     * Saves OTP to session storage
     * @param {string|number} otpValue - The OTP to save
     */
    function saveOTP(otpValue) {
        sessionStorage.setItem('otp', otpValue);
    }
    
    /**
     * Sends OTP via SMS using Fast2SMS API
     * @param {string|number} otpValue - The OTP to send
     */
    async function sendOTP(otpValue) {
        const url = constructApiUrl(otpValue);
        
        try {
            const response = await fetch(url);
            await handleApiResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
    
    /**
     * Constructs the Fast2SMS API URL
     * @param {string|number} otpValue - The OTP to send
     * @returns {string} - Fully formed API URL
     */
    function constructApiUrl(otpValue) {
        return `https://www.fast2sms.com/dev/bulkV2?authorization=${API_KEY}&route=otp&variables_values=${otpValue}&flash=0&numbers=${mobile}`;
    }
    
    /**
     * Handles the API response
     * @param {Response} response - Fetch API response object
     */
    async function handleApiResponse(response) {
        if (!response.ok) {
            
            const errorDetails = await response.text();
            logtail.error("Failed to send OTP", {
                mobile,
                http_status: response.status,
                response_body: response.statusText,
                errorDetails
            });
            logtail.flush();
            throw new Error(`Network response was not ok: ${response.status} - ${response.statusText} - ${errorDetails}`);
        }
        
        const data = await response.json();
        logtail.info('OTP sent successfully')
        logtail.flush()
        message = 'OTP sent successfully';
        console.log('OTP sent successfully:', data);
        window.location.href = '../otp';
    }
    
    /**
     * Handles any errors that occur during API call
     * @param {Error} error - The error object
     */
    function handleError(error) {

        logtail.error("Error sending OTP:", error, {
            mobile: mobile,
            otp: otp,
            message: message, mobile,
        });

        logtail.flush()
        console.error('Error sending OTP:', error);
        hasError = true;
        isLoading = false;
        errorMessage = 'Error sending OTP: ' + error.message;
        message = 'Error sending OTP: ' + error.message;
    }
    
    /**
     * Main function to execute the OTP flow
     */
    function handleOTP() {
        otp = generateOTP();
        saveOTP(otp);
        sendOTP(otp);
        console.log('Generated OTP:', otp);
    }
    
    // Initialize the OTP flow when component mounts
    onMount(() => {
        handleOTP();
    });
</script>

<div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
    <LoadingState
        {isLoading}
        {hasError}
        {loadingMessage}
        {errorMessage}
        {retryFunction}
    />
</div>