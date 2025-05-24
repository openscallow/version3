import { hasCart, getUserCart } from '$lib/components/ts/cart'
import { insertProductIntoCart } from '$lib/components/ts/insertProductIntoCart'
export async function handleCartInsert(
    product_id: string, 
    Quantity: number, 
    currentPrice: number): Promise<void> {

    let cart: { i: number; u: number } | null = null;

    // check cart's information exisit locally 
    if (hasCart()) {
        console.log("cart is exist :)")
        const cartRaw = localStorage.getItem('cart');
        if (cartRaw !== null) {
            try {
                cart = JSON.parse(cartRaw);
            } catch (error) {
                // use telemetry
                console.error("Failed to parse cart from localStorage:", error);
            }
        }

    } else {
        console.log("sorry dear cart isn't exist :(")
        // get cart from database
        const userCart = await getUserCart();
        if (userCart) {
            cart = { 
                i: Number(userCart.i), 
                u: Number(new Date(userCart.u).getTime())
            };
        }
    }

    if(cart !== null) {
        try {
           await insertProductIntoCart({cart_id: cart.i, product_id, quantity: Quantity, price_at_addition: currentPrice}) 
           console.log('fuck product inserted into cart')
        } catch (error) {
            // use telemetry
            console.log(error)
        }
    }

    
}       
