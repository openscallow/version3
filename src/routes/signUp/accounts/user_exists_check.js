export default async function checkUserAccount() {
    try {
        const mobile = sessionStorage.getItem('mobile');
       
        
        if (!mobile) {
            throw new Error('Mobile number not found in session storage.');
        }

        const response = await fetch('./signUp/accounts', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile }),
        });

        // Parse the response
        if (response.status === 409) {
            return true
            
        }else if(response.status === 201){   
            return false
            
        }else{
            location.reload()
        }
    } catch (error) {
        console.error('Error checking user account:', error.message);
        return { error: error.message };
    }
}
