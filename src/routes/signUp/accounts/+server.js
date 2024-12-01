import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        
        const { mobile } = await request.json();

       

        // Query the PostgreSQL database
        const query = 'SELECT * FROM customers WHERE customer_mobile = $1';
        const result = await pool.query(query, [mobile]);

        // Check if the customer exists
        if (result.rows.length > 0) {
            let message = 'A record with this information already exists'
            return new Response(JSON.stringify(message), { status: 409 })
        } else {
            return new Response(null, {
                status: 201
            })
        }
    } catch (error) {
        console.error('Error checking user account:', error)
        return new Response(JSON.stringify(error),  { status: 500 })
        
    }
}
