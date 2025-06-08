export async function getCartItems(cart_id: number) {
    try {
        const response = await fetch('/api/cart/getCartItems', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cart_id}),
        });

        if (response.ok) {
            let {cart_items} = await response.json()
            return cart_items;
        }
    } catch (error) {
        console.log(error)
    }
}