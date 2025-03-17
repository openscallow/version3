import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        // Parse and validate the request body
        const { order_id } = await request.json();
        if (!order_id) {
            return new Response(JSON.stringify({ error: 'Invalid order ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // SQL query
        const query = `UPDATE customerorders SET status = 'Canceled' WHERE order_id = $1`;

        // Execute query
        const result = await pool.query(query, [order_id]);

        // Check if rows were affected
        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'Order not found or already updated' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Return successful response
        return new Response('Order status updated to "cancel"', {
            status: 200,
            headers: { 'Content-Type': 'application/text' },
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
        // Return error response
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
