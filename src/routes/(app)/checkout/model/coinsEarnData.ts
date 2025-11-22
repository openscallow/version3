/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 28/10/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 28/10/2025
 * Last change: initialize
 * 
*/

import { getOrderDataFromSession } from './getOrderDataFromSession';

export function coinsEarned(){
    // Get order data 
    const orderData = getOrderDataFromSession();
    
    return  orderData?.coinsEarned;
}