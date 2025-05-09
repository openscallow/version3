import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    console.log("insede file")
    try {
        const { 
            customer_id,
            institute_name,
            items_count,
            discount_amount,
            promo_code,
            total_amount,
            payment_method,
            used_coin,
            coins_earned
        } = await request.json();

        console.log('Received data:', {
            customer_id,
            institute_name,
            items_count,
            discount_amount,
            promo_code,
            total_amount,
            payment_method,
            used_coin,
            coins_earned
        });

        let query = `INSERT INTO customerorders (
            customer_id,
            institute_name,
            items_count,
            discount_amount,
            promo_code,
            total_amount,
            payment_method,
            used_coin,
            coins_earned
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        
        await pool.query(query, [
            customer_id,
            institute_name,
            items_count,
            discount_amount,
            promo_code,
            total_amount,
            payment_method,
            used_coin, 
            coins_earned
        ]);

        return new Response(JSON.stringify({ message: 'Order created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), { status: 500 });
    }
}
