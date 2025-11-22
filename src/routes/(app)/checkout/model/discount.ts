/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 26/10/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 21/11/2025
 * Last change: Updated discount logic to use numeric casting and item count, and simplified return type to a raw number.
 * 
*/

import { getOrderDataFromSession } from './getOrderDataFromSession';

interface error {
    error: string
}

export function getDiscount(): number | error{
    // Get order data 
    const orderData = getOrderDataFromSession();
    if (!orderData) return { error: "An unexpected error has occurred. Please close this tab and try again."}

    // calculate discount
    let discount =  (Number(orderData.actualPrice) - Number(orderData.currentPrice)) * Number(orderData.items_count[1]);
    return discount
}
