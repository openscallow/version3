type status = 'Pending' | 'Processing' | 'Delivered' | 'Canceled' | 'All';

export async function getCustomerOrders(customerId: string, status?: status) {
    try {
        const response = await fetch('/orderHistory', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({customerId, status}),
        });

        if (response.ok) {
            let rows = await response.json()
            return rows;
        }
    } catch (error) {
        console.log(error)
    }
}