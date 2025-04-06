/**
 * Redirects users based on their state in the application flow.
 * - Checks if institute_name exists in localStorage
 * - Checks if pending_order exists in sessionStorage
 * - Redirects to appropriate pages if required data is missing
 * - Includes error handling to ensure redirection occurs even if exceptions are thrown
 */

// there is typo error on "adderss" it should be "address"

export default function redirectUserBasedOnState() {
    try {
        const userAddress = localStorage.getItem('institute_name');
        const product = sessionStorage.getItem('pending_order');
        
        if(!userAddress) {
            console.log('No institute_name found, redirecting to address page');
            window.location.href = '../adderss';  
            return;
        }
        
        if(!product) {
            console.log('No pending_order found, redirecting to home page');
            window.location.href = '/';
            return;
        }
    } catch (error) {
        console.error('Error in redirect function:', error);
        // Fallback redirect in case of errors
        window.location.href = '/';
    }
}