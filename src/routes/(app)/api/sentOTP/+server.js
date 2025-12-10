/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 09/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 09/12/2025
 * Last change: initialize
 * 
*/

import dotenv from 'dotenv';
import { env } from '$env/dynamic/private';
import logtail from '$config/logtail.server';


dotenv.config();
const OTP = generateOTP();

export async function POST({ request }){
    let { mobileNumber } = await request.json();
    const URL = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY || env.FAST2SMS_API_KEY}&route=otp&variables_values=${OTP}&flash=0&numbers=${mobileNumber}`

    try {
        const response = await fetch(URL);

        if(response.ok) {
            await logtail.info('OTP dispatched successfully', {mobileNumber})
            await logtail.flush()

            return new Response(JSON.stringify({OTP}), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            const error = await response.text();
            await logtail.error('OTP dispatch failed.', {
                mobileNumber,
                response,
                error 
            })
            await logtail.flush()
        }   
    } catch (error) {
        awaitlogtail.error('OTP dispatch failed.', {
            mobileNumber,
            response,
            error 
        })
        await logtail.flush()
        console.error('error while fetching customer cart:', error)
    }
}

//Generates a random 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}