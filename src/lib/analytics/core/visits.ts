/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 26/08/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 26/09/2025
 * Last change: Prioritized the customer-checking process first, because it embeds a key into session storage 
 * even if the visitor is not a customer. When they complete sign-up, since the key is already available in 
 * session storage, the code neglects all other checks.
 * 
*/

import { customerId } from '$lib/components/ts/customer_correlated.svelte';
import { api } from '$lib/utils/api';

export async function visit() {
    // if visitor is not customer do nothing
    let customer_id = customerId()
    if(!customer_id) return;

    // check session first so it want update every time when user referesh page 
    if(sessionStorage.getItem('sessionContinuity')) return;
    sessionStorage.setItem('sessionContinuity', 'true')

    // generate date format
    const date = new Date(); // Current date
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    // else register necessary field in document
    try {
        const result = await api.post('/visit', {customer_id, formattedDate});
        console.log(result)
    } catch (error) {
        
    }
}

