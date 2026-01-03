/**
 * Created by: Gautam mer (CEO)
 * Created at: 01/01/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 03/01/2025
 * Last change: inserted new response when customer credintials don't match
 * 
*/
import { pool } from '$config/postgresql.config';
import  logtail  from '$config/logtail.server.js'

export async function POST({ request }) {
    try {
        const {password, mobileNumber} = await request.json();

        const query = 'SELECT customer_id, customer_referral_code, current_coins FROM customers WHERE customer_mobile = $1 AND customer_password = $2';
        const resutl = await pool.query(query, [mobileNumber, password]);

        console.log('here', resutl)
        if (resutl.rows.length > 0) {      
            let data = JSON.stringify({
                hasAccount: true,
                message: 'found customer with credentials',
                customerID: resutl.rows[0].customer_id,
                customerReferrerCode: resutl.rows[0].customer_referral_code,
                CCB: resutl.rows[0].current_coins
            })
            return new Response(data,{status: 200});
        } else if (resutl.rows.length === 0) {
            logtail.info("customer credintials didn't match", {
                mobileNumber,
                password
            });
            logtail.flush();

            let data = JSON.stringify({
                hasAccount: true,
                message: 'found customer with credentials'
            })
            return new Response(data,{status: 404});
        }
    } catch (error) {
        console.error(error)
    }
}