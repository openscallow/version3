export function customerId() {
    // Check if running in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
        const customerData = localStorage.getItem('customer_correlated');
        const customerId = customerData ? JSON.parse(customerData).i : null;
        return customerId;
    }
    
    // Return null if not in a browser environment
    return null;
}