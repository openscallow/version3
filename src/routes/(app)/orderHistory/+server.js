import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        // Parse and validate the request body
        const { i } = await request.json();
        if (!i) {
            return new Response(JSON.stringify({ error: 'Invalid customer ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // SQL query
        const query = `
            SELECT 
                order_id,
                institute_name, 
                created_at, 
                items_count, 
                total_amount, 
                discount_amount, 
                promo_code, 
                payment_method 
            FROM 
                customerorders 
            WHERE 
                customer_id = $1 AND status = 'Pending';
        `;

        // Execute query
        const { rows } = await pool.query(query, [i]);

        // Return successful response with rows
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
