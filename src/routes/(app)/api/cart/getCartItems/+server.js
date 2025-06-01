import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    const { cart_id } = await request.json();
    console.log(cart_id)

    try {
        const query = `
            SELECT * FROM cart_items WHERE cart_id = $1`;
        let result = await pool.query(query, [cart_id]);
        // console.log(result.rows)

        return new Response(JSON.stringify({ cart_items: result.rows}), {
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
