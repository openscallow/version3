/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 12/10/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 12/10/2025
 * Last change: coins_earned fild incorporate
 * TODO: in future coins earned field comes from database rather than session storage.
 * 
*/

interface PendingOrderData {
    name: string;
    id: string;
    quantity: number;
    actualPrice: number;
    currentPrice: number;
    coins_earned: number;
    cart_id: number | null
}

interface OrderResult {
    product_name: string;
    items_count: [string, number];
    actualPrice: number;
    currentPrice: number;
    coinsEarned: number;
    cart_id: number | null;
}

export function getOrderDataFromSession(): OrderResult | undefined {
    const pendingOrderDataString = sessionStorage.getItem('pending_order');
    if (!pendingOrderDataString) {
        return undefined;
    }
    
    const pendingOrderData: PendingOrderData = JSON.parse(pendingOrderDataString);

    if (pendingOrderData?.name && pendingOrderData?.id && pendingOrderData?.quantity) {
        return {
            product_name: pendingOrderData.name,
            items_count: [pendingOrderData.id, pendingOrderData.quantity],
            actualPrice: pendingOrderData.actualPrice,
            currentPrice: pendingOrderData.currentPrice,
            coinsEarned: pendingOrderData.coins_earned,
            cart_id: pendingOrderData.cart_id
        };
    }
    
    return undefined;
}