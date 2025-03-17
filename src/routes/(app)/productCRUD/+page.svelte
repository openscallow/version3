<!-- File: src/lib/InsertProduct.svelte -->
<script>
  // Basic Information
  let productName = '';
  let category = '';
  let brand = '';
  let description = '';

  // Product Details
  let color = '';
  let sizeDimensions = '';
  let material = '';
  let weight = '';

  // Pricing & Stock (Updated)
  let mrp = '';
  let currentPrice = '';
  let stockAvailability = '';

  // Media & Associations (dynamic arrays)
  let images = [''];
  let tags = [''];
  let relatedProducts = [''];

  // Submission status feedback
  let submissionStatus = '';

  async function handleSubmit(event) {
    event.preventDefault();
    submissionStatus = 'Submitting...';

    // Construct product data using keys similar to your old document.
    const productData = {
      "Product Name": productName,
      "Category": category,
      "Brand": brand,
      "Description": description,
      "Color": color,
      "Size/Dimensions": sizeDimensions,
      "Material": material,
      "MRP": parseFloat(mrp),
      "Current Price": parseFloat(currentPrice),
      "Stock Availability": parseInt(stockAvailability, 10),
      "Images": images.filter(url => url.trim() !== ''),
      "Tags": tags.filter(tag => tag.trim() !== ''),
      "Weight": weight,
      "Related Products": relatedProducts.filter(id => id.trim() !== '')
    };

    try {
      const response = await fetch('/productCRUD/insertMongoDB', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        submissionStatus = 'Product inserted successfully!';
        resetForm();
      } else {
        submissionStatus = 'Error inserting product.';
        console.error('Server error:', await response.text());
      }
    } catch (error) {
      submissionStatus = 'Error inserting product.';
      console.error('Submission error:', error);
    }
  }

  // Functions for dynamic fields – Images
  function addImageField() {
    images = [...images, ''];
  }
  function removeImageField(index) {
    images = images.filter((_, i) => i !== index);
  }

  // Functions for dynamic fields – Tags
  function addTagField() {
    tags = [...tags, ''];
  }
  function removeTagField(index) {
    tags = tags.filter((_, i) => i !== index);
  }

  // Functions for dynamic fields – Related Products
  function addRelatedProductField() {
    relatedProducts = [...relatedProducts, ''];
  }
  function removeRelatedProductField(index) {
    relatedProducts = relatedProducts.filter((_, i) => i !== index);
  }

  function resetForm() {
    productName = '';
    category = '';
    brand = '';
    description = '';
    color = '';
    sizeDimensions = '';
    material = '';
    weight = '';
    mrp = '';
    currentPrice = '';
    stockAvailability = '';
    images = [''];
    tags = [''];
    relatedProducts = [''];
  }
</script>

<div class="max-w-4xl mx-auto p-4">
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-3xl mb-6">Insert New Product</h2>
      <form on:submit={handleSubmit} class="space-y-6">
        <!-- Section: Basic Information -->
        <div>
          <h3 class="text-xl font-semibold mb-2">Basic Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Product Name</span>
              </label>
              <input
                type="text"
                bind:value={productName}
                required
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category</span>
              </label>
              <input
                type="text"
                bind:value={category}
                required
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Brand</span>
              </label>
              <input
                type="text"
                bind:value={brand}
                required
                class="input input-bordered"
              />
            </div>
            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text">Description</span>
              </label>
              <textarea
                bind:value={description}
                required
                class="textarea textarea-bordered"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Section: Product Details -->
        <div>
          <h3 class="text-xl font-semibold mb-2">Product Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Color</span>
              </label>
              <input
                type="text"
                bind:value={color}
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Size/Dimensions</span>
              </label>
              <input
                type="text"
                bind:value={sizeDimensions}
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Material</span>
              </label>
              <input
                type="text"
                bind:value={material}
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Weight</span>
              </label>
              <input
                type="text"
                bind:value={weight}
                class="input input-bordered"
              />
            </div>
          </div>
        </div>

        <!-- Section: Pricing & Stock (Updated) -->
        <div>
          <h3 class="text-xl font-semibold mb-2">Pricing & Stock</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">MRP</span>
              </label>
              <input
                type="number"
                step="0.01"
                bind:value={mrp}
                required
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Current Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                bind:value={currentPrice}
                required
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Stock Availability</span>
              </label>
              <input
                type="number"
                bind:value={stockAvailability}
                required
                class="input input-bordered"
              />
            </div>
          </div>
        </div>

        <!-- Section: Media & Associations -->
        <div>
          <h3 class="text-xl font-semibold mb-2">Media & Associations</h3>
          <div class="space-y-4">
            <!-- Images with Preview -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Images (for slider)</span>
              </label>
              {#each images as image, index}
                <div class="flex flex-col md:flex-row items-center gap-2 mb-2">
                  <input
                    type="url"
                    bind:value={images[index]}
                    placeholder="Enter image URL"
                    required
                    class="input input-bordered flex-1"
                  />
                  {#if image.trim() !== ""}
                    <img
                      src={image}
                      alt="Image preview"
                      class="w-24 h-24 object-cover border border-gray-300 rounded"
                    />
                  {/if}
                  {#if images.length > 1}
                    <button
                      type="button"
                      on:click={() => removeImageField(index)}
                      class="btn btn-outline btn-sm"
                    >
                      Remove
                    </button>
                  {/if}
                </div>
              {/each}
              <button
                type="button"
                on:click={addImageField}
                class="btn btn-secondary btn-sm"
              >
                Add Another Image
              </button>
              <!-- {/*
                Placeholder: In the future, add a dedicated button here
                to upload images to S3 from mobile.
                <button type="button" class="btn btn-info btn-sm">Upload Images to S3</button>
              */} -->
            </div>

            <!-- Tags -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Tags</span>
              </label>
              {#each tags as tag, index}
                <div class="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    bind:value={tags[index]}
                    placeholder="Enter tag"
                    required
                    class="input input-bordered flex-1"
                  />
                  {#if tags.length > 1}
                    <button
                      type="button"
                      on:click={() => removeTagField(index)}
                      class="btn btn-outline btn-sm"
                    >
                      Remove
                    </button>
                  {/if}
                </div>
              {/each}
              <button
                type="button"
                on:click={addTagField}
                class="btn btn-secondary btn-sm"
              >
                Add Another Tag
              </button>
            </div>

            <!-- Related Products -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Related Products (IDs)</span>
              </label>
              {#each relatedProducts as prod, index}
                <div class="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    bind:value={relatedProducts[index]}
                    placeholder="Enter related product ID"
                    required
                    class="input input-bordered flex-1"
                  />
                  {#if relatedProducts.length > 1}
                    <button
                      type="button"
                      on:click={() => removeRelatedProductField(index)}
                      class="btn btn-outline btn-sm"
                    >
                      Remove
                    </button>
                  {/if}
                </div>
              {/each}
              <button
                type="button"
                on:click={addRelatedProductField}
                class="btn btn-secondary btn-sm"
              >
                Add Another Related Product
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-full">
          Insert Product
        </button>
      </form>

      {#if submissionStatus}
        <div class="alert alert-info mt-4">
          <span>{submissionStatus}</span>
        </div>
      {/if}
    </div>
  </div>
</div>
