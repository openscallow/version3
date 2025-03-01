import { pool } from '$lib/db/config.js'

export async function POST({ request }) {
  try {
    // Parse the incoming request body for coupon code
    const {i, coupon} = await request.json();

    if (!i || !coupon) {
      return new Response('Coupon code is required', { status: 400 });
    }

    // SQL query to check if the coupon exists and is active
    const query = `SELECT * FROM can_customer_use_coupon($1, $2)`;
    
    const { rows } = await pool.query(query, [coupon, i]);
    console.log(rows);

    // Check if a matching and active coupon was found
    if (rows.length === 0) {
      return new Response('customer is not eligible to use promo code', { status: 404 });
    }else{
        return new Response(JSON.stringify(rows[0]), { status: 200 });
    }

  } catch (error) {
    console.error('Error while validating coupon:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}
