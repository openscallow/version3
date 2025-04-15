export default async function customerTier() {
    // get current customer tier from cookie
    let customerTier = getCookie('tier')

    // fetch current customer tier from the server
    if (customerTier === null || customerTier === undefined){
        return await fetchCustomerTier()
    } else {
        return customerTier
    }

}

async function fetchCustomerTier(){

    let customerId = JSON.parse(localStorage.getItem('customer_correlated')).i

    if(customerId === null || customerId === undefined){
        return 1;
    }

    try {
        let response = await fetch('/api/customerTier', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({customerId})
        })

        if(response.ok){
            let { customerTier } = await response.json();
            saveCustomerTierOnCookie(customerTier)
            return customerTier;
        }
    } catch (error) {
        console.error('Error fetching customer tier:', error);
    }
}

// store current customer tier on cookie
function saveCustomerTierOnCookie(customerTier) {
    // Get current date
    const today = new Date();
    
    // Calculate days until next Sunday (0 is Sunday in JavaScript)
    const daysUntilSunday = (7 - today.getDay()) % 7;
    
    // If today is Sunday, we need to check if it's before midnight
    // If it is, we use today, otherwise we use next Sunday
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    
    // Set time to midnight (23:59:59)
    nextSunday.setHours(23, 59, 59, 0);
    
    // Set the cookie with the calculated expiry date
    document.cookie = `tier=${customerTier}; path=/; expires=${nextSunday.toUTCString()}`;
    
    return;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

