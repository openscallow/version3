/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 07/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 07/12/2025
 * Last change: initialize
 * 
*/

import logtail from '$config/logtail.client';
import type { promises } from 'dns';


interface mobileValidationResult {
    success: boolean,
    message: string
}
export async function validateMobileNumber(mobileNumber: number) : Promise<mobileValidationResult> {
    if(!mobileNumber || mobileNumber.toString().length !== 10) {
        return {
            success: false, 
            message: 'Please type a phone number with 10 digits.'
        }
    }

    try {
        const response = await fetch('/api/isMobileTaken', {
            method: "POST",
            body: JSON.stringify({mobileNumber})
        });

        let isTaken = await response.json()
        console.log(isTaken)

        console.log(isTaken.status)

        if (isTaken.status) {
            return {
                success: false, 
                message: 'Account found for this number. Log in to continue.'
            }
        }else {
            return {
                success: true, 
                message: 'Mobile number is valid and available for registration.'
            }
        }
    } catch (error) {
        /* @TODO: incorporate logtail instead of console.error */
        return {
            success: false,
            message: 'Oops! Something went wrong. Try again later.'
        }
    }
}