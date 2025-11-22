/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 26/10/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 26/10/2025
 * Last change: cart_id attrtibute inserted and returning null instead of error on empty value. variable product_name -> productName
 * 
*/

import { customerId } from '$lib/components/ts/customer_correlated.svelte';
import { getOrderDataFromSession } from './getOrderDataFromSession';
import { institute_name } from '$lib/components/ts/getInstituteName';


interface customerData {
    customer_id: string;
    product_id?: string;        // Currently not used in database, so marked as optional
    quantity?: string;          // Currently not used in database, so marked as optional
    items_count: [string, number]
    productName: string;
    institute_name: string;     // Currently typed as instituteName in database
    cart_id: number | null;
}


export function customerData(): customerData | null  {
    // Get customer ID
    const customer_id = customerId();
    if (!customer_id) return null;
    // Get order data 
    const orderData = getOrderDataFromSession();
    if (!orderData) return null;

    // Get institute name
    if (!institute_name) return null;

    return {
        customer_id,
        institute_name,
        items_count: orderData.items_count, 
        productName: orderData.product_name, 
        cart_id: orderData.cart_id
    }
}