import { pool } from '$lib/db/config.js';

export async function POST({ request}){
    let { customer_id} = await request.json()

    try {
        let query =  `SELECT * FROM carts WHERE customer_id = $1 AND status = 'active';`
        let result =  await pool.query(query, [customer_id]);

        if (result.rows.length  === 0) {
            let query = `INSERT INTO carts (customer_id, status) VALUES ($1, 'active') RETURNING *`
            let result = await pool.query(query, [customer_id]);

            return new Response(JSON.stringify({cartInfo: result.rows[0]}), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            return new Response(JSON.stringify({cartInfo: result.rows[0]}), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (error) {
        console.error('error while fetching customer cart:', error)
    }
}