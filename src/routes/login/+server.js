import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        const { mobile, password } = await request.json();

        // Check if the customer exists
        const checkQuery = 'SELECT * FROM customers WHERE customer_mobile = $1 AND customer_password = $2';
        const checkResult = await pool.query(checkQuery, [mobile, password]);

        if (checkResult.rows.length > 0) {
            return new Response(JSON.stringify({ Customer: checkResult.rows[0] }), { status: 201 });
        }else {
            return new Response(JSON.stringify({ message: 'user does not found' }), { status: 404 });
        }

       
    } catch (error) {
        console.error('Error updating customer password:', error);
        return new Response(JSON.stringify({ message: 'Internal server error', error }), { status: 500 });
    }
}
