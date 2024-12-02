export default async function checkUserAccount() {
    const mobile = sessionStorage.getItem('mobile')
    const password = sessionStorage.getItem('password')
    
    if (!mobile || !/^\d{10}$/.test(mobile)) {
        throw new Error('Invalid mobile number');
    }

    try {
        const response = await fetch('./login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobile, password}),
        });


        if(response.ok){
            let data = await response.json()
            console.log(data.Customer)
            let customer = data.Customer
            let customer_correlated = {
            i:customer.customer_id,
            r:customer.customer_referral_code
          }

          localStorage.setItem("customer_correlated", JSON.stringify(customer_correlated));
            return true
        }else if(response.status === 404){
            return false
        }else{
            console.log("bhen chod kya hua")
        }
    } catch (error) {
        console.error('Error checking user account:', error);
        throw error;
    }
}