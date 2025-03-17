export default async function checkUserAccount() {
    const mobile = sessionStorage.getItem('mobile');
    
    if (!mobile || !/^\d{10}$/.test(mobile)) {
        throw new Error('Invalid mobile number');
    }

    try {
        const response = await fetch('./signUp/accounts', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile }),
        });

        switch (response.status) {
            case 409: return true;  // User exists
            case 201: return false; // New user
            default: 
                console.error('Unexpected response status:', response.status);
                throw new Error('Account check failed');
        }
    } catch (error) {
        console.error('Error checking user account:', error);
        throw error;
    }
}