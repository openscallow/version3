import { json, error } from '@sveltejs/kit';
import { pool } from '$config/postgresql.config';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, params }) => {
    const { cartId } = params;
    
    if (!cartId) throw error(400, { message: 'Cart ID is required' });

    try {
        const query = `SELECT * FROM cart_items WHERE cart_id = $1`;
        const result = await pool.query(query, [cartId]);

        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);

        return new Response(JSON.stringify({ message: "Failed to fetch cart items" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        }
    );
    }
}