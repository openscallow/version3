import { api } from '$lib/utils/api';
import { customerId } from '$lib/components/ts/customer_correlated.svelte';

export async function getCartId(): Promise<number| null> {
    if(typeof window !== 'undefined') {
        // first try to get cart ID from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || 'null');

        if(cart?.i) {
            return Number(cart.i)
        }else {
            if(customerId()){
                try {
                    let response = await api.post('/getUserCart', {customer_id: customerId()});
                    const updatedAt = new Date(response.cartInfo.updated_at).getTime();
                    localStorage.setItem('cart', JSON.stringify({ i: response.cartInfo.cart_id, u: updatedAt }));
                    return Number(response.cartInfo.cart_id);
                } catch (error) {  
                    console.log('error while fetching cart ID', error);
                    return null
                }
            }else {
                return null
            } 
        }
    }else {
        return null;
    }  
}


