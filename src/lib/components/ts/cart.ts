import { customerId } from '$lib/components/ts/customer_correlated.svelte';

export function hasCart(): boolean{
    if (typeof window !== 'undefined' && typeof document !== 'undefined'){
        return localStorage.getItem('cart') !== null; 
    }
    return false;
}

export function cartId(){
    return JSON.parse(localStorage.getItem('cart')).i
}

export async function getUserCart(id: string | null = customerId()): Promise<{ i: number; u: string } | undefined> {
    if(id !== null) {
        try {
            let response = await fetch('/api/getUserCart', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ customer_id: id })
            })

            if (response.ok) {
                let { cartInfo } = await response.json()
                updatedCart(cartInfo.cart_id, cartInfo.updated_at)

                return {i: cartInfo.cart_id, u: cartInfo.updated_at}
            } else {
                // use telemetry 
            }
        } catch (error) {
            // use telemetry 
            console.error('Fetch error:', error);
        }
    } else {
        console.log("user has to make first account :]")
    }
}

function updatedCart(i: number, u: string): void {
    const lastUpdateMilli = new Date(u).getTime();
    localStorage.setItem('cart', JSON.stringify({i, u: lastUpdateMilli}))
}

export async function totalCartItems(){
    if (typeof window !== 'undefined') {
        // check locally first 
        if (hasCart()) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            return await getCartItemsById(cart.i)
        }else{
            let cart = getUserCart()
            console.log(cart.i)
            return await getCartItemsById(cart.i)
        }
    }
}


async function getCartItemsById(cartId: any) {
    try {
        let response = await fetch('/api/cart/totalCartItems', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cart_id: cartId })
            })

            if (response.ok) {
                let { totalCartItems } = await response.json()
                return totalCartItems;
            } else {
                // use telemetry 
            }
    } catch (error) {
        // use telemetry
        console.log(error)
    }
}
