import { pool } from '$lib/db/config.js';

export async function POST({request}) {
    let {customer_id} = await request.json();
    console.log(customer_id)
    let query = `SELECT * FROM customers WHERE customer_id = $1`

    
    
    try {
        let result = await pool.query(query, [customer_id]);
        console.log(result.rows[0])
        if(result.rows[0] !== null){
         return new Response(JSON.stringify({info: result.rows[0]}), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }); }
    } catch (error) {
        console.error('Database error:', error);
        
    }
}