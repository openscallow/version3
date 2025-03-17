import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        const { customerId, title, message, type } = await request.json();
        console.log('customerId:', customerId);
        console.log('title:', title);
        console.log('message:', message);
        console.log('type:', type);

        if (!customerId || !title || !message || !type) {
            return new Response(
                JSON.stringify({ 
                    error: 'Missing required fields: customerId, title, message, and type are required' 
                }), 
                { status: 400 }
            );
        }

        const query = `
            INSERT INTO notifications (customer_id, title, message, type, status)
            VALUES ($1, $2, $3, $4, 'unread')
            RETURNING id, title, message, type, status;
        `;

        const result = await pool.query(query, [customerId, title, message, type]);
        console.log('notification created successfully:');
        return new Response(
            JSON.stringify({
                message: 'Notification created successfully',
                notification: result.rows[0]
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating notification:', error);
        return new Response(
            JSON.stringify({ error: error.message || 'Internal server error' }), 
            { status: 500 }
        );
    }
}
