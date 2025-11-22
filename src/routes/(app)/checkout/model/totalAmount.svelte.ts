/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 21/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 22/11/2025
 * Last change: incorporeted computeUnpledgedTotal() and change totalAmount to object rather than simple state
 * 
*/
import { getSubTotal } from "./subTotal";
import { getDiscount } from "./discount";
import { promoCodeData } from "./promoCodeData";


const subTotal = Number(getSubTotal());
const discount = Number(getDiscount());

export const totalAmount = $state({
	value: 0
});

export function getTotalAmount() {
	return totalAmount;
}

export function updateTotalAmount(newTotalAmount: number) {
    totalAmount.value = newTotalAmount;
}

export function computeUnpledgedTotal(): void {
    if(promoCodeData()) {
        const { discountPercentage, discountAmount } = promoCodeData() ?? {};
        if (discountPercentage !== 'null') {
            totalAmount.value = Math.floor(subTotal - (subTotal * (Number(discountPercentage) / 100)) - discount);
        } else {
            totalAmount.value = Math.floor(subTotal - Number(discountAmount) - discount) > 0 ? Math.floor(subTotal - Number(discountAmount) - discount) : 0;
        }
    } else {
        totalAmount.value = subTotal - discount
    }
}

computeUnpledgedTotal()
