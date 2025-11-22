/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 01/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 01/11/2025
 * Last change: initialize
 * 
*/


import { pool } from '$lib/db/config.js';
import logtail from '$config/logtail.server';

export async function POST({ request }) {
    let client;
    try {
        const { customerId }= await request.json()
        // Validate customerId
        if (!customerId || typeof customerId !== 'string') {
            throw new Error("Invalid customerId");
        }

        // Get database connection
        client = await pool.connect();

        // Query with parameterized value
        const query = `SELECT current_coins FROM customers WHERE customerId = $1`;
        const result = await client.query(query, [customerId]);

        // Handle case where customer doesn't exist
        if (result.rows.length === 0) {
            return error(404, 'Customer not found');
        }

        const callowCoins = result.rows[0].current_coins;
        console.log(`Customer ${customerId} balance: ${callowCoins}`);

        // Return response
        return new Response(JSON.stringify({ callowCoins }), {
            status: 200,
            headers:{
                'Cache-Control': 'public, max-age=3600'
            }
        });

    } catch (error) {
        console.error('Error retrieving from the database:', error);

       

        return new Response(JSON.stringify(error), { status: 500 });
    } finally {
        if (client) {
            client.release();
        }
    }
}
