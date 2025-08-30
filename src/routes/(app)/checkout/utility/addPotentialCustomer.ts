/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 30/08/2025
 * 
 * Last by: Gautam mer (CEO)
 * Created at: 30/08/2025
 * 
*/


import { customerId } from '$lib/components/ts/customer_correlated.svelte';
import { getBrowserName, getDeviceType } from '$lib/components/ts/device';
import { api } from '$lib/utils/api';

interface PotentialCustomer {
    customer_id: string;
    product_id: string;
    product_name: string | undefined;
    timestamp: string;
    browser: string;
    device_type: string;
    isProcessed: boolean;
}

export default function addPotentialCustomer() {
    const customer_id = customerId();

    // Early return if no customer ID is available
    if(!customer_id) return;

    // Early return if no product ID is available
    let product_id: string | undefined;
    let product_name: string | undefined;
    const pendingOrderData = sessionStorage.getItem('pending_order');

    if (pendingOrderData) {
        try {
            const parsedOrder = JSON.parse(pendingOrderData);
            product_id = parsedOrder.id;
            product_name = parsedOrder.name;
        } catch (error) {
            console.error('Failed to parse pending order data from session storage:', error);
            return;
        }
    }

    if (product_id) {
       const potentialCustomerData: PotentialCustomer = {
        customer_id,
        product_id,
        product_name,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), // Indian Standard Time (IST)
        browser: getBrowserName(),
        device_type: getDeviceType(),
        isProcessed: false
       };

       api.request(
        '/potentialCustomer',
        {
            method: 'POST',
            body: potentialCustomerData
        },
        {
            enabled: true,
            message: 'Storing potential customer record for the product'
        });
    }
}