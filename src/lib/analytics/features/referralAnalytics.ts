/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 26/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 26/11/2025
 * Last change: initilize
 * 
*/

import { api } from '$lib/utils/api';
import { customerId } from '$lib/components/ts/customer_correlated.svelte';

export async function referralAnalytics() {
    // if visitor is not customer do nothing
    let customer_id = customerId()
    if(!customer_id) return;

    try {
        
        let response =  await api.post('/referralCopied', {customer_id});
        // @ts-ignore
        if(!response.ok) {
            console.log("error occured while registring last time referral copy timestamp")
        }
    } catch (error) {
        console.log("couldn't register copied action", error)
    }

    
}