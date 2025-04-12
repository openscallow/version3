import { pool } from '$lib/db/config.js';
export async function POST({request}){
    let {productId, customerId} = await request.json();

    if(productId === null || customerId === null){
        return new Response(JSON.stringify({error: 'productId or customerId is null'}), {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        let query = `INSERT INTO inquiry (product_id, customer_id) VALUES ($1, $2)`;

        await pool.query(query, [
            productId,
            customerId
        ]);

        return new Response(JSON.stringify({ message: 'Inquiry created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 }); 
    }
}