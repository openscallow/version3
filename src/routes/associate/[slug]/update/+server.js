import { pool } from '$lib/db/config.js';

export async function POST({ request }) {

    try {
        // Parse the incoming JSON data
        const { uniqueOrders } = await request.json();

        console.log(uniqueOrders[0])
        // Validate that uniqueOrders is an array and not empty
        if (!Array.isArray(uniqueOrders) || uniqueOrders.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid uniqueOrders provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create a parameterized query for updating multiple IDs
        const query = `
            UPDATE customerorders
            SET status = 'Delivered'
            WHERE order_id = ANY($1::int[])
            RETURNING *;
        `;

        // Execute the query with the array of uniqueOrders
        const { rows } = await pool.query(query, [uniqueOrders]);

        // If no rows are updated, send a 404 response
        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'No matching orders found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Return the updated order data
        return new Response(JSON.stringify({ data: rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
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
