import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    const { cart_id } = await request.json();

    try {
        const query = `SELECT COALESCE(SUM(quantity), 0) FROM cart_items WHERE cart_id = $1`;
        let result = await pool.query(query, [cart_id]);

        console.log(result.rows[0].coalesce)

        return new Response(JSON.stringify({ totalCartItems : result.rows[0].coalesce}), {
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