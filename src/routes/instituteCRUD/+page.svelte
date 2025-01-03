<script>
    import '@tailwind';
    let fileName = $state();

    let selectedImageSrc = $state(
        "https://edexec.co.uk/wp-content/uploads/2021/01/school-building-modern-thin-line-design-style-vector-illustration-vector-id1030995160.jpg"
    ); // Default image source

    function updateImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                selectedImageSrc = reader.result; // Update the image source
            };
            reader.readAsDataURL(file);
        }
    }

    async function insertIntoS3() {
        const file = document.getElementById("file").files[0];
        const formData = new FormData();
        formData.append("file", file); // Append the file to the FormData

        try {
            let response = await fetch('/instituteCRUD/insertIntoS3', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) alert("File saved");
            fileName = file.name;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function insertIntoAlgolia() {
        const contenteditableElements = document.querySelectorAll('[contenteditable]');
        const institute = Array.from(contenteditableElements).map((element) => (
            element.innerText.trim()
        ));
        institute.push(fileName);

        try {
            let response = await fetch('/instituteCRUD/insertAlgolia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ institute }),
            });
            if (response.ok) {
                alert('Data inserted successfully!');
            } else {
                alert('Failed to insert data!');
            }
        } catch (error) {
            console.error('Error:', error);
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

            <h2 class="card-title text-lg font-semibold">
                School Name: <span contenteditable class="border-b border-gray-300 focus:outline-none"></span>
            </h2>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Address/સરનામું:
                </label>
                <p contenteditable class="border-b border-gray-300 focus:outline-none"></p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    City:
                </label>
                <p contenteditable class="border-b border-gray-300 focus:outline-none"></p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    State:
                </label>
                <p contenteditable class="border-b border-gray-300 focus:outline-none"></p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">
                    Pincode:
                </label>
                <p contenteditable class="border-b border-gray-300 focus:outline-none"></p>
            </div>

            <div class="card-actions flex justify-end">
                <button class="btn btn-primary" onclick={insertIntoAlgolia}>
                    Save Details
                </button>
            </div>
        </div>
    </div>

   
</main>
