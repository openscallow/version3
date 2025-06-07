import { hasCart } from '$lib/components/ts/cart';
import { cartId } from '$lib/components/ts/cart';

export async function  getCartItems() {
    if(hasCart()){
        let cart_id = cartId()
        // console.log(cart_id)

        try {
           let response = await fetch('/api/cart/getCartItems', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cart_id})
           }) 

           if(response.ok){
            let {cart_items} = await response.json()
            // console.log(cart_items, "cart items")
            let setOfProducts = new Set()
            cart_items.forEach(cart_item => {
                setOfProducts.add(cart_item.product_id)
            });

            return await getProductsInfoFromMongoDB(Array.from(setOfProducts), cart_items)
            // console.log(productInfo)

            return cart_items;
           }
        } catch (error) {
            // telementory
            console.log('errror from caritems ', error)
        }
    }
}

async function getProductsInfoFromMongoDB(productIds, cart_items) {
    // console.log(JSON.stringify(productIds), "from product")

    try {
        let response = await fetch('/api/cart/getProductsInfoFromMongoDB', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productIds})
        })  
        if(response.ok){ 
            let products = await response.json()
            let finalProducts = cart_items.map(item => {
                const id = item.product_id;
                // console.log(id)
                // Find the corresponding item in cart_items
                const matchingCartItem = products.find(product => product._id === id);

                // If a matching item is found, merge it with the product
                if (matchingCartItem) {
                    return {
                        ...matchingCartItem, // Spread properties from the cart item first
                        ...item       // Spread properties from the product (will override cart item if keys clash)
                    };
                }
            });
              console.log(finalProducts, 'final product')
            return finalProducts
          
        }


    } catch (error) {
        //telementory
        console.log(error)
    }
    // console.log(products_id)
    
}
