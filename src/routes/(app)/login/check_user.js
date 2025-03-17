export default async function checkUserAccount() {
    const mobile = sessionStorage.getItem('mobile');
    const password = sessionStorage.getItem('password');

    // Validate the mobile number
    if (!mobile || !/^\d{10}$/.test(mobile)) {
        console.error('Validation Error: Invalid or missing mobile number.');
        throw new Error('Invalid mobile number. Please ensure it is a 10-digit number.');
    }

    try {
        console.log('Attempting to log in with mobile:', mobile);

        const response = await fetch('./login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful. Customer data:', data.Customer);

            const customer = data.Customer;
            const customerCorrelated = {
                i: customer.customer_id,
                r: customer.customer_referral_code,
            };

            localStorage.setItem('customer_correlated', JSON.stringify(customerCorrelated));
            return true;
        } else if (response.status === 404) {
            console.warn('Login failed: User not found (404).');
            return false;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            throw new Error(`Login failed with status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error occurred during user account check:', error.message);
        throw new Error('Failed to check user account. Please try again later.');
    }
}
