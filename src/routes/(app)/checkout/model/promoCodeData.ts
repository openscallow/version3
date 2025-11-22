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

interface PromoCodeData {
    code: string | null;
    assignmentId: string | null;
    discountPercentage: string | null;
    discountAmount: string | null;
}

export function promoCodeData(): PromoCodeData | null {
    const discountPercentage = sessionStorage.getItem('discount_percentage');
    const discountAmount = sessionStorage.getItem('discountamount');

    // Return null if no discount data exists
    if (!discountPercentage && !discountAmount) {
        return null;
    }

    const code = sessionStorage.getItem('coupon');
    const assignmentId = sessionStorage.getItem('assignment_id');

    return {
        code,
        assignmentId,
        discountPercentage,
        discountAmount
    };
}