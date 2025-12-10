/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 10/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 10/12/2025
 * Last change: initialize
 * 
*/

import { pool } from '$lib/db/config.js';
import logtail from '$config/logtail.server';

export async function POST({ request }) {

    let client;
    try {
        const { customerId, customerName, mobileNumber, password, customerReferralCode, customerReferredBy } = await request.json();

        //check connection is estanlished
        client = await pool.connect();

        // initalize inserting process 
        const query = `INSERT INTO customers (customer_id, customer_name, customer_mobile, customer_password, customer_referral_code, customer_referred_by) 
        VALUES ($1, $2, $3, $4, $5, $6);`

        
        await client.query(query, [customerId, customerName, mobileNumber, password, customerReferralCode, customerReferredBy]);

        logtail.info('customer created', {
            mobileNumber,
            customerName,
            password
        })
        
        logtail.flush()

        //send back response
        return new Response(null, {
            status: 201
        });

  } catch (error) {
    logtail.error(error, {
        mobileNumber,
        customerName,
        password
    })

    logtail.flush()
    console.error('Error inserting into the database:', error);

    // Handle specific PostgreSQL errors
    if (error.code === '23505') { // unique violation
      errorResponse.error = 'A record with this information already exists';
      return new Response(JSON.stringify(errorResponse), { status: 409 });
    }
    
    return new Response(JSON.stringify(errorResponse), { status: 500 });
  }
}