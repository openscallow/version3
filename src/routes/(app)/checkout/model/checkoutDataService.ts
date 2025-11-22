/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 12/10/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 28/10/2025
 * Last change: discount, promoCode, and coinsEarn data has been emebeded
 * 
*/

import { customerData } from "./customerData";
import { getDiscount } from "./discount";
import { promoCodeData } from "./promoCodeData";
import { coinsEarned } from "./coinsEarnData";
import { getTotalAmount } from "./totalAmount.svelte";
import { getPaymentMethod } from './paymentMethod.svelte';
import { getPledgeCoins } from './pledgeCoins.svelte';

export function checkoutDataService() {
    let {customer_id,institute_name, productName, items_count, cart_id} = customerData() ?? {};
    let discount = getDiscount();
    let {code, assignmentId} = promoCodeData() ?? {};
    let totalAmount = getTotalAmount();
    let payment_method = getPaymentMethod();
    let used_coin = getPledgeCoins()
    let coinsEarn = coinsEarned();

    // Temporary patch 
    used_coin = used_coin === 0 ? null : used_coin;
    return {
        customer_id,
        institute_name,
        items_count,
        discount_amount: discount,
        productName,
        promo_code: code,
        total_amount: totalAmount.value,
        payment_method,
        used_coin,
        coins_earned: coinsEarn,
        cart_id,
        assignmentId
    }
    
}
