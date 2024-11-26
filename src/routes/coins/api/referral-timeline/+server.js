import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    let client;
    try {
        const { customer_referral_code }= await request.json()
        
        console.log(customer_referral_code)
        // Ensure the customer_id is correctly sanitized and type-safe
        if (!customer_referral_code || typeof customer_referral_code !== 'string') {
            throw new Error("Invalid customer_referral_code");
        }

        // Check connection is established
        client = await pool.connect();
        console.log("Connection connected successfully");

        const query = `SELECT customer_name, created_at FROM customers WHERE customer_referred_by = $1;`

        const result = await client.query(query, [customer_referral_code]);

        console.log(`Customer's referral recored retrieve:` ,result.rows);

        // Send back response with the retrieved balance
        return new Response(JSON.stringify({ data: result.rows }), {
            status: 200,
          
        });

    } catch (error) {
        console.error('Error retrieving from the database:', error);

        // Handle specific PostgreSQL errors
        const errorResponse = { error: error.message };
        if (error.code === '23505') { // Unique violation error code
            return new Response(JSON.stringify(errorResponse), { status: 409 });
        }

        return new Response(JSON.stringify(errorResponse), { status: 500 });
    } finally {
        if (client) {
            client.release(); // Always release the client back to the pool
        }
    }
}
