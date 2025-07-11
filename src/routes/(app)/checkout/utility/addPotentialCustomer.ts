import { customerId } from '$lib/components/ts/customer_correlated.svelte';
import { getBrowserName, getDeviceType } from '$lib/components/ts/device';
import { api } from '$lib/utils/api';



export default function addPotentialCustomer() {
    if(!customerId()) return;

    let product_id;
    const pendingOrderData = sessionStorage.getItem('pending_order');
    if(pendingOrderData) {
        const parsed = JSON.parse(pendingOrderData);
        product_id = parsed.id;
    }

    // console.log(product_id)

    const collection = {
        customer_id: customerId(),
        product_id,
        timestamp: new Date().toISOString(),
        browser: getBrowserName(),
        device_type: getDeviceType(),
        isProcessed: false
    }
    
    api.request('/potentialCustomer', {
        method: 'POST',
        body: collection
    });
}