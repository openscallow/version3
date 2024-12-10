import { pool } from '$lib/db/config.js';

export async function POST({ request }) {

    try {
    let { institute_name } =  await request.json()

    const query = `
            SELECT 
                order_id,
                customer_id,
                created_at, 
                items_count, 
                total_amount, 
                discount_amount, 
                promo_code, 
                payment_method 
            FROM 
                customerorders 
            WHERE 
                institute_name = $1 AND status = 'Pending';
    `;

    let {rows} = await pool.query(query, [institute_name])

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