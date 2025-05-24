import { customerId } from '$lib/components/ts/customer_correlated.svelte';

export function hasCart(): boolean{
    return localStorage.getItem('cart') !== null;
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
