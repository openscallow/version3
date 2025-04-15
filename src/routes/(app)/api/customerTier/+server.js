import { pool } from '$lib/db/config.js';

export async function POST({ request}){

    // get customerId from request body
    const {customerId} = await request.json();

    // check if customerId is provided
    if (!customerId) {
        return new Response('Customer ID is required', { status: 400 });
    }

    try {
        // postGreSQL query to get customer tier
        let query = `SELECT current_tier FROM customers WHERE customer_id = $1;`

        let Tier = await pool.query(query, [customerId]);

        // return customer tier as JSON
        return new Response(JSON.stringify({customerTier: Tier.rows[0].current_tier}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });  
    } catch (error) {
        console.log("erorr", error)
        return new Response(JSON.stringify({message: 'got error while fetching customer tier', error}), {
            status: 400,
            headers: {
                'Contetn-type': 'application/json'
            }
        })
    }


    

    
 
    
}