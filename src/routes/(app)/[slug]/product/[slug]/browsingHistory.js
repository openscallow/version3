import { customerId } from '$lib/components/ts/customer_correlated.svelte'
import { getBrowserName, getDeviceType } from '$lib/components/ts/device'

export async function browsingHistory(product_id) {
    const productVisitInfo = {
        customer_id: customerId(),
        product_id,
        timestamp: new Date().toISOString(),
        browser: getBrowserName(),
        device_type: getDeviceType(),
        isProcessed: false
    }

    try {
        let response = await fetch('/api/browsingHistory', {
            method: "POST",
            headers: {
                "Contetn-Type": "application/json"
            },
            body: JSON.stringify(productVisitInfo)
        })
        console.log(response)

        if(response.ok){
            return
        }else{
            return
        }
    } catch (error) {
        console.log(error)
    }
}