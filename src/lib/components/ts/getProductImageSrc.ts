export async function getProductImageSrc(productId: string) {
    try {
        const response = await fetch('/api/getProductImageSrc', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productId}),
        });

        if (response.ok) {
            let { src } = await response.json()
            return src;
        }
    } catch (error) {
        console.log(error)
    }
}