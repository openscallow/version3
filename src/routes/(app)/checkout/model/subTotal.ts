/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 21/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 21/11/2025
 * Last change: initialize
 * 
*/

import { getOrderDataFromSession } from './getOrderDataFromSession';

interface error {
    error: string
}

export function getSubTotal(): number | error{
    // Get order data 
    const orderData = getOrderDataFromSession();
    if (!orderData) return { error: "An unexpected error has occurred. Please close this tab and try again."}

    // calculate discount
    let subTotal =  Number(orderData.actualPrice) * Number(orderData.items_count[1]);
    return subTotal;
}