import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    let client;
    try {
        const { customer_id }= await request.json()
        
        console.log(customer_id)
        // Ensure the customer_id is correctly sanitized and type-safe
        if (!customer_id || typeof customer_id !== 'string') {
            throw new Error("Invalid customer_id");
        }

        // Check connection is established
        client = await pool.connect();
        console.log("Connection connected successfully");

        // Parameterized query to prevent SQL injection
        const query = `SELECT current_coins FROM customers WHERE customer_id = $1`;

        // Execute the query with parameterized value
        const result = await client.query(query, [customer_id]);

        console.log(`Customer's current balance retrieved: ${result.rows[0].current_coins}`);

        // Send back response with the retrieved balance
        return new Response(JSON.stringify({ total_coin_balance: result.rows[0].current_coins }), {
            status: 200,
            headers:{
                'Cache-Control': 'public, max-age=3600'
            }
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
