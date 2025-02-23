<script>


    let value = '';
    let productData = null;
   


    async function retrieveInfo() {
        if (!value) return;

        try {
            const response = await fetch(`/api/getProduct?productid=${value}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            
            const data = await response.json();
            productData = data.product;
        } catch (error) {
            console.error('Error fetching product:', error);
            // You might want to show an error message to the user here
        }
    }

    async function update(){
        let product = JSON.parse(document.querySelector('.previewObject').innerText);
        console.log(product);

        try {
            const response = await fetch(`/productCRUD/updateProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (!response.ok) throw new Error('Failed to update product');
            alert('Product updated successfully');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating product:', error);
            // You might want to show an error message to the user here
        }
    }
</script>

<div class="p-4 space-y-4">
    <div class="flex gap-2">
        <input 
            type="text" 
            bind:value 
            class="border p-2 rounded"
            placeholder="Enter product ID"
        />
        <button 
            onclick={retrieveInfo}
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Search
        </button>
    </div>


        <pre 
            class="whitespace-pre-wrap break-words bg-gray-100 p-4 rounded max-w-full overflow-x-auto previewObject"
            contenteditable="true"
        >
            {JSON.stringify(productData, null, 2)}
        </pre>

        <button class="btn bg-red-500" onclick={update}>upload</button>


</div>
