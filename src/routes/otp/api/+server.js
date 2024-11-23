import { pool } from '$lib/db/config.js';

export async function POST({ request }) {

    let client;
    try {
        const { customer_id, customer_name, customer_mobile, customer_password, customer_referral_code } = await request.json();

        //check connection is estanlished
        client = await pool.connect();
        console.log("connection connected succesfuly");

        // initalize inserting process 
        const query = `INSERT INTO customers (customer_id, customer_name, customer_mobile, customer_password, customer_referral_code) 
        VALUES ($1, $2, $3, $4, $5);`

        
        await client.query(query, [customer_id, customer_name, customer_mobile, customer_password, customer_referral_code]);
        console.log(`customer created with id: ${customer_id} successfully`)
        
        //send back response
        return new Response(null, {
            status: 201
        });

  } catch (error) {
    console.error('Error inserting into the database:', error);

    // Handle specific PostgreSQL errors
    if (error.code === '23505') { // unique violation
      errorResponse.error = 'A record with this information already exists';
      return new Response(JSON.stringify(errorResponse), { status: 409 });
    }
    
    return new Response(JSON.stringify(errorResponse), { status: 500 });
  }
}