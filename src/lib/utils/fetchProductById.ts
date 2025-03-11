/**
 * Fetches product information from the API based on provided product IDs.
 * 
 * @param productIds - An array of product IDs to fetch details for
 * @returns A Promise that resolves to the product data object. Returns empty object if fetch fails.
 * @throws Will not throw errors, but logs them to console
 *
 * @example
 * ```typescript
 * const products = await fetchProductById(['prod_123', 'prod_456']);
 * ```
 */
export async function fetchProductById(productIds: string[]) {
    try {
        const response = await fetch('/api/getProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productIds }),
        });
  
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Product fetch error:', error);
        return {};
    }
}