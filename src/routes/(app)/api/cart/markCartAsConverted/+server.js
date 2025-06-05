import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    const { cart_id } = await request.json();

    try {
        const query = `UPDATE carts
                       SET status = 'converted'
                       WHERE cart_id = $1;`;
        await pool.query(query, [cart_id]);

        // console.log(result.rows[0].coalesce)

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