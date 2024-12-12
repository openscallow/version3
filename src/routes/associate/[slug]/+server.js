import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    console.log("POST method invoked");

    try {
    let { institute_name } =  await request.json()

    const query = `
    SELECT 
        co.order_id,
        co.customer_id,
        co.created_at, 
        co.items_count, 
        co.total_amount, 
        co.discount_amount, 
        co.promo_code, 
        co.payment_method,
        c.customer_name,
        c.customer_picture
    FROM 
        customerorders co
    JOIN 
        customers c 
    ON 
        co.customer_id = c.customer_id
    WHERE 
        co.institute_name = $1 AND co.status = 'Pending';
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

