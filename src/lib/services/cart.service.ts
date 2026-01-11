export type Cart = {
    id: string,
    customer_id: string,
    created_at: string,
    updated_at?: string,
    status: "active" | "abandoned" | "converted"
}

export async function getCartItemsByCartId(cartId: number): Promise<void> {
    try {
        const response = await fetch(`/api/carts/${cartId}/items`);
        const items = await response.json();
        console.log(items);

    } catch (error) {
        console.log(error)
    }
}