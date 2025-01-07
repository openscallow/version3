<script lang="ts">


    let product = {
        "Product Name": "Classic Ballpoint Pen",
        "Category": "Pens",
        "Brand": "StationeryCo",
        "Description": "Smooth-writing ballpoint pen, perfect for daily use.",
        "Color": "Blue",
        "Size/Dimensions": "14 cm length",
        "Material": "Plastic",
        "Price": 10,
        "Discount": 2,
        "Stock Availability": 150,
        "Images": ["https://example.com/images/ballpoint-pen.jpg"],
        "Tags": ["writing", "office", "smooth"],
        "Weight": "15g",
        "Related Products": ["P12345", "N67890"]
    };

    async function insertProduct() {
        try {
            // Parse the edited JSON string
            const editableContent = document.getElementById('editable-content')?.innerText;
            if (!editableContent) throw new Error("Content is empty");

            const updatedProduct = JSON.parse(editableContent);

            // Send the parsed object to the backend
            let response = await fetch('./productCRUD/insertProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            if (response.ok) {
                let data = await response.json();
                console.log('Product inserted:', data);
            } else {
                console.error('Failed to insert product:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : String(error));
        }
    }
</script>

<div>
    <h1>Edit Product</h1>
    <pre id="editable-content" contenteditable="true" spellcheck="false" style="border: 1px solid #ccc; padding: 1rem; border-radius: 5px; background: #f9f9f9;">
{JSON.stringify(product, null, 4)}
    </pre>
    <button on:click={insertProduct} style="margin-top: 1rem;">Insert Product</button>
</div>

<style>
    pre {
        font-family: monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-y: auto;
    }
    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
