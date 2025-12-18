import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    const { customerId, status } = await request.json();
    let query = `SELECT * FROM customerorders WHERE customer_id = $1 AND ($2 = 'All' OR status = $2::order_status) AND order_id > $3;`

    try {
        const { rows } = await pool.query(query, [customerId, status, 177]);

        return new Response(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
