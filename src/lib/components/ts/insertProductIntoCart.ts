 interface CartProduct {
    cart_id: number;
    product_id: string;
    quantity: number;
    price_at_addition: number;
    productName: string;
}

export async function insertProductIntoCart({ cart_id, product_id, quantity, price_at_addition, productName }: CartProduct): Promise<void> {
    try {
        const response = await fetch('/api/cart/insertProductIntoCart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cart_id, product_id, quantity, price_at_addition, productName })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }else{
            alert('product add into cart')
        }

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error("Error while inserting product into cart:", error);
    }
}
