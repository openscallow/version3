import { pool } from '$lib/db/config.js';

export async function GET({ url }) {
    try {
        const customer_id = url.searchParams.get('customer_id');
        const status = url.searchParams.get('status');
        const type = url.searchParams.get('type');

        if (!customer_id) {
            return new Response(JSON.stringify({ error: 'customer_id is required' }), { status: 400 });
        }

        let query = `
            SELECT id, title, message, type, status, created_at, expires_at, metadata
            FROM notifications
            WHERE customer_id = $1
        `;
        const params = [customer_id];

        if (status) {
            query += ' AND status = $2';
            params.push(status);
        }

        if (type) {
            query += status ? ' AND type = $3' : ' AND type = $2';
            params.push(type);
        }

        query += ' ORDER BY created_at DESC;';

        const result = await pool.query(query, params);

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
    }
}
