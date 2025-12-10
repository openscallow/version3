/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 10/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 10/12/2025
 * Last change: initialize
 * 
*/

import uuid from '$lib/utils/uuid.js';
import logtail from '$config/logtail.client';



export async function createCustomer() {

    let customerId = uuid({parts : 4});
    let customerName = sessionStorage.getItem('name');
    let mobileNumber = sessionStorage.getItem('mobile');
    let password = sessionStorage.getItem('password');
    let customerReferralCode = uuid();
    let customerReferredBy = sessionStorage.getItem('referred_id') || null;

    try {
        const response = await fetch('/api/createCustomer',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ customerId, customerName, mobileNumber, password, customerReferralCode, customerReferredBy})  
        })

        if (!response.ok) {
            console.log('something went wrong')
        }

        window.location.href='/'
    } catch (error) {
        logtail.error('got errro while creatng customer', {
            customerName,
            mobileNumber,
            password
        })
        logtail.flush()
        alert('something went wrong pls try again later')
    }
}