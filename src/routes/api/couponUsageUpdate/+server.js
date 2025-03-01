import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        const {assignment_id} = await request.json();

        let query = `UPDATE customer_coupon_assignments 
                    SET is_used = true
                    where assignment_id = $1;`;
        
        await pool.query(query, [
            assignment_id
        ]);

        return new Response(JSON.stringify({ message: 'Order created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
    }
}
