import { pool } from '$lib/db/config.js'

export async function POST({ request }) {
  try {
    // Parse the incoming request body for coupon code
    const {i, coupon} = await request.json();

    if (!i || !coupon) {
      return new Response('Coupon code is required', { status: 400 });
    }

    // SQL query to check if the coupon exists and is active
    const query = `
      SELECT customer_id, promo_code FROM customerOrders
      WHERE customer_id = $1 AND promo_code = $2`;
    
    const { rows } = await pool.query(query, [i, coupon]);

    // Check if a matching and active coupon was found
    if (rows.length === 0) {
      return new Response('customer is eligible to use promo code', { status: 200 });
    }else{
        return new Response('customer is eligible to use promo code', { status: 404 });
    }

  } catch (error) {
    console.error('Error while validating coupon:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}
