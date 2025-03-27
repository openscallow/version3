<script>
    import '@tailwind';
    let fileName = $state();
    let selectedImageSrc = $state(
        "https://edexec.co.uk/wp-content/uploads/2021/01/school-building-modern-thin-line-design-style-vector-illustration-vector-id1030995160.jpg"
    );

    function updateImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                selectedImageSrc = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    async function insertIntoS3() {
        const file = document.getElementById("file").files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            let response = await fetch('/productCRUD/uploadproductImg', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) alert("File saved");
            fileName = file.name;
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<main class="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="card w-full max-w-lg bg-white shadow-xl rounded-lg overflow-hidden">
        <figure class="w-full">
            <img
                loading="lazy"
                src={selectedImageSrc}
                alt="Selected"
                class="w-full h-64 object-cover"
            />
        </figure>

        <div class="card-body p-6 space-y-4">
            <div>
                <label for="file" class="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image
                </label>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    class="file-input file-input-bordered w-full"
                    onchange={updateImage}
                />
            </div>

            <button
                class="btn btn-secondary mt-6"
                onclick={insertIntoS3}
            >
                Upload to S3
            </button>
        </div>
    </div>
</main>

<div class="p-4">
    https://callowproduct.s3.ap-south-1.amazonaws.com/productImag/
</div>
