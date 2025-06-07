import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    const { cart_id, product_id, quantity, price_at_addition, productName } = await request.json();

    try {
        const query = `
            INSERT INTO cart_items(cart_id, product_id, quantity, price_at_addition, productName)
            VALUES ($1, $2, $3, $4, $5);`;
        await pool.query(query, [cart_id, product_id, quantity, price_at_addition, productName]);

        return new Response(JSON.stringify({ message: 'Item added to cart'}), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error inserting cart item:', error);
        return new Response(JSON.stringify({ error: 'Failed to add item to cart' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
