import { getCartId } from "./cartId";

class Cart {
  items: any

  constructor(){
    this.items = getCartItemsById(4)
  }

  get id(): Promise<number | null> {
    return getCartId();
  }

}

export const cart = new Cart()

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
