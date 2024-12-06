import { pool } from '$lib/db/config.js'

export async function POST({ request }) {
  try {
    // Parse the incoming request body for coupon code
    const { coupon } = await request.json();

    if (!coupon) {
      return new Response('Coupon code is required', { status: 400 });
    }

    // SQL query to check if the coupon exists and is active
    const query = `
      SELECT discountAmount, discount_Percentage 
      FROM couponCodes
      WHERE promo_code = $1 AND isActive = true
    `;
    
    const { rows } = await pool.query(query, [coupon]);

    // Check if a matching and active coupon was found
    if (rows.length === 0) {
      return new Response('Invalid or inactive coupon code.', { status: 400 });
    }
    
    // If a matching coupon is found and is active, return the discount information
    const { discountamount, discount_percentage } = rows[0]
    
    return new Response(JSON.stringify({ discountamount, discount_percentage }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });

  } catch (error) {
    console.error('Error while validating coupon:', error);
    return new Response('Internal server error.', { status: 500 });
  }
}
