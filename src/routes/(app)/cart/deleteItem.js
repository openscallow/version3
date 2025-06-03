export async function deleteItem(cartItemId, cartId, products, index) {
    try {
        let response = await fetch('api/cart/cartItemDelete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({cartItemId, cartId})
        })

        if(response.ok){
            products = products.filter((_, i) => i !== index);
            alert(`item deleted successfully`)
        }
    } catch (error) {
        console.log(error)
    }
    // console.log(`cartItemId: ${cartItemId}\n cartId ${cartId}`)
}