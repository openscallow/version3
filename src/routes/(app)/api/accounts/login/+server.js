/**
 * Created by: Gautam mer (CEO)
 * Created at: 01/01/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 01/01/2025
 * Last change: Initialize
 * 
 * @TODO contemplate scenaris and recompose ui according to it
 * 
*/
import { pool } from '$config/postgresql.config';

export async function POST({ request }) {
    try {
        const {password, mobileNumber} = await request.json();

        const query = 'SELECT customer_id, customer_referral_code, current_coins FROM customers WHERE customer_mobile = $1 AND customer_password = $2';
        const resutl = await pool.query(query, [mobileNumber, password]);

        if (resutl.rows.length > 0) {      
            let data = JSON.stringify({
                hasAccount: true,
                message: 'found customer with credentials',
                customerID: resutl.rows[0].customer_id,
                customerReferrerCode: resutl.rows[0].customer_referral_code,
                CCB: resutl.rows[0].current_coins
            })
            return new Response(data,{status: 200});
        } else {
        }
    } catch (error) {
        throw new Error('server error while customer data validation in login')
    }
}