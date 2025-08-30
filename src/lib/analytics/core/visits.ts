/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 26/08/2025
 * 
 * Last by: Gautam mer (CEO)
 * Created at: 26/08/2025
 * 
*/

/**
 * 
 * 
*/

import { customerId } from '$lib/components/ts/customer_correlated.svelte';

export async function visit() {
    let customer_id = customerId()

    // if visitor is not customer do nothing
    if(!customer_id) return;

    // else register necessary field in document
    try {
        
    } catch (error) {
        
    }



}

