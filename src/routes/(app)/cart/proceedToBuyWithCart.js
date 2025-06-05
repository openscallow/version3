import { hasCart, cartId, getUserCart } from '$lib/components/ts/cart';


export async function proceedToBuyWithCart(totalItems, subtotal, callowCoins, mrp) {
    if(totalItems > 0){
    let cart_id 

    if(hasCart()){
        cart_id = cartId()
    } else {
        cart_id = await getUserCart()
    }

    let pending_order = {
        id: cart_id,
        name: "cart",
        quantity: 1,
        currentPrice: subtotal,
        actualPrice: mrp,
        coins_earned: callowCoins,
        cart_id
    }

    sessionStorage.setItem('pending_order',JSON.stringify(pending_order))
    window.location.href = '/checkout'



    // console.log(cart_id, totalItems, subtotal, callowCoins)
}
    
}