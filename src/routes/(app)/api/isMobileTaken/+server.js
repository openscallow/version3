/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 08/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 08/12/2025
 * Last change: initialize
 * 
*/

import { error } from '@sveltejs/kit';
import { pool } from '$lib/db/config.js';
import logtail from '$config/logtail.server';

export async function POST({ request }){
    let { mobileNumber } = await request.json()

    try {
        const query = 'SELECT EXISTS (SELECT 1 FROM customers WHERE customer_mobile = $1)';
        const result = await pool.query(query, [mobileNumber]);

        return new Response(JSON.stringify({ status : result.rows[0].exists }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        
    } catch (error) {
        /* @TODO: incorporate logtail instead of console.error */
        console.error('error while fetching customer cart:', error)
    }
}