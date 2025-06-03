export async function updateViewCount(productId) {
    try {
        let response = await fetch('/api/updateViewCount', {
            method: "POST",
            headers: {
                "Contetn-Type": "application/json"
            },
            body: JSON.stringify({productId})
        })
        console.log(response)

        if(response.ok){
            alert(`updated product count`)
        }
    } catch (error) {
        console.log(error)
    }
}