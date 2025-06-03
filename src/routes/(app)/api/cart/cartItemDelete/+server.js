import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    const { cartItemId, cartId } = await request.json();
    console.log(cartItemId, cartId, "from server file")

    try {
        const query = `DELETE FROM cart_items WHERE cart_item_id=$1 AND cart_id=$2`;
        let result = await pool.query(query, [cartItemId, cartId]);
        // console.log(result)

        return new Response({
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error inserting cart item:', error);
        return new Response(JSON.stringify({ error: 'Failed to add item to cart' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
